import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
    title: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    filters: Object, // store query filters like { status: "New" }
    reportType: {
        type: String,
        enum: ["Leads", "Customers", "Tasks", "Interactions"],
    },
    data: mongoose.Schema.Types.Mixed, // store raw or summary data
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Report", reportSchema);
//# sourceMappingURL=Report.js.map