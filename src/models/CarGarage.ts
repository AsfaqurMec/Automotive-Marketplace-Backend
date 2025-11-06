import mongoose from "mongoose";

const carGarageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  city: {
    type: String,
     
   },
   country: {
    type: String,
     
   },
   phone: {
    type: String,
     
   },
  dealer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealer",
    required: true,
  },

  services: [
    {
      type: String,
      enum: [
        "General Service",
        "Oil Change",
        "Engine Repair",
        "Brake Repair",
        "Battery Replacement",
        "Tire Service",
        "AC Repair",
        "Electrical Work",
        "Diagnostics",
        "Other"
      ]
    }
  ],

  location: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    }
  },

  workingHours: {
    open: String,   
    close: String,  
  },

  images: [String], 

  rating: {
    type: Number,
    default: 0,
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  isApproved: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CarGarage", carGarageSchema);
