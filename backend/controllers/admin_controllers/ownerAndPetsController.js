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

export const getBreed = async (req, res) => {
  try {
    const speciesQuery = req.query.species; // expects 'Canine' or 'Feline'
    let query = "SELECT * FROM breed_tbl";
    const params = [];

    if (speciesQuery) {
      query += " WHERE species = ?";
      params.push(speciesQuery);
    }

    const [rows] = await db.execute(query, params);

    // return array of breed names only
    const breedNames = rows.map(r => r.breedName);

    res.status(200).json(breedNames);
  } catch (error) {
    console.error("Error fetching breeds:", error);
    res.status(500).json({ message: "Failed to fetch breeds", error: error.message });
  }
};

export const getSpecies = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT DISTINCT species FROM breed_tbl");
    const species = rows.map(r => r.species);
    res.status(200).json(species);
  } catch (error) {
    console.error("Error fetching species:", error);
    res.status(500).json({ message: "Failed to fetch species", error: error.message });
  }
};

export const createPet = async (req, res) => {
  try {
    const {
      ownerId,
      type,
      breed,
      name,
      age,
      sex,
      weight,
      color,
      dob,
      notes
    } = req.body;

    if (!ownerId || !type || !breed || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch breedID from breed_tbl
    const [breedRow] = await db.execute(
      "SELECT breedID FROM breed_tbl WHERE breedName = ? LIMIT 1",
      [breed]
    );

    if (breedRow.length === 0) {
      return res.status(400).json({ message: "Invalid breed" });
    }

    const breedID = breedRow[0].breedID;

    // Insert new pet
    await db.execute(
      `INSERT INTO pet_tbl 
        (accID, breedID, petName, petGender, weight_kg, color, dateOfBirth, note) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ownerId,
        breedID,
        name,
        sex || null,
        weight || null,
        color || null,
        dob || null,
        notes || null
      ]
    );

    console.log("REQ BODY:", req.body);
    const petData = req.body;

console.log("Saving pet data:", petData);

    res.status(201).json({ message: "Pet created successfully" });

  } catch (err) {
    console.log("REQ BODY:", req.body);

    console.error("Error creating pet:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
