import db from "../config/db.js"; // make sure this is your MySQL pool

export const getAllServices = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM service_tbl");
    res.json(rows);
  } catch (err) {
    console.error("❌ Failed to fetch services:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const  getAllTime = async (req, res) =>{
  try {
    const [rows] = await db.query("SELECT * FROM starttime_tbl");
    res.json(rows);
  }catch (err) {
    console.error("❌ Failed to fetch time slots:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.user.id;
    const { petID, serviceID, appointmentDate, startTime, endTime } = req.body;

    if (!petID || !serviceID || !appointmentDate || !startTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const sql = `
      INSERT INTO appointment_tbl
        (accID, petID, serviceID, appointmentDate, startTime, statusID)
      VALUES (?, ?, ?, ?, ?, 1)
    `;

    const [result] = await db.query(sql, [
      userId,
      petID,
      serviceID,
      appointmentDate,
      startTime,
    ]);

    // Send proper JSON response
    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: result.insertId,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

