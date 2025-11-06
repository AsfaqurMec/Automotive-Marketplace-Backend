import mongoose from "mongoose";

const RatingsSchema = new mongoose.Schema({
    overall: { type: Number, required: true, min: 1, max: 5 },
    performance: { type: Number, min: 1, max: 5 },
    comfort: { type: Number, min: 1, max: 5 },
    fuelEfficiency: { type: Number, min: 1, max: 5 },
    reliability: { type: Number, min: 1, max: 5 },
    valueForMoney: { type: Number, min: 1, max: 5 }
  });
  
  const CarReviewSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    reviewer: { type:mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    reviewDate: { type: Date, default: Date.now },
    ratings: { type: RatingsSchema, required: true },
    reviewText: { type: String, required: true },
    pros: [{ type: String }],
    cons: [{ type: String }],
    photos: [{ type: String }],  
    videos: [{ type: String }],   
    recommendation: { type: Boolean, default: false }
  });
  
const CarReview= mongoose.model('CarReview', CarReviewSchema);
export default CarReview;