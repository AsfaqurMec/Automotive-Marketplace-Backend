import mongoose from "mongoose";
// Sub-schema for headline/description objects (primarily for Search Ads)
const TextObjectSchema = new mongoose.Schema({
    text: { type: String, required: true, trim: true }
}, { _id: false });
// Sub-schema for Ad Creatives (can hold data for Search or Display ads)
const AdCreativeSchemaDefinition = {
    // Common field (standardized name for final URL)
    finalUrl: { type: String, trim: true }, // Populated from searchAdA.finalUrl or displayAdA.url
    // Search Ad specific fields
    headlines: { type: [TextObjectSchema], default: undefined }, // Array of {text: String}
    descriptions: { type: [TextObjectSchema], default: undefined }, // Array of {text: String}
    path1: { type: String, trim: true, default: undefined },
    path2: { type: String, trim: true, default: undefined },
    // Display Ad specific fields
    headline: { type: String, trim: true, default: undefined }, // Main headline for display ad
    descriptionText: { type: String, trim: true, default: undefined }, // Main description for display ad
    imageUrl: { type: String, trim: true, default: undefined }, // GCS URL for display ad image
};
const AdCreativeSchema = new mongoose.Schema(AdCreativeSchemaDefinition, { _id: false });
const CampaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    // Renamed from 'description' in newCampaignData to campaignLevelDescription to avoid confusion
    // Assuming 'description' in schema refers to this top-level campaign description.
    description: {
        type: String,
        trim: true,
    },
    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dealer", // Assuming you have a Dealer model
        required: true,
    },
    campaignObjective: {
        type: String,
        trim: true,
        // required: true, // Add if it's always required
    },
    networks: {
        type: [String], // e.g.,
        // enum:['Search Network', 'Display Network'],
        required: true, // Add if it's always required
    },
    adType: {
        type: String,
        enum: ["Search", "Display"],
        // required: true, // Add if it's always required
    },
    dailyBudget: {
        type: Number,
        required: true,
        min: 0,
    },
    biddingStrategy: {
        type: String,
        trim: true,
        // required: true, // Add if it's always required
    },
    targetLocations: {
        type: String,
        trim: true,
        // required: true, // Add if it's always required
    },
    isABTesting: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["draft", "active", "paused", "completed", "failed", "pending_approval", "disapproved", "Paused"], // Added "Paused" to match backend data, though 'paused' (lowercase) is more standard
        default: "draft",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        // required: true, // Make required if always present
    },
    totalBudget: {
        type: Number,
        min: 0,
        // required: true, // Add if it's always required
    },
    googleAdsCampaignId: {
        type: String,
        trim: true,
        default: null,
    },
    googleAdsAdGroupId: {
        type: String,
        trim: true,
        default: null,
    },
    googleAdsAccountId: {
        type: String,
        trim: true,
        default: null,
    },
    syncedWithGoogle: {
        type: Boolean,
        default: false,
    },
    primaryAdCreative: AdCreativeSchema,
    abTestAdCreative: {
        type: AdCreativeSchema,
        default: null,
    },
    payment: {
        status: {
            type: String,
            enum: ["pending", "succeeded", "failed"],
            default: "pending",
        },
        transactionId: String,
        amountPaid: Number,
        paidAt: Date,
    },
}, { timestamps: true });
CampaignSchema.set('toJSON', { virtuals: true });
CampaignSchema.set('toObject', { virtuals: true });
const Campaign = mongoose.model("Campaign", CampaignSchema);
export default Campaign;
//# sourceMappingURL=Campaign.js.map