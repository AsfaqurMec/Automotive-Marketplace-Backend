import mongoose from 'mongoose';

const DealerD2DChatSchema = new mongoose.Schema({
  dealers: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer', required: true }
  ],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'DealerD2DMessage' },
}, { timestamps: true });

export default mongoose.model('DealerD2DChat', DealerD2DChatSchema);
