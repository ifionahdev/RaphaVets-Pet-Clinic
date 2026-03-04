// src/socket.js
import { io } from 'socket.io-client';
import { SOCKET_URL } from './utils/runtimeUrls';

const socket = io(SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket', 'polling'] // Add this for better compatibility
});

export default socket;