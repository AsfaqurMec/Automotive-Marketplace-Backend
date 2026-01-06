import mongoose from "mongoose";
import slugify from "slugify";

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: { type: String, unique: true, required:false },
  
  type: {
    type: String,
    enum: ["rent", "sell"],
    required: false,
    default:'sell'
  },
  status:{
    type: String,
    enum: ["Pending", "Sold","Available",'Discontinued'],
    required: false,
    default:'Available'
  },
  
  price: {
    type: Number,
    required: true,
  },
  priceNegotiable: {
    type: Boolean,
    default: false,
  },
  vinNumber: {
    type: String,
    default: null,
  },
  location: {
    country: { type: String, required: true },
    state: { type: String },
    city: { type: String, required: true },
    area: { type: String },
    addressLine: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },

  description: { type: String },

  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  mileage: { type: Number },
  fuelType: {
    type: String,
    // enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
  },
  transmission: {
    type: String,
    // enum: ["Manual", "Automatic"],
  },
  condition: {
    type: String,
    enum: ["New", "Used"],
    default:"New"
  },
  seats: { type: Number },
  color: { type: String },

  media: [mediaSchema],
  videoUrl: { type: String },

  documents: {
    registrationNumber: { type: String },
    registrationExpiry: { type: Date },
    insuranceExpiry: { type: Date },
    pollutionCertificateExpiry: { type: Date },
  },

  features: [{ type: String }],  

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealer",
    required: true,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  contactPhone: { type: String },
  contactEmail: { type: String },

  views: {
    type: Number,
    default: 0,
  },
 
  public:{type:Boolean,default:false}, 
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  });
carSchema.pre("save", async function (next) {
 

  if (!this.isModified("title") && this.slug) {
    return next();
  }

  const baseSlug = slugify.default(
    `${this.title}-${this.brand}-${this.model}-${this.year}`,
    { lower: true, strict: true }
  );

  let finalSlug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Car.findOne({ slug: finalSlug })) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = finalSlug;
  next();
});

export default mongoose.model("Car", carSchema);
