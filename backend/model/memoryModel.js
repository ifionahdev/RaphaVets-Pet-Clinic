import db from "../config/db.js";

export const getMemory = async (userId) => {
  const [rows] = await db.execute(
    "SELECT ai_memory FROM clientinfo_tbl WHERE accId = ?",
    [userId]
  );

  return rows[0]?.ai_memory || "";
};

export const updateMemory = async (userId, memory) => {
  await db.execute(
    "UPDATE clientinfo_tbl SET ai_memory = ? WHERE accId = ?",
    [memory, userId]
  );
};
