import mongoose from 'mongoose';

const DealerCustomerChatSchema = new mongoose.Schema({
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'DealerCustomerMessage' },
}, { timestamps: true });

export default mongoose.model('DealerCustomerChat', DealerCustomerChatSchema);