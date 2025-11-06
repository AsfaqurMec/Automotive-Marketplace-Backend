import mongoose from "mongoose";
import AccessRole from "./AccessRole.js";  

const dealerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false,
  },
  fullName: {
    type: String,
    required: true,
  },
  contactPerson: String,
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
  logo: String,

  profileImage: {
    type: String,
    default: '', 
  },

  businessLicenseNumber: String,
  licenseDocument: String,
  licenseExpiry: Date,

  carsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  }],

  rating: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },

  lastLogin: Date,

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessRole',
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  googleAdsCustomerId: {
      type: String,
      trim: true,
       unique: true, 
      sparse: true, 
      default: () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  },
  subscriptionId:{type:mongoose.Schema.Types.ObjectId,required:false,ref:'Subscriptionpackages'},
  renewDate: {
    type: Date,
    required:false
  },
  googleAdsAccountCurrencyCode: { // Good to store this if creating accounts
      type: String,
      trim: true,
      default: 'USD', // Default currency
  },
  googleAdsAccountTimeZone: { // Good to store this
      type: String,
      trim: true,
      default: 'America/New_York', // Default timezone
  }
});
 
dealerSchema.pre("save", async function (next) {
  if (!this.role) {
    try {
      let dealerRole = await AccessRole.findOne({ roleId: "dealer" });

      if (!dealerRole) {
        dealerRole = await AccessRole.create({
          roleId: "dealer",
           description: "Can post cars, manage their listings, and view some leads.",
           permissions: {
            car: {
              view: true,
              create: true,
              edit: true,
              delete: true,
            },
            leads: {
              view: true,
              assign: false,
              remind: false,
              email: true,
              create: true,
              delete: true,
              edit: true,
            },
            ads: {
              view: true,
              create: true,
              edit: true,
              delete: true,
            },
            users: {
              manage: false,
            },
            spares: {
              view: true,
              create: true,
              edit: true,
              delete: true,
            },
            subscription: {
              view: true,
              manage: true,
            },
            settings: {
              update: false,
            },
            adminPanel: {
              access: true,
              viewUser: false,
              deleteUser: false,
              viewDealer: true,
              deleteDealer: false,
              viewStatistics: false,
            },
            sidebar: {
              dashboard: true,
              inventory: true,
              crm: true,
              community: true,
              customers: false,
              dealer: false,
              importcustomers: true,
              matching: true,
              subscriptionmanage:true,
              ads:true,
              hotproducts:true,
              planbilling:true

            },
          },
        });
        
      }

      this.role = dealerRole?._id;
    } catch (err: unknown) {
      return next(err as Error);
    }
  }

  next();
});

export default mongoose.model("Dealer", dealerSchema);