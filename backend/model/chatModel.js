import db from "../config/db.js";

// Save message
export const saveMessage = async (userId, role, message) => {
  await db.execute(
    `INSERT INTO chat_messages (user_id, role, message)
     VALUES (?, ?, ?)`,
    [userId, role, message]
  );
};

// Get recent messages
export const getRecentMessages = async (userId, limit = 8) => {
  const [rows] = await db.execute(
    `SELECT role, message, created_at
     FROM chat_messages
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT ?`,
    [userId, limit]
  );

  // reverse so GPT reads conversation correctly
  return rows.reverse().map(m => ({
    role: m.role,
    content: m.message,
    timestamp: m.created_at
  }));
};