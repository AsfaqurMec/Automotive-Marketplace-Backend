import mongoose from "mongoose";

const phonebookSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  relation: {
    type: String,
    enum: ["Lead", "Customer", "Personal", "Other"],
    default: "Other",
  },
  linkedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "linkedModel",
  },
  linkedModel: {
    type: String,
    enum: ["Lead", "Customer"],
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Phonebook", phonebookSchema);