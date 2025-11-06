import mongoose from "mongoose";
declare const DealerAIMessage: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: "dealer" | "ai";
    chatId: mongoose.Types.ObjectId;
    content: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: "dealer" | "ai";
    chatId: mongoose.Types.ObjectId;
    content: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: "dealer" | "ai";
    chatId: mongoose.Types.ObjectId;
    content: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: "dealer" | "ai";
    chatId: mongoose.Types.ObjectId;
    content: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: "dealer" | "ai";
    chatId: mongoose.Types.ObjectId;
    content: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: "dealer" | "ai";
    chatId: mongoose.Types.ObjectId;
    content: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default DealerAIMessage;
