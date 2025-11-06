import mongoose from "mongoose";
const sparePartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    partNumber: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    compatibleCars: [String],
    price: {
        type: Number,
        required: true,
    },
    quantityInStock: {
        type: Number,
        default: 0,
    },
    condition: {
        type: String,
        enum: ["New", "Used", "Refurbished"],
        default: "New",
    },
    images: [String],
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dealer",
        required: true,
    },
    category: {
        type: String,
        enum: ["Engine", "Transmission", "Brakes", "Suspension", "Electrical", "Body", "Interior", "Other"],
        default: "Other",
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("SparePart", sparePartSchema);
//# sourceMappingURL=SparePart.js.map