import express from 'express';
const { Router } = express;
const messageRoute = Router();
import DealerD2DMessage from '../models/DealerD2DMessageSchema.js';
import DealerCustomerMessage from '../models/DealerCustomerMessageSchema.js';
import DealerD2DChat from '../models/DealerD2DChatSchema.js';
import DealerCustomerChat from '../models/DealerCustomerChatSchema.js';
messageRoute.post('/', async (req, res) => {
    try {
        const { chatId, chatType, sender, senderId, senderRole, content, type = 'text' } = req.body;
        let message;
        if (chatType === 'd2d') {
            message = new DealerD2DMessage({ chatId, sender, content, type });
            await message.save();
            await DealerD2DChat.findByIdAndUpdate(chatId, { lastMessage: message._id });
        }
        else if (chatType === 'customer') {
            message = new DealerCustomerMessage({ chatId, senderRole, senderId, content, type });
            await message.save();
            await DealerCustomerChat.findByIdAndUpdate(chatId, { lastMessage: message._id });
        }
        else {
            return res.status(400).json({ message: 'Invalid chatType' });
        }
        res.status(201).json(message);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
messageRoute.get('/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const { chatType } = req.query;
        let messages;
        if (chatType === 'd2d') {
            messages = await DealerD2DMessage.find({ chatId }).populate('sender');
        }
        else if (chatType === 'customer') {
            messages = await DealerCustomerMessage.find({ chatId }).populate('senderId');
        }
        else {
            return res.status(400).json({ message: 'Invalid chatType' });
        }
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default messageRoute;
//# sourceMappingURL=messageRoute.js.map