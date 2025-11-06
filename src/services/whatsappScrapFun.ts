import { Socket } from 'socket.io';
import { configData } from '../config/index.js';
import { SocketData } from '../types/index.js';

const authenticatedConnections = new Map<string, Socket>();

const validApiKeys = configData.VALID_API_KEYS || new Set();

function handleAuthentication(socket: Socket, data: SocketData): void {
    const { apiKey } = data;
    
    if (!apiKey) {
        socket.emit('auth_error', {
            message: 'API key is required'
        });
        return;
    }
    
    if (validApiKeys.has(apiKey)) {
        authenticatedConnections.set(apiKey, socket);
        socket.emit('auth_success', {
            message: 'Authentication successful'
        });
      
    } else {
        socket.emit('auth_error', {
            message: 'Invalid API key'
        });
        
    }
}

function handleSendNumbers(socket: Socket, data: SocketData): void {
    const { numbers, message } = data;
    
    if (!numbers || !Array.isArray(numbers)) {
        socket.emit('scrape_error', { message: 'Invalid numbers data' });
        return;
    }
    
    // Simulate processing delay
    setTimeout(() => {
        socket.to('682c69ffeffb6801805586e6').emit('numbers_scraped', {
            numbers: numbers,
            message: message || 'Numbers scraped successfully',
            count: numbers.length
          });
        
    }, 1000);
}

export {handleAuthentication,handleSendNumbers}