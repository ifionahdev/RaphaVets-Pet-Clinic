// controllers/userController.js
import db from "../config/db.js"; // Your MySQL connection
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT accId, roleID, firstName, lastName, email FROM account_tbl WHERE accId = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const query = `
      UPDATE account_tbl
      SET firstName = ?, lastName = ?, email = ?, ${password ? "password = ?, " : ""} lastUpdatedAt = NOW()
      WHERE accId = ?;
    `;

    const values = password
      ? [firstName, lastName, email, hashedPassword, id]
      : [firstName, lastName, email, id];

    await db.query(query, values);

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
