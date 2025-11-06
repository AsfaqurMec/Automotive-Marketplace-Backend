import mongoose from 'mongoose';
import DealerD2DChat from '../models/DealerD2DChatSchema.js';
import DealerCustomerChat from '../models/DealerCustomerChatSchema.js';
import DealerD2DMessage from '../models/DealerD2DMessageSchema.js';
import DealerCustomerMessage from '../models/DealerCustomerMessageSchema.js';
import DealerAIChat from '../models/DealerAIChat.js';
export default function chatHandlers(io, socket) {
    // When user joins
    socket.on('register_user', async ({ userId }) => {
        if (!userId)
            return Promise.reject(new Error('register_user error: No userId provided.'));
        socket.join(userId);
        try {
            // D2D Chats
            const d2dChats = await DealerD2DChat.find({ dealers: userId })
                .populate('dealers')
                .populate({ path: 'lastMessage', populate: { path: 'sender', select: 'name username' } });
            const d2dChatIds = d2dChats.map(chat => chat._id);
            // Aggregate unread counts for D2D chats
            const d2dUnreadCounts = await DealerD2DMessage.aggregate([
                {
                    $match: {
                        chatId: { $in: d2dChatIds },
                        seen: false,
                        sender: { $ne: userId }
                    }
                },
                {
                    $group: {
                        _id: "$chatId",
                        count: { $sum: 1 }
                    }
                }
            ]);
            const d2dUnreadMap = new Map(d2dUnreadCounts.map(item => [item._id.toString(), item.count]));
            const transformedD2DChats = d2dChats.map(chat => {
                const other = chat.dealers.find(d => d._id.toString() !== userId.toString());
                const unreadCount = d2dUnreadMap.get(chat._id.toString()) || 0;
                return {
                    ...chat.toObject(),
                    other,
                    lastMessageTime: chat.lastMessage ? chat.lastMessage.createdAt : chat.updatedAt,
                    unreadCount,
                    type: 'd2d',
                    dealers: undefined,
                    name: other ? other.name : 'Unknown Dealer',
                    profileImageUrl: other ? other.profileImageUrl : null,
                };
            });
            // D2C Chats
            const d2cChats = await DealerCustomerChat.find({
                $or: [{ dealer: userId }, { customer: userId }]
            })
                .populate('dealer')
                .populate('customer')
                .populate('lastMessage');
            const d2cChatIds = d2cChats.map(chat => chat._id);
            // Aggregate unread counts for D2C chats
            const d2cUnreadCounts = await DealerCustomerMessage.aggregate([
                {
                    $match: {
                        chatId: { $in: d2cChatIds },
                        seen: false,
                        sender: { $ne: userId }
                    }
                },
                {
                    $group: {
                        _id: "$chatId",
                        count: { $sum: 1 }
                    }
                }
            ]);
            const d2cUnreadMap = new Map(d2cUnreadCounts.map(item => [item._id.toString(), item.count]));
            const transformedD2CChats = d2cChats.map(chat => {
                const unreadCount = d2cUnreadMap.get(chat._id.toString()) || 0;
                const isMeDealer = chat.dealer._id.toString() === userId.toString();
                const other = isMeDealer ? chat.customer : chat.dealer;
                return {
                    ...chat.toObject(),
                    lastMessageTime: chat.lastMessage ? chat.lastMessage.createdAt : chat.updatedAt,
                    unreadCount,
                    type: 'd2c',
                    name: other ? other.name : 'Unknown Customer',
                    profileImageUrl: other ? other.profileImageUrl : null,
                };
            });
            // AI Chats
            const aiChats = await DealerAIChat.find({ dealer: userId }).populate('lastMessage');
            const transformedAIChats = aiChats.map(chat => ({
                ...chat.toObject(),
                lastMessageTime: chat.lastMessage ? chat.lastMessage.createdAt : chat.updatedAt,
                unreadCount: 0,
                type: 'ai',
                name: chat.assistant ? chat.assistant?.name : 'AI Assistant',
                profileImageUrl: null,
            }));
            // Merge & sort all chats by lastMessageTime descending
            const allChats = [...transformedD2DChats, ...transformedD2CChats, ...transformedAIChats];
            allChats.sort((a, b) => {
                const aTime = new Date(a.lastMessageTime || 0).getTime();
                const bTime = new Date(b.lastMessageTime || 0).getTime();
                return bTime - aTime;
            });
            socket.emit('all_chats', allChats);
        }
        catch {
            socket.emit('all_chats_error', { message: 'Failed to load your conversations.' });
        }
    });
    // Sending a normal chat message
    socket.on('send_message', async ({ chatId: initialChatId, content, chatType, senderRole, senderId, type: messageContentType, sendedId: recipientId, tempId }) => {
        try {
            if (!senderId || !content || !chatType || !senderRole) {
                return socket.emit('send_message_error', { message: 'Missing required fields.' });
            }
            if (!mongoose.Types.ObjectId.isValid(senderId)) {
                return socket.emit('send_message_error', { message: 'Invalid sender ID.' });
            }
            let chatDoc;
            const effectiveMessageType = messageContentType || 'text';
            // Find existing chat
            if (initialChatId && mongoose.Types.ObjectId.isValid(initialChatId)) {
                chatDoc = chatType === 'd2d'
                    ? await DealerD2DChat.findById(initialChatId)
                    : await DealerCustomerChat.findById(initialChatId);
            }
            // Create new chat if needed
            if (!chatDoc) {
                if (!recipientId || !mongoose.Types.ObjectId.isValid(recipientId)) {
                    return socket.emit('send_message_error', { message: 'Recipient ID invalid.' });
                }
                if (chatType === 'd2d') {
                    chatDoc = await DealerD2DChat.findOne({
                        dealers: { $all: [senderId, recipientId], $size: 2 }
                    }) || new DealerD2DChat({ dealers: [senderId, recipientId], lastMessage: null });
                    await chatDoc.save();
                }
                else if (chatType === 'd2c') {
                    const dealer = senderRole === 'dealer' ? senderId : recipientId;
                    const customer = senderRole === 'customer' ? senderId : recipientId;
                    chatDoc = await DealerCustomerChat.findOne({ dealer, customer }) ||
                        new DealerCustomerChat({ dealer, customer, lastMessage: null });
                    await chatDoc.save();
                }
            }
            // Save message
            let savedMessage;
            const populatePath = senderRole === 'dealer' ? 'Dealer' : 'Customer';
            if (chatType === 'd2d') {
                savedMessage = new DealerD2DMessage({ chatId: chatDoc._id, sender: senderId, content, type: effectiveMessageType });
                await savedMessage.save();
                savedMessage = await savedMessage.populate({ path: 'sender', select: 'name username _id profileImageUrl' });
            }
            else if (chatType === 'd2c') {
                savedMessage = new DealerCustomerMessage({
                    chatId: chatDoc._id,
                    sender: senderId,
                    senderRole,
                    content,
                    type: effectiveMessageType,
                    senderModel: populatePath
                });
                await savedMessage.save();
                savedMessage = await DealerCustomerMessage.findById(savedMessage._id).populate(populatePath);
            }
            chatDoc.lastMessage = savedMessage?._id;
            await chatDoc.save();
            const participants = chatType === 'd2d'
                ? chatDoc.dealers.map((id) => id.toString())
                : [chatDoc.dealer.toString(), chatDoc.customer.toString()];
            const messageToEmit = { ...savedMessage.toObject(), chatId: chatDoc._id.toString(), tempId };
            participants.forEach((p) => {
                io.to(p).emit('receive_message', messageToEmit);
                if (p === senderId.toString()) {
                    socket.emit('message_sent_confirmation', messageToEmit);
                }
            });
        }
        catch {
            socket.emit('send_message_error', { message: 'An error occurred while sending your message.' });
        }
    });
}
//# sourceMappingURL=chatHandlers.js.map