// server.js
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import userRoute from "./routes/userRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import petRoute from "./routes/petRoute.js";
import clientRoute from "./routes/admin_routes/ownerAndPetRoute.js"
import dashboardRoute from "./routes/admin_routes/dashboardRoute.js"
import petCareTipsRoutes from './routes/petCareTipsRoute.js';
import videoRoutes from './routes/videoRoute.js';
import faqRoute from './routes/faqRoute.js';
import contentManagementRoute from './routes/admin_routes/contentManagementRoute.js';
import appointmentVisitRoute from "./routes/admin_routes/appointmentVisitRoute.js";
import labRecordRoute from './routes/admin_routes/labRecordRoute.js';
import medicalRecordsRoute from './routes/labRecordsRoute.js';
import chatRoutes from './routes/chatRoute.js';
import breedDetectRoute from './routes/ml_routes/breedDetectRoute.js';
import dotenv from "dotenv";
import supportRoute from './routes/supportRoute.js';
import notificationRoute from './routes/notificationRoute.js';
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

app.use(cors());
app.use(express.json());

// Routes
//login route
app.use("/api/auth", authRoutes);
//user route
app.use("/api/users", userRoute);
//feedback route
app.use("/api/feedback", feedbackRoutes);
//forum route
app.use("/api/forum", forumRoutes);
//appointment route
app.use("/api/appointment", appointmentRoute);
//pet routes
app.use("/api/pets", petRoute);
//pet care tips route
app.use("/api/pet-care-tips", petCareTipsRoutes);
app.use("/api/videos", videoRoutes);
//FAQ route
app.use("/api/faqs", faqRoute);
//notification route
app.use("/api/notifications", notificationRoute);

// ADMIN SIDE ROUTES
app.use("/api/admin", clientRoute);
app.use("/api/admin/dashboard", dashboardRoute);
//content management route
app.use('/api/admin/content', contentManagementRoute);
//admin appointment route
app.use("/api/admin/appointments", appointmentVisitRoute);
//lab/medical records
app.use('/api/admin/pet-records', labRecordRoute);

app.use('/api/medical-records', medicalRecordsRoute);

// Chatbot route
app.use("/api/chatbot", chatRoutes);

// Support route
app.use('/api/support', supportRoute);

// Serve uploaded pet images
app.use("/uploads", express.static("uploads"));

// Test route to verify server
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected!" });
});

// ML breed detection route
app.use("/api/ml", breedDetectRoute);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle notification read event
  socket.on('notificationRead', (data) => {
    const { userId, notificationId, notificationType } = data;
    // Broadcast to user's other devices that this notification was read
    socket.to(`user_${userId}`).emit('notificationUpdate', {
      id: `${notificationType}_${notificationId}`,
      notificationId,
      notificationType,
      read: true
    });
  });

  // Handle all notifications read
  socket.on('allNotificationsRead', (data) => {
    const { userId } = data;
    // Broadcast to user's other devices that all notifications are read
    socket.to(`user_${userId}`).emit('unreadCountUpdate', { count: 0 });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Function to emit new notification to specific user
export const emitNewNotification = (userId, notification) => {
  io.to(`user_${userId}`).emit('newNotification', notification);
};

// Function to emit unread count update
export const emitUnreadCountUpdate = (userId, count) => {
  io.to(`user_${userId}`).emit('unreadCountUpdate', { count });
};

server.listen(5000, () => console.log("✅ Server running on port 5000"));