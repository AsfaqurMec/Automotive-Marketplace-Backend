import { Server, Socket } from 'socket.io';
interface AuthenticatedConnection {
    userId: string;
    apiKey: string;
}
export default function whatsappHandlers(io: Server, socket: Socket, authenticatedConnections: Map<string, string | AuthenticatedConnection>): void;
export {};
