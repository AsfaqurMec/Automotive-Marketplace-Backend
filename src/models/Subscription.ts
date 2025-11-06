import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    unique: true,
    enum: ["Basic", "Standard", "Premium"],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  features: {
    carPostLimit: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    leadAccess: {
      type: Boolean,
      default: false,
    },
    featuredListing: {
      type: Boolean,
      default: false,
    },
    supportLevel: {
      type: String,
      enum: ["Standard", "Priority", "Premium"],
      default: "Standard",
    },
    ads: {
      canCreate: { type: Boolean, default: false },
      canDelete: { type: Boolean, default: false },
      totalCreateLimit: { type: Number, default: 0, min: 0 },
      createDurationDays: { type: Number, default: 0, min: 0 },
    },
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deprecated"],
    default: "active",
  }
}, {
  timestamps: true,
});

export default mongoose.model("Subscriptionpackages", subscriptionSchema);
