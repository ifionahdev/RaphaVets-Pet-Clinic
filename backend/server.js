// server.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; 
import userRoute from "./routes/userRoute.js"; 
import appointmentRoute from "./routes/appointmentRoute.js";
import petRoute from "./routes/petRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

// Routes
//login route
app.use("/api/auth", authRoutes);
//user route
app.use("/api/users", userRoute);
//appointment route
app.use("/api/appointment", appointmentRoute);

//pet routes
app.use("/api/pets", petRoute);




// Test route to verify server
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected!" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
