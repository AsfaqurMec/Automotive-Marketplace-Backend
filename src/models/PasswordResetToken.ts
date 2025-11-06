import mongoose from "mongoose";
const schema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
});

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('PasswordResetToken', schema);
