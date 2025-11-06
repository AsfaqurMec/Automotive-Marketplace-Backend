import mongoose from "mongoose";
import AccessRole from "./AccessRole.js";  

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessRole',
    required: false,
  },
  dateOfBirth: Date,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  password: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  profileImage: String,
  idVerification: {
    type: String,
  },
  licenseNumber: String,
  licenseExpiry: Date,
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  }],
  isBlocked: {
    type: Boolean,
    default: false,
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  }
});

customerSchema.pre("save", async function (next) {
  if (!this.role) {
    try {
      let buyerRole = await AccessRole.findOne({ roleId: "buyer" });

      if (!buyerRole) {
        buyerRole = await AccessRole.create({
          roleId: "buyer",
          description: "Can browse cars and send inquiries.",
          permissions: {
            car: { view: true, create: false, edit: false, delete: false },
            leads: { view: false, assign: false },
            users: { manage: false },
            spares: { view: true, create: false, edit: false, delete: false },
            subscription: { view: false, manage: false },
            settings: { update: false },
            adminPanel: { access: false}
          }
        });
      }

      this.role = buyerRole?._id;
    } catch (err: unknown) {
      return next(err as Error);  
    }
  }

  next();  
});

export default mongoose.model("Customer", customerSchema);
