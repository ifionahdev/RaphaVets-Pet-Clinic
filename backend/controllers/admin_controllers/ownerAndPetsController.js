import db from "../../config/db.js";

export const getOwnersWithPets = async (req, res) => {
  try {
    // fetch all owners (roleID = 1)
    const [owners] = await db.execute(`
      SELECT 
        a.accId,
        CONCAT(a.firstName, ' ', a.lastName) AS name,
        a.email,
        c.gender,
        c.dateOfBirth,
        c.address,
        c.contactNo,
        a.createdAt
      FROM account_tbl a
      LEFT JOIN clientinfo_tbl c ON a.accId = c.accId
      WHERE a.roleID = 1 AND a.isDeleted = 0
    `);

    // fetch all pets
    const [pets] = await db.execute(`
      SELECT 
        p.*,
        b.*
      FROM pet_tbl p
      JOIN breed_tbl b ON p.breedID = b.breedID
      WHERE isDeleted = 0
    `);

    // group pets to their owner
    const results = owners.map(owner => ({
      ...owner,
      pets: pets.filter(p => p.accID === owner.accId)
    }));

    res.status(200).json(results);

  } catch (err) {
    console.error("Error (owners-with-pets):", err);
    res.status(500).json({ error: "Server error" });
  }
};
