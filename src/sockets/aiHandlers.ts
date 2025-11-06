import { Server, Socket } from 'socket.io';
import mongoose from 'mongoose';
import DealerAIChat from '../models/DealerAIChat.js';
import DealerAIMessage from '../models/DealerAIMessage.js';
import getAIResponse from '../utils/aiService.js';
import { SocketData } from '../types/index.js';

export default function aiHandlers(io: Server, socket: Socket) {
  socket.on('send_ai_message', async ({ senderId, content, tempId }: SocketData) => {
    try {
      if (!senderId || !content) {
        return socket.emit('send_message_error', { message: 'Missing senderId or content.' });
      }
      if (!mongoose.Types.ObjectId.isValid(senderId)) {
        return socket.emit('send_message_error', { message: 'Invalid sender ID.' });
      }

      let aiChat = await DealerAIChat.findOne({ dealer: senderId });
      if (!aiChat) {
        aiChat = new DealerAIChat({ dealer: senderId });
        await aiChat.save();
      }

      const dealerMessage = new DealerAIMessage({ chatId: aiChat._id, sender: 'dealer', content });
      await dealerMessage.save();

      socket.emit('message_sent_confirmation', {
        ...dealerMessage.toObject(),
        chatId: aiChat._id.toString(),
        tempId
      });

      const history = await DealerAIMessage.find({ chatId: aiChat._id })
        .sort({ createdAt: -1 }).limit(10).sort({ createdAt: 1 });

      const aiContent = await getAIResponse(aiChat.assistantInstructions, history, content);

      const aiMessage = new DealerAIMessage({ chatId: aiChat._id, sender: 'ai', content: aiContent });
      await aiMessage.save();

      aiChat.lastMessage = aiMessage._id;
      await aiChat.save();

      io.to(senderId.toString()).emit('receive_message', {
        ...aiMessage.toObject(),
        chatId: aiChat._id.toString()
      });

    } catch {
      socket.emit('send_message_error', { message: 'An error occurred in the AI chat.' });
    }
  });
}
