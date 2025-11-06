import mongoose from "mongoose";
const interactionLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    contactType: {
        type: String,
        enum: ["Call", "Email", "Meeting", "Message"],
        required: true,
    },
    summary: String,
    notes: String,
    relatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "relatedModel",
    },
    relatedModel: {
        type: String,
        enum: ["Lead", "Customer"],
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});
export default mongoose.model("InteractionLog", interactionLogSchema);
//# sourceMappingURL=InteractionLog.js.map