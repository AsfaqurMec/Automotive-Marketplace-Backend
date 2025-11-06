import { handleSendNumbers } from '../services/whatsappScrapFun.js';
import { configData } from '../config/index.js';
export default function whatsappHandlers(io, socket, authenticatedConnections) {
    socket.on('send_numbers', (data) => handleSendNumbers(socket, data));
    socket.on('auth', ({ apiKey }) => {
        if (!apiKey)
            return socket.emit('auth_error', { message: 'API key is required' });
        if (configData.VALID_API_KEYS.has(apiKey)) {
            authenticatedConnections.set(socket.id, apiKey);
            socket.emit('auth_success', { message: 'Authentication successful' });
        }
        else {
            socket.emit('auth_error', { message: 'Invalid API key' });
        }
    });
    socket.on('extension_auth', ({ userId, apiKey }) => {
        if (!userId || !apiKey) {
            return socket.emit('extension_auth_error', { message: 'User ID and API key required' });
        }
        if (configData.VALID_API_KEYS.has(apiKey)) {
            authenticatedConnections.set(socket.id, { userId, apiKey });
            socket.join(`extension_${userId}`);
            socket.emit('extension_auth_success', { message: 'Extension authenticated', userId });
        }
        else {
            socket.emit('extension_auth_error', { message: 'Invalid API key' });
        }
    });
    socket.on('whatsapp_scrape_numbers', ({ userId, apiKey }) => {
        const connection = authenticatedConnections.get(socket.id);
        if (!connection || typeof connection === 'string' || connection.userId !== userId || connection.apiKey !== apiKey) {
            return socket.emit('scrape_error', { message: 'Extension not authenticated' });
        }
        io.to(`extension_${userId}`).emit('start_whatsapp_scraping', { userId, timestamp: new Date().toISOString() });
    });
    socket.on('scraped_numbers', ({ userId, numbers, message }) => {
        if (!numbers || !Array.isArray(numbers)) {
            return socket.emit('scrape_error', { message: 'Invalid scraped data' });
        }
        if (!userId) {
            return socket.emit('scrape_error', { message: 'User ID is required' });
        }
        const processedNumbers = numbers.map((n, i) => ({
            id: i + 1,
            number: n,
            status: 'Ready',
            scrapedAt: new Date().toISOString()
        }));
        io.to(userId).emit('numbers_scraped', {
            numbers: processedNumbers,
            message: message || 'Numbers scraped successfully',
            count: processedNumbers.length
        });
    });
    socket.on('send_bulk_message', ({ userId, numbers, message, apiKey }) => {
        const connection = authenticatedConnections.get(socket.id);
        if (!connection || typeof connection === 'string' || connection.userId !== userId || connection.apiKey !== apiKey) {
            return socket.emit('bulk_message_error', { message: 'Extension not authenticated' });
        }
        io.to(`extension_${userId}`).emit('send_bulk_messages', { numbers, message, userId, timestamp: new Date().toISOString() });
    });
    socket.on('bulk_message_status', ({ userId, results }) => {
        if (results && userId) {
            io.to(userId).emit('bulk_message_results', { results, timestamp: new Date().toISOString() });
        }
    });
}
//# sourceMappingURL=whatsappHandlers.js.map