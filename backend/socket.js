// backend/socket.js
import { Server } from 'socket.io';
import { registerSocketSession, removeSocketSession } from './controllers/notificationController.js';

let io;

export const initializeSocket = (server) => {
    const frontendOrigin = process.env.FRONTEND_URL || process.env.CLINIC_URL;

    if (!frontendOrigin) {
        throw new Error("FRONTEND_URL (or CLINIC_URL) is required for Socket.IO CORS origin");
    }

    io = new Server(server, {
        cors: {
            origin: frontendOrigin,
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Get client info for database
        const userAgent = socket.handshake.headers['user-agent'];
        const ipAddress = socket.handshake.address;

        // Handle user joining their room
        socket.on('join', async (userId) => {
            if (userId) {
                socket.join(`user_${userId}`);
                console.log(`User ${userId} joined room user_${userId}`);
                
                // 🔴 ADD THIS - Register in database
                try {
                    await registerSocketSession(userId, socket.id, userAgent, ipAddress);
                    console.log(`✅ Session saved to database for user ${userId}`);
                    
                    // Send confirmation back to client
                    socket.emit('joined_room', { success: true, userId });
                } catch (error) {
                    console.error(`❌ Failed to save session:`, error);
                }
            }
        });

        // Handle notification read
        socket.on('notificationRead', (data) => {
            const { userId, notificationId } = data;
            io.to(`user_${userId}`).emit('notification_read', { notificationId });
        });

        // Handle all notifications read
        socket.on('allNotificationsRead', (data) => {
            const { userId } = data;
            io.to(`user_${userId}`).emit('all_read');
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log('Client disconnected:', socket.id);
            
            // 🔴 ADD THIS - Remove from database
            try {
                await removeSocketSession(socket.id);
                console.log(`✅ Session removed from database for socket ${socket.id}`);
            } catch (error) {
                console.error(`❌ Failed to remove session:`, error);
            }
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};