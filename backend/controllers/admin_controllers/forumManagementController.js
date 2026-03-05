import db from '../../config/db.js';
import fs from 'fs';
import path from 'path';
import { getIO } from '../../socket.js';
import { removeNotificationsByReference } from '../notificationController.js';
import {
  buildOptimizedImageUrlFromStoredName,
  deleteCloudinaryAssetByStoredName,
} from '../../utils/cloudinary.js';
import { FORUM_UPLOADS_DIR } from '../../utils/uploadPaths.js';

const resolveForumImageUrl = (imageName, req) => {
  if (!imageName) return '';
  if (/^https?:\/\//i.test(imageName)) return imageName;

  const optimizedUrl = buildOptimizedImageUrlFromStoredName(imageName);
  if (optimizedUrl) return optimizedUrl;

  return `${req.protocol}://${req.get('host')}/api/forum/images/${encodeURIComponent(imageName)}`;
};

export const getAllForumPostsAdmin = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT
        p.forumID,
        p.postType,
        p.description,
        p.contact,
        p.email,
        p.createdAt,
        p.isAnonymous,
        p.isDeleted,
        IF(p.isAnonymous, 'Anonymous User', CONCAT(a.firstName, ' ', a.lastName)) AS realName
      FROM forum_posts_tbl p
      LEFT JOIN account_tbl a ON p.accID = a.accID
      ORDER BY GREATEST(p.createdAt, p.lastUpdatedAt) DESC`
    );

    const postIds = rows.map((row) => row.forumID);
    let imageRows = [];

    if (postIds.length > 0) {
      const placeholders = postIds.map(() => '?').join(',');
      const [images] = await db.query(
        `SELECT forumID, imageName
         FROM forum_images_tbl
         WHERE forumID IN (${placeholders}) AND isDeleted = FALSE`,
        postIds
      );
      imageRows = images;
    }

    const data = rows.map((row) => ({
      id: row.forumID,
      type: String(row.postType || '').toLowerCase(),
      description: row.description || '',
      date: row.createdAt,
      realName: row.realName || 'Unknown User',
      anonymous: Boolean(row.isAnonymous),
      contactNumber: row.contact || '',
      email: row.email || '',
      status: row.isDeleted ? 'archived' : 'active',
      images: imageRows
        .filter((img) => img.forumID === row.forumID)
        .map((img) => resolveForumImageUrl(img.imageName, req)),
    }));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching forum posts for admin content management:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch forum posts' });
  }
};

export const updateForumPostStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const isDeleted = status === 'archived' ? 1 : 0;
    const [result] = await db.query(
      `UPDATE forum_posts_tbl
       SET isDeleted = ?, lastUpdatedAt = NOW()
       WHERE forumID = ?`,
      [isDeleted, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Forum post not found' });
    }

    if (status === 'archived') {
      try {
        const io = getIO();
        io.emit('delete_forum_post', { postId: Number(id) });
        io.emit('forum_post_status_updated', { postId: Number(id), status: 'archived' });
      } catch (socketError) {
        console.error('Failed to emit archive forum socket events:', socketError.message);
      }

      try {
        await removeNotificationsByReference('forum_posts_tbl', Number(id));
      } catch (notifError) {
        console.error('Failed to remove forum notifications on archive:', notifError);
      }
    } else {
      try {
        const io = getIO();
        io.emit('forum_post_status_updated', { postId: Number(id), status: 'active' });
      } catch (socketError) {
        console.error('Failed to emit restore forum socket event:', socketError.message);
      }
    }

    return res.status(200).json({ success: true, message: 'Forum post status updated' });
  } catch (error) {
    console.error('Error updating forum post status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update forum post status' });
  }
};

export const deleteForumPostAdmin = async (req, res) => {
  const { id } = req.params;
  const dbConn = await db.getConnection();

  try {
    await dbConn.beginTransaction();

    const [images] = await dbConn.query(
      'SELECT imageName FROM forum_images_tbl WHERE forumID = ?',
      [id]
    );

    await dbConn.query('DELETE FROM forum_images_tbl WHERE forumID = ?', [id]);
    const [result] = await dbConn.query('DELETE FROM forum_posts_tbl WHERE forumID = ?', [id]);

    if (result.affectedRows === 0) {
      await dbConn.rollback();
      return res.status(404).json({ success: false, message: 'Forum post not found' });
    }

    for (const img of images) {
      if (buildOptimizedImageUrlFromStoredName(img.imageName)) {
        await deleteCloudinaryAssetByStoredName(img.imageName, 'image');
        continue;
      }

      const imagePath = path.join(FORUM_UPLOADS_DIR, img.imageName);
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (fileError) {
          console.error(`Failed to remove forum image file ${img.imageName}:`, fileError.message);
        }
      }
    }

    await dbConn.commit();

    try {
      await removeNotificationsByReference('forum_posts_tbl', Number(id));
    } catch (notifError) {
      console.error('Failed to remove forum notifications on delete:', notifError);
    }

    try {
      const io = getIO();
      io.emit('delete_forum_post', { postId: Number(id) });
      io.emit('forum_post_deleted', { postId: Number(id) });
    } catch (socketError) {
      console.error('Failed to emit delete forum socket event:', socketError.message);
    }

    return res.status(200).json({ success: true, message: 'Forum post deleted successfully' });
  } catch (error) {
    await dbConn.rollback();
    console.error('Error deleting forum post from content management:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete forum post' });
  } finally {
    dbConn.release();
  }
};
