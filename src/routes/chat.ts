import DealerD2DChat from '../models/DealerD2DChatSchema.js';
import DealerCustomerChat from '../models/DealerCustomerChatSchema.js'
import express from 'express';
import DealerD2DMessage from '../models/DealerD2DMessageSchema.js';
import DealerCustomerMessage from '../models/DealerCustomerMessageSchema.js';
const { Router, } = express;
import Dealer from '../models/Dealer.js';
import Customer from '../models/Customer.js';
import DealerAIChat from '../models/DealerAIChat.js';
import DealerAIMessage from '../models/DealerAIMessage.js';
const chatRoute=Router()


chatRoute.get('/search',  async (req, res) => {
  try {
    const { term, currentUserId } = req.query;

    if (!term || (term as string).trim() === '') {
      return res.status(400).json({ message: 'Search term is required.' });
    }

    
    const searchRegex = new RegExp((term as string).trim(), 'i');

    // --- Search Dealers ---
    // Fields to search in for Dealer model
    const dealerSearchFields = [
      { fullName: searchRegex },
      { email: searchRegex },
      { companyName: searchRegex },
      { phone: searchRegex },
 
    ];
    if (Dealer.schema.paths.username) { // Check if username field exists in schema
        dealerSearchFields.push({ username: searchRegex } as unknown as typeof dealerSearchFields[0]);
    }


    const dealerQuery = {
      $or: dealerSearchFields,
    };
    
     if (currentUserId) {
       (dealerQuery as Record<string, unknown>)._id = { $ne: currentUserId };
    }

    const dealers = await Dealer.find(dealerQuery)
      .select('fullName email companyName logo _id username phone') 
      .limit(10); 

    
    const customerSearchFields = [
      { fullName: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
      // Add other relevant string fields from Customer schema if needed
    ];
    if (Customer.schema.paths.username) { // Check if username field exists in schema
        customerSearchFields.push({ username: searchRegex } as unknown as typeof customerSearchFields[0]);
    }


    const customerQuery = {
      $or: customerSearchFields,
    };
    // Optionally exclude the current user if they are a customer
     if (currentUserId) {
      (customerQuery as Record<string, unknown>)._id = { $ne: currentUserId };
    }
    const customers = await Customer.find(customerQuery)
      .select('fullName email profileImage _id username phone') // Select relevant fields from Customer schema
      .limit(10); // Limit results for performance

    // --- Format and Combine Results ---
    const formattedDealers = dealers.map(dealer => ({
      _id: dealer._id,
      name: dealer.fullName, // Use fullName as the common 'name' field
      email: dealer.email,
      username: (dealer as { username?: string }).username,
      companyName: dealer.companyName,
      phone: dealer.phone,
      profileImageUrl: dealer.profileImage, // Use logo as profileImageUrl for dealers
      userType: 'dealer',
      // active: dealer.isVerified && !dealer.isBlocked, // Example active status
    }));

    const formattedCustomers = customers.map(customer => ({
      _id: customer._id,
      name: customer.fullName, // Use fullName as the common 'name' field
      email: customer.email,
      username: (customer as { username?: string }).username,
      phone: customer.phone,
      profileImageUrl: customer.profileImage, // Use profileImage for customers
      userType: 'customer',
      // active: !customer.isBlocked, // Example active status
    }));

    let combinedUsers = [...formattedDealers, ...formattedCustomers];

    // Optional: Filter out the current user from the combined list if their ID was passed
    if (currentUserId) {
      combinedUsers = combinedUsers.filter(user => user._id.toString() !== currentUserId.toString());
    }
    
    // Sort by name
    combinedUsers.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    // Limit total results after combining
    const finalResults = combinedUsers.slice(0, 15); // Example: cap at 15 total results
  
    res.json({ users: finalResults });

  } catch {
    
    res.status(500).json({ message: 'Server error while searching users.' });
  }
});
chatRoute.post('/createChat',async (req, res) => {
  try {
    const { dealers } = req.body;
    if (!dealers || dealers.length !== 2) {
      return res.status(400).json({ message: 'Two dealers are required' });
    }

 
    let chat = await DealerD2DChat.findOne({ dealers: { $all: dealers } });

    if (!chat) {
      chat = new DealerD2DChat({ dealers });
      await chat.save();
    }

    res.status(201).json(chat);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
})

// Create chat room endpoint
chatRoute.post('/create', async (req, res) => {
  try {
    const { participants, type, createdBy } = req.body;
   // console.log(participants, type, createdBy);

    // Validate required parameters
    if (!participants || !Array.isArray(participants) || participants.length !== 2) {
      return res.status(400).json({ 
        message: 'participants array with exactly 2 user IDs is required' 
      });
    }

    if (!type || !createdBy) {
      return res.status(400).json({ 
        message: 'type and createdBy are required' 
      });
    }

    // Validate chat type
    const validChatTypes = ['d2d', 'd2c', 'ai'];
    if (!validChatTypes.includes(type)) {
      return res.status(400).json({ 
        message: 'Invalid type. Must be one of: d2d, d2c, ai' 
      });
    }

    const [currentUserId, targetUserId] = participants;
    let chatRoom = null;

    if (type === 'd2d') {
      // Dealer to Dealer chat
      const dealers = [currentUserId, targetUserId];
      
      // Check if chat already exists
      chatRoom = await DealerD2DChat.findOne({ 
        dealers: { $all: dealers } 
      }).populate('dealers', 'fullName email companyName logo profileImage _id');

      if (!chatRoom) {
        // Create new D2D chat
        chatRoom = new DealerD2DChat({ dealers });
        await chatRoom.save();
        
        // Populate the created chat
        chatRoom = await DealerD2DChat.findById(chatRoom._id)
          .populate('dealers', 'fullName email companyName logo profileImage _id');
      }

    } else if (type === 'd2c') {
      // Dealer to Customer chat
      let dealerId = null;
      let customerId = null;

      // Determine which user is dealer and which is customer
      const currentUserAsDealer = await Dealer.findById(currentUserId);
      const targetUserAsCustomer = await Customer.findById(targetUserId);

      if (currentUserAsDealer && targetUserAsCustomer) {
        dealerId = currentUserId;
        customerId = targetUserId;
      } else {
        const currentUserAsCustomer = await Customer.findById(currentUserId);
        const targetUserAsDealer = await Dealer.findById(targetUserId);

        if (currentUserAsCustomer && targetUserAsDealer) {
          dealerId = targetUserId;
          customerId = currentUserId;
        } else {
          return res.status(400).json({ 
            message: 'One user must be a dealer and the other must be a customer' 
          });
        }
      }

      // Check if chat already exists
      chatRoom = await DealerCustomerChat.findOne({ 
        dealer: dealerId, 
        customer: customerId 
      })
      .populate('dealer', 'fullName email companyName logo profileImage _id')
      .populate('customer', 'fullName email profileImage _id');

      if (!chatRoom) {
        // Create new D2C chat
        chatRoom = new DealerCustomerChat({ 
          dealer: dealerId, 
          customer: customerId 
        });
        await chatRoom.save();
        
        // Populate the created chat
        chatRoom = await DealerCustomerChat.findById(chatRoom._id)
          .populate('dealer', 'fullName email companyName logo profileImage _id')
          .populate('customer', 'fullName email profileImage _id');
      }

    } else if (type === 'ai') {
      // AI chat - only for dealers
      const dealer = await Dealer.findById(currentUserId);
      if (!dealer) {
        return res.status(400).json({ 
          message: 'AI chat is only available for dealers' 
        });
      }

      // Check if AI chat already exists for this dealer
      chatRoom = await DealerAIChat.findOne({ dealer: currentUserId })
        .populate('dealer', 'fullName email companyName logo profileImage _id');

      if (!chatRoom) {
        // Create new AI chat
        chatRoom = new DealerAIChat({
          dealer: currentUserId,
          assistantInstructions: 'You are a helpful assistant for a car dealer. Your goal is to provide quick, accurate, and professional information.'
        });
        await chatRoom.save();
        
        // Populate the created chat
        chatRoom = await DealerAIChat.findById(chatRoom._id)
          .populate('dealer', 'fullName email companyName logo profileImage _id');
      }
    }

    if (!chatRoom) {
      return res.status(500).json({ 
        message: 'Failed to create chat room' 
      });
    }

    // Return the chat room with proper structure
    res.status(201).json({
      success: true,
      data: {
        _id: chatRoom._id,
        type: type,
        ...(type === 'd2d' && {
          dealers: (chatRoom as any).dealers
        }),
        ...(type === 'd2c' && {
          dealer: (chatRoom as any).dealer,
          customer: (chatRoom as any).customer
        }),
        ...(type === 'ai' && {
          dealer: (chatRoom as any).dealer
        }),
        createdAt: chatRoom.createdAt,
        updatedAt: chatRoom.updatedAt
      }
    });

  } catch (error: unknown) {
    console.error('Error in create chat:', error);
    res.status(500).json({ 
      message: (error as Error).message || 'Internal server error' 
    });
  }
})

// Create or get chat room endpoint
chatRoute.post('/create-or-get', async (req, res) => {
  try {
    const { currentUserId, targetUserId, chatType } = req.body;

    // Validate required parameters
    if (!currentUserId || !targetUserId || !chatType) {
      return res.status(400).json({ 
        message: 'currentUserId, targetUserId, and chatType are required' 
      });
    }

    // Validate chatType
    const validChatTypes = ['d2d', 'd2c', 'ai'];
    if (!validChatTypes.includes(chatType)) {
      return res.status(400).json({ 
        message: 'Invalid chatType. Must be one of: d2d, d2c, ai' 
      });
    }

    let chatRoom = null;

    if (chatType === 'd2d') {
      // Dealer to Dealer chat
      const dealers = [currentUserId, targetUserId];
      
      // Check if chat already exists
      chatRoom = await DealerD2DChat.findOne({ 
        dealers: { $all: dealers } 
      }).populate('dealers', 'fullName email companyName logo profileImage _id');

      if (!chatRoom) {
        // Create new D2D chat
        chatRoom = new DealerD2DChat({ dealers });
        await chatRoom.save();
        
        // Populate the created chat
        chatRoom = await DealerD2DChat.findById(chatRoom._id)
          .populate('dealers', 'fullName email companyName logo profileImage _id');
      }

    } else if (chatType === 'd2c') {
      // Dealer to Customer chat
      let dealerId = null;
      let customerId = null;

      // Determine which user is dealer and which is customer
      const currentUserAsDealer = await Dealer.findById(currentUserId);
      const targetUserAsCustomer = await Customer.findById(targetUserId);

      if (currentUserAsDealer && targetUserAsCustomer) {
        dealerId = currentUserId;
        customerId = targetUserId;
      } else {
        const currentUserAsCustomer = await Customer.findById(currentUserId);
        const targetUserAsDealer = await Dealer.findById(targetUserId);

        if (currentUserAsCustomer && targetUserAsDealer) {
          dealerId = targetUserId;
          customerId = currentUserId;
        } else {
          return res.status(400).json({ 
            message: 'One user must be a dealer and the other must be a customer' 
          });
        }
      }

      // Check if chat already exists
      chatRoom = await DealerCustomerChat.findOne({ 
        dealer: dealerId, 
        customer: customerId 
      })
      .populate('dealer', 'fullName email companyName logo profileImage _id')
      .populate('customer', 'fullName email profileImage _id');

      if (!chatRoom) {
        // Create new D2C chat
        chatRoom = new DealerCustomerChat({ 
          dealer: dealerId, 
          customer: customerId 
        });
        await chatRoom.save();
        
        // Populate the created chat
        chatRoom = await DealerCustomerChat.findById(chatRoom._id)
          .populate('dealer', 'fullName email companyName logo profileImage _id')
          .populate('customer', 'fullName email profileImage _id');
      }

    } else if (chatType === 'ai') {
      // AI chat - only for dealers
      const dealer = await Dealer.findById(currentUserId);
      if (!dealer) {
        return res.status(400).json({ 
          message: 'AI chat is only available for dealers' 
        });
      }

      // Check if AI chat already exists for this dealer
      chatRoom = await DealerAIChat.findOne({ dealer: currentUserId })
        .populate('dealer', 'fullName email companyName logo profileImage _id');

      if (!chatRoom) {
        // Create new AI chat
        chatRoom = new DealerAIChat({
          dealer: currentUserId,
          assistantInstructions: 'You are a helpful assistant for a car dealer. Your goal is to provide quick, accurate, and professional information.'
        });
        await chatRoom.save();
        
        // Populate the created chat
        chatRoom = await DealerAIChat.findById(chatRoom._id)
          .populate('dealer', 'fullName email companyName logo profileImage _id');
      }
    }

    if (!chatRoom) {
      return res.status(500).json({ 
        message: 'Failed to create or retrieve chat room' 
      });
    }

    // Return the chat room with proper structure
    res.status(200).json({
      success: true,
      data: {
        _id: chatRoom._id,
        type: chatType,
        ...(chatType === 'd2d' && {
          dealers: (chatRoom as any).dealers
        }),
        ...(chatType === 'd2c' && {
          dealer: (chatRoom as any).dealer,
          customer: (chatRoom as any).customer
        }),
        ...(chatType === 'ai' && {
          dealer: (chatRoom as any).dealer
        }),
        createdAt: chatRoom.createdAt,
        updatedAt: chatRoom.updatedAt
      }
    });

  } catch (error: unknown) {
   // console.error('Error in create-or-get chat:', error);
    res.status(500).json({ 
      message: (error as Error).message || 'Internal server error' 
    });
  }
}) 

chatRoute.get('/list', async (req, res) => {
  
  
  try {
    const { userId, roleId } = req.query;
    // console.log(userId, roleId);
    
    if (!userId || !roleId) {
      return res.status(400).json({ message: 'userId and role are required' });
    }

    let d2dChats: unknown[] = [];
    let customerChats: unknown[] = [];

    if (roleId) {
      d2dChats = await DealerD2DChat.find({ dealers: userId })
        .populate('dealers')
        .populate({
          path: 'lastMessage',
          populate: { path: 'sender' }
        });

      customerChats = await DealerCustomerChat.find({ dealer: userId })
        .populate('dealer')
        .populate('customer')
        .populate({
          path: 'lastMessage',
          populate: { path: 'senderId' }
        });
    }

    // if (role === 'customer') {
    //   customerChats = await DealerCustomerChat.find({ customer: userId })
    //     .populate('dealer')
    //     .populate('customer')
    //     .populate({
    //       path: 'lastMessage',
    //       populate: { path: 'senderId' }
    //     });
    // }
    // console.log(d2dChats, customerChats);
    res.json({ d2dChats, customerChats });
  } catch (error: unknown) {
    // console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
});
chatRoute.get('/single', async (req, res) => {
  try {
    const { chatId: initialChatId, type, userId } = req.query;  

    if (!initialChatId || !type || !userId) {
      return res.status(400).json({ message: 'chatId (target user ID or existing chat ID), type, and userId are required' });
    }

    let chat = null;
    let messages: unknown[] = [];
    let lastMessage = null;
    let lastMessageTime = null;
    let unreadCount = 0;
    let participantDetailsForNewChat = null;  

    if (type === 'd2d') {
      // Try to find an existing chat document
      chat = await DealerD2DChat.findById(initialChatId)
        .populate('dealers') 
        .populate('lastMessage'); 

      if (chat) {
        messages = await DealerD2DMessage.find({ chatId: chat._id }).sort({ createdAt: 1 }).populate('sender');
        if (chat.lastMessage) {
          lastMessage = chat.lastMessage;
          lastMessageTime = (chat.lastMessage as { createdAt?: Date }).createdAt;
        }
        unreadCount = await DealerD2DMessage.countDocuments({
          chatId: chat._id,
          seen: false,
          sender: { $ne: userId }
        });
      } else {
        // Chat document not found, assume initialChatId is the otherDealerId
        // and userId is the current dealer.
        const currentUser = await Dealer.findById(userId)
        const otherUser = await Dealer.findById(initialChatId)

        if (currentUser && otherUser) {
        
          participantDetailsForNewChat = {
            _id: null,  
            dealers: [currentUser, otherUser],  
            isNewChatContext: true,  
            type: 'd2d',
            };
        } else {
          return res.status(404).json({ message: 'One or both dealer profiles not found for initiating d2d chat.' });
        }
      }
    } else if (type === 'd2c') {
     
      chat = await DealerCustomerChat.findById(initialChatId)
        .populate({ path: 'dealer', select: 'name profileImageUrl username _id' })
        .populate({ path: 'customer', select: 'name profileImageUrl username _id' })  
        .populate({ path: 'lastMessage', populate: { path: 'senderId' } })
       
      if (chat) {
        messages = await DealerCustomerMessage.find({ chatId: chat._id }).sort({ createdAt: 1 })
        .populate('sender'); 
        if (chat.lastMessage) {
          lastMessage = chat.lastMessage;
          lastMessageTime = (chat.lastMessage as { createdAt?: Date }).createdAt;
        }
        unreadCount = await DealerCustomerMessage.countDocuments({
          chatId: chat._id,
          seen: false,
          senderId: { $ne: userId }  
        });
      } else {
  
        let identifiedDealer = null;
        let identifiedCustomer = null;

    
        const potentialDealerUser = await Dealer.findById(userId)
        const potentialCustomerOther = await Customer.findById(initialChatId)
        if (potentialDealerUser && potentialCustomerOther) {
          identifiedDealer = potentialDealerUser;
          identifiedCustomer = potentialCustomerOther;
        } else {
        
          const potentialCustomerUser = await Customer.findById(userId)
          const potentialDealerOther = await Dealer.findById(initialChatId)

          if (potentialCustomerUser && potentialDealerOther) {
            identifiedCustomer = potentialCustomerUser;
            identifiedDealer = potentialDealerOther;
          }
        }

        if (identifiedDealer && identifiedCustomer) {
          participantDetailsForNewChat = {
            _id: null, // No persisted chat ID yet
            dealer: identifiedDealer,
            customer: identifiedCustomer,
            isNewChatContext: true, // Flag for frontend
            type: 'customer',
          };
        } else {
          return res.status(404).json({ message: 'Required dealer or customer profile not found for initiating chat.' });
        }
      }
    }else if (type === 'ai') {
    
      chat = await DealerAIChat.findById(initialChatId)
          .populate('dealer')
 
      if (chat) {
        
          messages = await DealerAIMessage.find({ chatId: chat._id }).sort({ createdAt: 1 });
      } else {
          
          const dealer = await Dealer.findById(userId);
 
          if (dealer ) {
      
              participantDetailsForNewChat = {
                  _id: null, 
                  dealer: dealer,
                  isNewChatContext: true,  
                  type: 'ai',
              };
          } else {
              return res.status(404).json({ message: 'Dealer or Assistant profile not found for initiating AI chat.' });
          }
      }
    }
     else {
      return res.status(400).json({ message: 'Invalid chat type specified' });
    }

    // If a chat document was found, 'chat' will be populated.
    // If not, but participants were found for a new chat, 'participantDetailsForNewChat' will be used.
    res.json({
      chat: chat || participantDetailsForNewChat, // Send existing chat or new participant info
      messages,  
      lastMessage, // Null if new chat context
      lastMessageTime, // Null if new chat context
      unreadCount // 0 if new chat context
    });

  } catch (error: unknown) {
  
    res.status(500).json({ message: (error as Error).message || "Internal server error" });
  }
});

// Add new route for creating dummy AI chat
chatRoute.post('/create-dummy-ai-chat', async (req, res) => {
  try {
    const { dealerId } = req.body;
    
    if (!dealerId) {
      return res.status(400).json({ message: 'Dealer ID is required' });
    }

    // Check if dealer exists
    const dealer = await Dealer.findById(dealerId);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }

    // Create new AI chat
    const aiChat = new DealerAIChat({
      dealer: dealerId,
      assistantInstructions: 'You are a helpful assistant for a car dealer. Your goal is to provide quick, accurate, and professional information.'
    });

    await aiChat.save();

    // Create initial AI message
    const aiMessage = new DealerAIMessage({
      chatId: aiChat._id,
      sender: 'ai',
      content: 'Hello! I am your AI assistant. How can I help you today?'
    });

    await aiMessage.save();

    // Update chat with last message
    aiChat.lastMessage = aiMessage._id;
    await aiChat.save();

    // Return the created chat with its message
    const populatedChat = await DealerAIChat.findById(aiChat._id)
      .populate('lastMessage');

    res.status(201).json(populatedChat);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Add route for updating AI chat with new messages
chatRoute.post('/update-ai-chat', async (req, res) => {
  try {
    const { chatId, content, sender } = req.body;
    
    if (!chatId || !content || !sender) {
      return res.status(400).json({ message: 'Chat ID, content, and sender are required' });
    }

    // Check if chat exists
    const chat = await DealerAIChat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Create new message
    const newMessage = new DealerAIMessage({
      chatId,
      sender,
      content
    });

    await newMessage.save();

    // Update chat with last message
    chat.lastMessage = newMessage._id;
    await chat.save();

    // Return the updated chat with its new message
    const updatedChat = await DealerAIChat.findById(chatId)
      .populate('lastMessage');

    res.status(200).json(updatedChat);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Delete chat route
chatRoute.delete('/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const { type, userId } = req.query;

    // Validate required parameters
    if (!chatId || !type || !userId) {
      return res.status(400).json({ 
        message: 'chatId, type, and userId are required' 
      });
    }

    // Validate chat type
    const validChatTypes = ['d2d', 'd2c', 'ai'];
    if (!validChatTypes.includes(type as string)) {
      return res.status(400).json({ 
        message: 'Invalid type. Must be one of: d2d, d2c, ai' 
      });
    }

    let chat = null;
    let isAuthorized = false;

    if (type === 'd2d') {
      // Dealer to Dealer chat
      chat = await DealerD2DChat.findById(chatId);
      
      if (chat) {
        // Check if the user is one of the dealers in this chat
        isAuthorized = (chat as any).dealers.includes(userId);
        
        if (isAuthorized) {
          // Delete all related messages
          await DealerD2DMessage.deleteMany({ chatId: chatId });
          // Delete the chat
          await DealerD2DChat.findByIdAndDelete(chatId);
        }
      }

    } else if (type === 'd2c') {
      // Dealer to Customer chat
      chat = await DealerCustomerChat.findById(chatId);
      
      if (chat) {
        // Check if the user is either the dealer or customer in this chat
        isAuthorized = (chat as any).dealer.toString() === userId || 
                      (chat as any).customer.toString() === userId;
        
        if (isAuthorized) {
          // Delete all related messages
          await DealerCustomerMessage.deleteMany({ chatId: chatId });
          // Delete the chat
          await DealerCustomerChat.findByIdAndDelete(chatId);
        }
      }

    } else if (type === 'ai') {
      // AI chat
      chat = await DealerAIChat.findById(chatId);
      
      if (chat) {
        // Check if the user is the dealer who owns this AI chat
        isAuthorized = (chat as any).dealer.toString() === userId;
        
        if (isAuthorized) {
          // Delete all related messages
          await DealerAIMessage.deleteMany({ chatId: chatId });
          // Delete the chat
          await DealerAIChat.findByIdAndDelete(chatId);
        }
      }
    }

    if (!chat) {
      return res.status(404).json({ 
        message: 'Chat not found' 
      });
    }

    if (!isAuthorized) {
      return res.status(403).json({ 
        message: 'You are not authorized to delete this chat' 
      });
    }

    // Return success response
    res.status(200).json({ 
      success: true,
      message: 'Chat deleted successfully' 
    });

  } catch (error: unknown) {
   // console.error('Error in delete chat:', error);
    res.status(500).json({ 
      message: (error as Error).message || 'Internal server error' 
    });
  }
});

export default chatRoute;