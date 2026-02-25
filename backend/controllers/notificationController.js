// controllers/notificationController.js
import db from '../config/db.js';

// Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user preferences
    const [preferences] = await db.execute(
      'SELECT appointmentReminders, petHealthUpd, promoEmail, clinicAnnouncement FROM userpreference_tbl WHERE accId = ?',
      [userId]
    );

    const userPrefs = preferences[0] || {
      appointmentReminders: 1,
      petHealthUpd: 1,
      promoEmail: 1,
      clinicAnnouncement: 1
    };

    // Get user's pets for personalized notifications
    const [pets] = await db.execute(
      'SELECT petID, petName FROM pet_tbl WHERE accID = ? AND isDeleted = 0',
      [userId]
    );

    const petIds = pets.map(pet => pet.petID);
    let allNotifications = [];

    // Get recent appointments (if user has appointment reminders enabled)
    if (userPrefs.appointmentReminders && petIds.length > 0) {
      const [appointments] = await db.execute(`
        SELECT a.appointmentID, a.appointmentDate, a.statusID, a.lastUpdatedAt,
               s.statusName, p.petName, sv.service, p.petID
        FROM appointment_tbl a
        JOIN pet_tbl p ON a.petID = p.petID
        JOIN appointment_status_tbl s ON a.statusID = s.statusID
        JOIN service_tbl sv ON a.serviceID = sv.serviceID
        WHERE a.accID = ? AND a.isDeleted = 0
        ORDER BY a.lastUpdatedAt DESC LIMIT 5
      `, [userId]);

      for (const apt of appointments) {
        const [readStatus] = await db.execute(
          'SELECT readID FROM notification_reads_tbl WHERE accID = ? AND notificationType = ? AND notificationID = ?',
          [userId, 'appointment', apt.appointmentID]
        );

        let message = '';
        let title = 'Appointment Update';
        let icon = 'fa-calendar-check';
        let color = 'text-purple-500';
        
        switch(apt.statusName.toLowerCase()) {
          case 'pending':
            message = `${apt.petName}'s ${apt.service} appointment on ${new Date(apt.appointmentDate).toLocaleDateString()} is pending approval`;
            color = 'text-yellow-500';
            break;
          case 'upcoming':
            message = `${apt.petName}'s ${apt.service} appointment on ${new Date(apt.appointmentDate).toLocaleDateString()} is confirmed and upcoming`;
            color = 'text-green-500';
            break;
          case 'rejected':
            message = `${apt.petName}'s ${apt.service} appointment on ${new Date(apt.appointmentDate).toLocaleDateString()} was rejected`;
            color = 'text-red-500';
            break;
          case 'cancelled':
            message = `${apt.petName}'s ${apt.service} appointment on ${new Date(apt.appointmentDate).toLocaleDateString()} was cancelled`;
            color = 'text-gray-500';
            break;
          case 'completed':
            message = `${apt.petName}'s ${apt.service} appointment on ${new Date(apt.appointmentDate).toLocaleDateString()} has been completed`;
            color = 'text-blue-500';
            break;
          case 'no show':
            message = `${apt.petName}'s ${apt.service} appointment on ${new Date(apt.appointmentDate).toLocaleDateString()} was marked as no show`;
            color = 'text-orange-500';
            break;
          default:
            message = `${apt.petName}'s ${apt.service} appointment is ${apt.statusName.toLowerCase()}`;
        }

        allNotifications.push({
          id: `apt_${apt.appointmentID}`,
          type: 'appointment',
          title,
          message,
          time: new Date(apt.lastUpdatedAt).toLocaleString(),
          timestamp: new Date(apt.lastUpdatedAt).getTime(),
          read: readStatus.length > 0,
          icon,
          color,
          // Appointments tab
          link: `/pet/${apt.petID}?tab=appointments`,
          notificationId: apt.appointmentID,
          notificationType: 'appointment'
        });
      }
    }

    // Get recent forum posts
    if (userPrefs.petHealthUpd) {
      const [forumPosts] = await db.execute(`
        SELECT f.forumID, f.postType, f.description, f.lastUpdatedAt, 
               a.firstName, a.lastName
        FROM forum_posts_tbl f
        JOIN account_tbl a ON f.accID = a.accId
        WHERE f.isDeleted = 0 
          AND f.createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ORDER BY f.lastUpdatedAt DESC LIMIT 5
      `);

      for (const post of forumPosts) {
        const [readStatus] = await db.execute(
          'SELECT readID FROM notification_reads_tbl WHERE accID = ? AND notificationType = ? AND notificationID = ?',
          [userId, 'lost_pet', post.forumID]
        );

        allNotifications.push({
          id: `forum_${post.forumID}`,
          type: 'lost_pet',
          title: post.postType === 'Lost' ? '🐕 Lost Pet Alert' : '🐈 Found Pet Alert',
          message: `${post.firstName} ${post.lastName} posted: ${post.description.substring(0, 60)}${post.description.length > 60 ? '...' : ''}`,
          time: new Date(post.lastUpdatedAt).toLocaleString(),
          timestamp: new Date(post.lastUpdatedAt).getTime(),
          read: readStatus.length > 0,
          icon: 'fa-paw',
          color: post.postType === 'Lost' ? 'text-amber-500' : 'text-green-500',
          link: '/forum',
          notificationId: post.forumID,
          notificationType: 'lost_pet'
        });
      }
    }

    // Get recent pet care tips - ONLY PUBLISHED
    if (userPrefs.petHealthUpd) {
      const [careTips] = await db.execute(`
        SELECT p.petCareID, p.title, p.shortDescription, p.lastUpdated, 
               c.categoryName, i.icon
        FROM pet_care_tips_content_tbl p
        JOIN pet_care_category_tbl c ON p.petCareCategoryID = c.petCareCategoryID
        JOIN icon_tbl i ON p.iconID = i.iconID
        WHERE p.isDeleted = 0 
          AND p.pubStatusID = 2
          AND p.lastUpdated >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ORDER BY p.lastUpdated DESC LIMIT 5
      `);

      for (const tip of careTips) {
        const [readStatus] = await db.execute(
          'SELECT readID FROM notification_reads_tbl WHERE accID = ? AND notificationType = ? AND notificationID = ?',
          [userId, 'care_tip', tip.petCareID]
        );

        allNotifications.push({
          id: `tip_${tip.petCareID}`,
          type: 'care_tip',
          title: '✨ New Pet Care Tip',
          message: tip.title,
          time: new Date(tip.lastUpdated).toLocaleString(),
          timestamp: new Date(tip.lastUpdated).getTime(),
          read: readStatus.length > 0,
          icon: `fa-${tip.icon || 'lightbulb'}`,
          color: 'text-emerald-500',
          link: '/pet-tips',
          notificationId: tip.petCareID,
          notificationType: 'care_tip'
        });
      }
    }

    // Get recent videos - ONLY PUBLISHED
    if (userPrefs.clinicAnnouncement) {
      const [videos] = await db.execute(`
        SELECT v.videoID, v.videoTitle, v.lastUpdated, c.videoCategory
        FROM video_content_tbl v
        JOIN video_category_tbl c ON v.videoCategoryID = c.videoCategoryID
        WHERE v.isDeleted = 0 
          AND v.pubStatusID = 2
          AND v.lastUpdated >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ORDER BY v.lastUpdated DESC LIMIT 5
      `);

      for (const video of videos) {
        const [readStatus] = await db.execute(
          'SELECT readID FROM notification_reads_tbl WHERE accID = ? AND notificationType = ? AND notificationID = ?',
          [userId, 'video', video.videoID]
        );

        allNotifications.push({
          id: `video_${video.videoID}`,
          type: 'video',
          title: '📹 New Educational Video',
          message: `Watch: ${video.videoTitle}`,
          time: new Date(video.lastUpdated).toLocaleString(),
          timestamp: new Date(video.lastUpdated).getTime(),
          read: readStatus.length > 0,
          icon: 'fa-film',
          color: 'text-blue-500',
          link: '/videos',
          notificationId: video.videoID,
          notificationType: 'video'
        });
      }
    }

    // ========== Lab Records & Medical History ==========
    // Get recent lab records and medical history for user's pets
    if (petIds.length > 0) {
      // Create placeholders for IN clause
      const placeholders = petIds.map(() => '?').join(',');
      
      // Get pet medical records with file uploads
      const [medicalRecords] = await db.execute(`
        SELECT pm.petMedicalID, pm.recordTitle, pm.labTypeID, pm.uploadedOn, 
               lt.labType, p.petName, p.petID,
               (SELECT COUNT(*) FROM petmedical_file_tbl pf WHERE pf.petmedicalID = pm.petMedicalID AND pf.isDeleted = 0) as fileCount
        FROM petmedical_tbl pm
        JOIN pet_tbl p ON pm.petID = p.petID
        JOIN labtype_tbl lt ON pm.labTypeID = lt.labType_ID
        WHERE pm.petID IN (${placeholders}) 
          AND pm.isDeleted = 0
          AND pm.uploadedOn >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ORDER BY pm.uploadedOn DESC LIMIT 5
      `, petIds);

      for (const record of medicalRecords) {
        const [readStatus] = await db.execute(
          'SELECT readID FROM notification_reads_tbl WHERE accID = ? AND notificationType = ? AND notificationID = ?',
          [userId, 'medical', record.petMedicalID]
        );

        // Get the latest file if any
        const [files] = await db.execute(`
          SELECT originalName FROM petmedical_file_tbl 
          WHERE petmedicalID = ? AND isDeleted = 0 
          ORDER BY uploadedOn DESC LIMIT 1
        `, [record.petMedicalID]);

        const fileName = files.length > 0 ? files[0].originalName : '';
        
        allNotifications.push({
          id: `med_${record.petMedicalID}`,
          type: 'medical',
          title: record.labType === 'Lab Record' ? '🔬 New Lab Record' : '📋 Medical History Update',
          message: `${record.petName}'s ${record.recordTitle}${fileName ? ` - ${fileName}` : ''}`,
          time: new Date(record.uploadedOn).toLocaleString(),
          timestamp: new Date(record.uploadedOn).getTime(),
          read: readStatus.length > 0,
          icon: record.labTypeID === 1 ? 'fa-flask' : 'fa-notes-medical',
          color: record.labTypeID === 1 ? 'text-cyan-500' : 'text-indigo-500',
          // Medical records tab
          link: `/pet/${record.petID}?tab=medical`,
          notificationId: record.petMedicalID,
          notificationType: 'medical'
        });
      }

      // Get recent file uploads to existing records
      const [fileUploads] = await db.execute(`
        SELECT pf.fileID, pf.originalName, pf.uploadedOn, pf.petmedicalID,
               pm.recordTitle, pm.labTypeID, p.petName, p.petID
        FROM petmedical_file_tbl pf
        JOIN petmedical_tbl pm ON pf.petmedicalID = pm.petMedicalID
        JOIN pet_tbl p ON pm.petID = p.petID
        WHERE pm.petID IN (${placeholders}) 
          AND pf.isDeleted = 0
          AND pf.uploadedOn >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ORDER BY pf.uploadedOn DESC LIMIT 5
      `, petIds);

      for (const file of fileUploads) {
        const [readStatus] = await db.execute(
          'SELECT readID FROM notification_reads_tbl WHERE accID = ? AND notificationType = ? AND notificationID = ?',
          [userId, 'medical_file', file.fileID]
        );

        allNotifications.push({
          id: `file_${file.fileID}`,
          type: 'medical',
          title: '📎 New File Uploaded',
          message: `${file.petName}'s ${file.recordTitle} - ${file.originalName}`,
          time: new Date(file.uploadedOn).toLocaleString(),
          timestamp: new Date(file.uploadedOn).getTime(),
          read: readStatus.length > 0,
          icon: 'fa-file-upload',
          color: 'text-purple-500',
          // Medical records tab
          link: `/pet/${file.petID}?tab=medical`,
          notificationId: file.fileID,
          notificationType: 'medical_file'
        });
      }
    }

    // SORT ALL NOTIFICATIONS BY TIMESTAMP (most recent first)
    allNotifications.sort((a, b) => b.timestamp - a.timestamp);

    // Count unread notifications
    const unreadCount = allNotifications.filter(n => !n.read).length;

    res.json({
      notifications: allNotifications.slice(0, 20), // Limit to 20 most recent
      unreadCount
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId, notificationType } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!notificationId || !notificationType) {
      return res.status(400).json({ error: 'Notification ID and type are required' });
    }

    // INSERT OR UPDATE with ON DUPLICATE KEY UPDATE
    await db.execute(
      `INSERT INTO notification_reads_tbl (accID, notificationType, notificationID, readAt) 
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE readAt = NOW()`,
      [userId, notificationType, notificationId]
    );

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${userId}`).emit('notificationUpdate', {
        id: `${notificationType}_${notificationId}`,
        notificationId,
        notificationType,
        read: true
      });

      const unreadCount = await getUnreadCountForUser(userId);
      io.to(`user_${userId}`).emit('unreadCountUpdate', { count: unreadCount });
    }

    res.json({ success: true, message: 'Notification marked as read' });

  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const [notifications] = await db.execute(`
      SELECT 'appointment' as type, a.appointmentID as id FROM appointment_tbl a
      WHERE a.accID = ? AND a.isDeleted = 0 
      AND NOT EXISTS (
        SELECT 1 FROM notification_reads_tbl nr 
        WHERE nr.accID = ? AND nr.notificationType = 'appointment' 
        AND nr.notificationID = a.appointmentID
      )
      UNION
      SELECT 'lost_pet' as type, f.forumID as id FROM forum_posts_tbl f
      WHERE f.isDeleted = 0 
      AND NOT EXISTS (
        SELECT 1 FROM notification_reads_tbl nr 
        WHERE nr.accID = ? AND nr.notificationType = 'lost_pet' 
        AND nr.notificationID = f.forumID
      )
      UNION
      SELECT 'care_tip' as type, p.petCareID as id FROM pet_care_tips_content_tbl p
      WHERE p.isDeleted = 0 AND p.pubStatusID = 2
      AND NOT EXISTS (
        SELECT 1 FROM notification_reads_tbl nr 
        WHERE nr.accID = ? AND nr.notificationType = 'care_tip' 
        AND nr.notificationID = p.petCareID
      )
      UNION
      SELECT 'video' as type, v.videoID as id FROM video_content_tbl v
      WHERE v.isDeleted = 0 AND v.pubStatusID = 2
      AND NOT EXISTS (
        SELECT 1 FROM notification_reads_tbl nr 
        WHERE nr.accID = ? AND nr.notificationType = 'video' 
        AND nr.notificationID = v.videoID
      )
      UNION
      SELECT 'medical' as type, pm.petMedicalID as id FROM petmedical_tbl pm
      JOIN pet_tbl p ON pm.petID = p.petID
      WHERE p.accID = ? AND pm.isDeleted = 0
      AND NOT EXISTS (
        SELECT 1 FROM notification_reads_tbl nr 
        WHERE nr.accID = ? AND nr.notificationType = 'medical' 
        AND nr.notificationID = pm.petMedicalID
      )
      UNION
      SELECT 'medical_file' as type, pf.fileID as id FROM petmedical_file_tbl pf
      JOIN petmedical_tbl pm ON pf.petmedicalID = pm.petMedicalID
      JOIN pet_tbl p ON pm.petID = p.petID
      WHERE p.accID = ? AND pf.isDeleted = 0
      AND NOT EXISTS (
        SELECT 1 FROM notification_reads_tbl nr 
        WHERE nr.accID = ? AND nr.notificationType = 'medical_file' 
        AND nr.notificationID = pf.fileID
      )
    `, [userId, userId, userId, userId, userId, userId, userId, userId, userId]);

    for (const notif of notifications) {
      await db.execute(
        'INSERT IGNORE INTO notification_reads_tbl (accID, notificationType, notificationID) VALUES (?, ?, ?)',
        [userId, notif.type, notif.id]
      );
    }

    const io = req.app.get('io');
    if (io) {
      io.to(`user_${userId}`).emit('unreadCountUpdate', { count: 0 });
      io.to(`user_${userId}`).emit('allNotificationsRead', { userId });
    }

    res.json({ 
      success: true, 
      message: `Marked ${notifications.length} notifications as read` 
    });

  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
};

// Get unread count only
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const unreadCount = await getUnreadCountForUser(userId);

    res.json({ unreadCount });

  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
};

// Helper function to get unread count
async function getUnreadCountForUser(userId) {
  // Get user's pets first
  const [pets] = await db.execute(
    'SELECT petID FROM pet_tbl WHERE accID = ? AND isDeleted = 0',
    [userId]
  );
  
  const petIds = pets.map(p => p.petID);
  const petPlaceholders = petIds.length > 0 ? petIds.map(() => '?').join(',') : 'NULL';

  const [counts] = await db.execute(`
    SELECT 
      (SELECT COUNT(*) FROM appointment_tbl a
       LEFT JOIN notification_reads_tbl nr 
         ON nr.accID = a.accID 
         AND nr.notificationType = 'appointment' 
         AND nr.notificationID = a.appointmentID
       WHERE a.accID = ? AND a.isDeleted = 0 AND nr.readID IS NULL) as appointmentCount,
       
      (SELECT COUNT(*) FROM forum_posts_tbl f
       LEFT JOIN notification_reads_tbl nr 
         ON nr.accID = ? 
         AND nr.notificationType = 'lost_pet' 
         AND nr.notificationID = f.forumID
       WHERE f.isDeleted = 0 AND nr.readID IS NULL) as forumCount,
       
      (SELECT COUNT(*) FROM pet_care_tips_content_tbl p
       LEFT JOIN notification_reads_tbl nr 
         ON nr.accID = ? 
         AND nr.notificationType = 'care_tip' 
         AND nr.notificationID = p.petCareID
       WHERE p.isDeleted = 0 AND p.pubStatusID = 2 AND nr.readID IS NULL) as careTipCount,
       
      (SELECT COUNT(*) FROM video_content_tbl v
       LEFT JOIN notification_reads_tbl nr 
         ON nr.accID = ? 
         AND nr.notificationType = 'video' 
         AND nr.notificationID = v.videoID
       WHERE v.isDeleted = 0 AND v.pubStatusID = 2 AND nr.readID IS NULL) as videoCount,
       
      (SELECT COUNT(*) FROM petmedical_tbl pm
       JOIN pet_tbl p ON pm.petID = p.petID
       LEFT JOIN notification_reads_tbl nr 
         ON nr.accID = ? 
         AND nr.notificationType = 'medical' 
         AND nr.notificationID = pm.petMedicalID
       WHERE p.accID = ? AND pm.isDeleted = 0 AND nr.readID IS NULL) as medicalCount,
       
      (SELECT COUNT(*) FROM petmedical_file_tbl pf
       JOIN petmedical_tbl pm ON pf.petmedicalID = pm.petMedicalID
       JOIN pet_tbl p ON pm.petID = p.petID
       LEFT JOIN notification_reads_tbl nr 
         ON nr.accID = ? 
         AND nr.notificationType = 'medical_file' 
         AND nr.notificationID = pf.fileID
       WHERE p.accID = ? AND pf.isDeleted = 0 AND nr.readID IS NULL) as fileCount
  `, [userId, userId, userId, userId, userId, userId, userId, userId]);

  return counts[0].appointmentCount + 
         counts[0].forumCount + 
         counts[0].careTipCount + 
         counts[0].videoCount +
         counts[0].medicalCount +
         counts[0].fileCount;
}
