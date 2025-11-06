import mongoose from 'mongoose';
const DealerCustomerMessageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'DealerCustomerChat', required: true },
    senderRole: { type: String, enum: ['dealer', 'customer'], required: true },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel'
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['Dealer', 'Customer']
    },
    content: { type: String, required: true },
    type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
}, { timestamps: true });
export default mongoose.model('DealerCustomerMessage', DealerCustomerMessageSchema);
//# sourceMappingURL=DealerCustomerMessageSchema.js.map