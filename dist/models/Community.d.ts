import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    text: string;
    createdAt: NativeDate;
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    views: number;
    privacy: "Private" | "Public";
    region: "Region" | "Global";
    likes: mongoose.Types.DocumentArray<{
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }>;
    comments: mongoose.Types.DocumentArray<{
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }> & {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }>;
    car?: mongoose.Types.ObjectId | null | undefined;
    dealerId?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    text: string;
    createdAt: NativeDate;
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    views: number;
    privacy: "Private" | "Public";
    region: "Region" | "Global";
    likes: mongoose.Types.DocumentArray<{
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }>;
    comments: mongoose.Types.DocumentArray<{
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }> & {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }>;
    car?: mongoose.Types.ObjectId | null | undefined;
    dealerId?: mongoose.Types.ObjectId | null | undefined;
}> & {
    text: string;
    createdAt: NativeDate;
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    views: number;
    privacy: "Private" | "Public";
    region: "Region" | "Global";
    likes: mongoose.Types.DocumentArray<{
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }>;
    comments: mongoose.Types.DocumentArray<{
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }> & {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }>;
    car?: mongoose.Types.ObjectId | null | undefined;
    dealerId?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    text: string;
    createdAt: NativeDate;
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    views: number;
    privacy: "Private" | "Public";
    region: "Region" | "Global";
    likes: mongoose.Types.DocumentArray<{
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }>;
    comments: mongoose.Types.DocumentArray<{
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }> & {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }>;
    car?: mongoose.Types.ObjectId | null | undefined;
    dealerId?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    text: string;
    createdAt: NativeDate;
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    views: number;
    privacy: "Private" | "Public";
    region: "Region" | "Global";
    likes: mongoose.Types.DocumentArray<{
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }>;
    comments: mongoose.Types.DocumentArray<{
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }> & {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }>;
    car?: mongoose.Types.ObjectId | null | undefined;
    dealerId?: mongoose.Types.ObjectId | null | undefined;
}>> & mongoose.FlatRecord<{
    text: string;
    createdAt: NativeDate;
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    views: number;
    privacy: "Private" | "Public";
    region: "Region" | "Global";
    likes: mongoose.Types.DocumentArray<{
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }> & {
        likedByUser?: mongoose.Types.ObjectId | null | undefined;
    }>;
    comments: mongoose.Types.DocumentArray<{
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }> & {
        text: string;
        commenterId: mongoose.Types.ObjectId;
        commentedAt: NativeDate;
    }>;
    car?: mongoose.Types.ObjectId | null | undefined;
    dealerId?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
