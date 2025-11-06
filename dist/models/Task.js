import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed", "Cancelled"],
        default: "Pending",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    relatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "relatedModel",
    },
    relatedModel: {
        type: String,
        enum: ["Lead", "Customer"],
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Task", taskSchema);
//# sourceMappingURL=Task.js.map