import db from "../../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get admin name (first admin user found)
    const [adminRows] = await db.query(`
      SELECT firstName, lastName 
      FROM account_tbl 
      WHERE roleID = 2 AND isDeleted = 0 
      LIMIT 1
    `);

    // Get total pet owners (unique accounts with pets)
    const [ownerRows] = await db.query(`
      SELECT COUNT(DISTINCT accID) as totalOwners 
      FROM pet_tbl 
      WHERE isDeleted = 0
    `);

    // Get total pets
    const [petRows] = await db.query(`
      SELECT COUNT(*) as totalPets 
      FROM pet_tbl 
      WHERE isDeleted = 0
    `);

    const adminName = adminRows.length > 0 
      ? `${adminRows[0].firstName} ${adminRows[0].lastName}`
      : 'Admin';

    const stats = {
      adminName,
      totalOwners: ownerRows[0]?.totalOwners || 0,
      totalPets: petRows[0]?.totalPets || 0,
    };

    res.json(stats);
  } catch (err) {
    console.error("❌ Failed to fetch dashboard stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};