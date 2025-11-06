import mongoose from "mongoose";

const dealerAIMessageSchema = new mongoose.Schema({
    chatId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DealerAIChat', 
        required: true 
    },
    sender: {
        type: String,
        enum: ['dealer', 'ai'],
        required: true
    },
    content: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const DealerAIMessage = mongoose.model('DealerAIMessage', dealerAIMessageSchema);
export default DealerAIMessage;