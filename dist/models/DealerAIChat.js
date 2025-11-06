import mongoose from "mongoose";
const dealerAIChatSchema = new mongoose.Schema({
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer',
        required: true,
        unique: true
    },
    assistantInstructions: {
        type: String,
        required: true,
        default: 'You are a helpful assistant for a car dealer. Your goal is to provide quick, accurate, and professional information. Help with drafting customer responses, generating vehicle descriptions, and answering automotive industry questions.'
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealerAIMessage'
    }
}, { timestamps: true });
const DealerAIChat = mongoose.model('DealerAIChat', dealerAIChatSchema);
export default DealerAIChat;
//# sourceMappingURL=DealerAIChat.js.map