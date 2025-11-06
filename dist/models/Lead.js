import mongoose from "mongoose";
const emailLogSchema = new mongoose.Schema({
    sentAt: { type: Date, default: Date.now },
    subject: { type: String },
    status: { type: String, enum: ["Sent", "Failed"], default: "Sent" },
    response: { type: String },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dealer",
    },
    content: { type: String },
}, { _id: false });
const leadSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    source: { type: String },
    status: {
        type: String,
        enum: ["New", "Contacted", "Qualified", "Lost", "Converted", "In Progress", "Closed"],
        default: "New",
    },
    interestedIn: { type: String },
    budget: { type: String },
    reminder: { type: Date },
    task: { type: String },
    googleCalendarEventId: { type: String },
    googleCalendarEventLink: { type: String },
    googleCalendarSyncStatus: {
        type: String,
        enum: ["Pending", "Synced", "Failed"],
        default: "Pending",
    },
    googleCalendarAccountEmail: { type: String },
    trackingInfo: { type: String },
    createdBy: { type: String },
    // assignedTo: [ {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Dealer",
    //   },
    // ],
    assignedTo: { type: String },
    notes: { type: String },
    sharedWith: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dealer",
        },
    ],
    emailLogs: [emailLogSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Lead", leadSchema);
//# sourceMappingURL=Lead.js.map