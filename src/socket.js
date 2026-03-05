// src/socket.js
import { io } from 'socket.io-client';
import { SOCKET_URL } from './utils/runtimeUrls';

const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    timeout: 20000,
});

socket.on('connect_error', (err) => {
    console.error('❌ Socket connect_error:', err.message, 'URL:', SOCKET_URL);
});

export default socket;