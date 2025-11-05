// server.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";  // ✅ fixed
import userRoute from "./routes/userRoute.js"; 
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute); // ✅ mounts user routes here

// Test route to verify server
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected!" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
