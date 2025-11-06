import { Socket } from 'socket.io';
import { SocketData } from '../types/index.js';
declare function handleAuthentication(socket: Socket, data: SocketData): void;
declare function handleSendNumbers(socket: Socket, data: SocketData): void;
export { handleAuthentication, handleSendNumbers };
