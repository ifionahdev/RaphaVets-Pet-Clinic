import db from "../config/db.js";
import fs from "fs";
import {
  buildOptimizedImageUrlFromStoredName,
  uploadImageFromPath,
} from "../utils/cloudinary.js";

const resolvePetImageUrl = (imageName) => {
  if (!imageName) return "/images/dog-profile.png";
  if (/^https?:\/\//i.test(imageName)) return imageName;

  const optimizedUrl = buildOptimizedImageUrlFromStoredName(imageName);
  if (optimizedUrl) return optimizedUrl;

  return `/api/pets/images/${imageName}`;
};

// Helper to compute age
const calculateAge = (dob) => {
  if (!dob) return "Unknown";
  
  const birth = new Date(dob);
  // Handle invalid dates (like '0000-00-00' from your database)
  if (isNaN(birth.getTime())) return "Unknown";

  const now = new Date();
  if (birth > now) return "Unknown";

  const diffMs = now.getTime() - birth.getTime();
  const daysOld = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (daysOld < 7) {
    return `${daysOld} day${daysOld === 1 ? "" : "s"} old`;
  }

  if (daysOld < 28) {
    const weeksOld = Math.floor(daysOld / 7);
    return `${weeksOld} week${weeksOld === 1 ? "" : "s"} old`;
  }

  if (daysOld < 365) {
    const monthsOld = Math.floor(daysOld / 30);
    return `${monthsOld} month${monthsOld === 1 ? "" : "s"} old`;
  }
  
  let yearsOld = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) yearsOld--;

  return `${yearsOld} yr${yearsOld === 1 ? "" : "s"} old`;
};

// Get pets for the logged-in user
export const getUserPets = async (req, res) => {
  try {
    const accID = req.user?.id;
    if (!accID) return res.status(401).json({ message: "User not authenticated" });

    const [rows] = await db.query(
      `SELECT p.petID, p.petName, p.petGender, b.breedName AS breed,
              p.dateOfBirth, p.weight_kg, p.imageName, p.color, p.note
         FROM pet_tbl p
         JOIN breed_tbl b ON p.breedID = b.breedID
        WHERE p.accID = ? AND p.isDeleted = 0`,
      [accID]
    );

    const pets = rows.map((p) => ({
      id: p.petID,
      name: p.petName,
      gender: p.petGender,
      breed: p.breed,
      age: calculateAge(p.dateOfBirth),
      image: resolvePetImageUrl(p.imageName),
      weight: p.weight_kg,
      color: p.color,
      note: p.note
    }));

    res.json(pets);
  } catch (err) {
    console.error("❌ getUserPets Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single pet details
export const getPetDetails = async (req, res) => {
  try {
    const petID = req.params.id;

    const [petRows] = await db.query(
      `SELECT p.petID, p.petName, p.petGender, b.breedName AS breed,
              p.dateOfBirth, p.weight_kg, p.imageName, p.color, p.note
         FROM pet_tbl p
         JOIN breed_tbl b ON p.breedID = b.breedID
        WHERE p.petID = ? AND p.isDeleted = 0`,
      [petID]
    );

    if (!petRows.length)
      return res.status(404).json({ message: "Pet not found" });

    const pet = petRows[0];

    // Get pet's appointments - FIXED: Using correct column names from your database
    const [appointments] = await db.query(
      `SELECT 
          a.appointmentID AS id,
          a.appointmentDate AS appointmentDate,
          p.petName,
          CONCAT(acc.firstName, ' ', acc.lastName) AS ownerName,
          s.service AS type,
          CONCAT(DATE_FORMAT(a.appointmentDate, '%b %e, %Y'), ' - ', st.scheduleTime) AS date,
          ast.statusName AS status
       FROM appointment_tbl a
       JOIN pet_tbl p ON a.petID = p.petID
       JOIN service_tbl s ON a.serviceID = s.serviceID
       JOIN account_tbl acc ON a.accID = acc.accId
       JOIN scheduletime_tbl st ON a.scheduledTimeID = st.scheduledTimeID
       JOIN appointment_status_tbl ast ON a.statusID = ast.statusID
       WHERE a.petID = ?
       ORDER BY a.appointmentDate DESC`,
      [petID]
    );

    const latestCompletedAppointment = appointments.find(
      (appt) => String(appt.status || '').toLowerCase() === 'completed'
    );

    const lastCheck = latestCompletedAppointment?.appointmentDate
      ? new Date(latestCompletedAppointment.appointmentDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      : 'N/A';

    res.json({
      id: pet.petID,
      name: pet.petName,
      gender: pet.petGender,
      breed: pet.breed,
      dateOfBirth: pet.dateOfBirth,
      age: calculateAge(pet.dateOfBirth),
      weight: pet.weight_kg,
      lastCheck,
      color: pet.color,
      note: pet.note,
      image: resolvePetImageUrl(pet.imageName),
      appointments,
    });

  } catch (err) {
    console.error("❌ getPetDetails Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload a single pet image
export const uploadPetImage = async (req, res) => {
  try {
    const petID = req.params.id;

    if (!req.file)
      return res.status(400).json({ message: "❌ No image uploaded" });

    const uploadedImage = await uploadImageFromPath(req.file.path, {
      scope: "pets",
      originalName: req.file.originalname,
    });
    const imageName = uploadedImage.storedName;

    // Check if pet exists and belongs to the authenticated user
    const [petRows] = await db.query(
      "SELECT petID FROM pet_tbl WHERE petID = ? AND accID = ? AND isDeleted = 0",
      [petID, req.user?.id]
    );

    if (!petRows.length) {
      return res.status(404).json({ message: "Pet not found or access denied" });
    }

    await db.query("UPDATE pet_tbl SET imageName = ? WHERE petID = ?", [
      imageName,
      petID,
    ]);

    // Remove temporary local file after upload to Cloudinary.
    if (req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      message: "✅ Image uploaded successfully",
      imageUrl: resolvePetImageUrl(imageName),
    });
  } catch (err) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("❌ uploadPetImage Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};