import mongoose from "mongoose";
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
const commentSchema = new mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dealer",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    commentedAt: {
        type: Date,
        default: Date.now,
    },
});
const communityPostSchema = new mongoose.Schema({
    text: {
        type: String,
        default: '',
    },
    privacy: {
        type: String,
        enum: ['Private', 'Public'],
        required: true,
    },
    region: {
        type: String,
        enum: ['Region', 'Global'],
        required: true,
    },
    media: [mediaSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    dealerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dealer"
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: [{
            likedByUser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Dealer",
            }
        }],
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
    },
    comments: [commentSchema],
});
export default mongoose.model('CommunityPost', communityPostSchema);
//# sourceMappingURL=Community.js.map