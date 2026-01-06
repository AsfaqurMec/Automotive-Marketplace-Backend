import mongoose from "mongoose";

const carSellSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: false, // Optional but recommended for reporting
  },
  amount: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealer",
    required: true,
  },
  dealerID: {
    type: String,
    default: "", // Empty string for external buyers, dealer ID for internal buyers
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: false, // We're manually setting createdAt
});

export default mongoose.model("CarSell", carSellSchema);

