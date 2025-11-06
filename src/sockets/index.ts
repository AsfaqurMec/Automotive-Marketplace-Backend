import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import chatHandlers from './chatHandlers.js';
import aiHandlers from './aiHandlers.js';
import whatsappHandlers from './whatsappHandlers.js';

interface AuthenticatedConnection {
  userId: string;
  apiKey: string;
}

export default function initSocket(server: HttpServer) {
  const authenticatedConnections = new Map<string, string | AuthenticatedConnection>();

  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  io.on('connection', (socket) => {
    chatHandlers(io, socket);
    aiHandlers(io, socket);
    whatsappHandlers(io, socket, authenticatedConnections);

    socket.on('disconnect', () => {
      authenticatedConnections.delete(socket.id);
    });
  });
}