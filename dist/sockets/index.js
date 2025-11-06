import { Server } from 'socket.io';
import chatHandlers from './chatHandlers.js';
import aiHandlers from './aiHandlers.js';
import whatsappHandlers from './whatsappHandlers.js';
export default function initSocket(server) {
    const authenticatedConnections = new Map();
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
//# sourceMappingURL=index.js.map