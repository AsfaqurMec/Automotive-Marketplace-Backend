import mongoose from 'mongoose';

const DealerD2DMessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'DealerD2DChat', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  seen:{type:Boolean,default:false}
}, { timestamps: true });

export default mongoose.model('DealerD2DMessage', DealerD2DMessageSchema);