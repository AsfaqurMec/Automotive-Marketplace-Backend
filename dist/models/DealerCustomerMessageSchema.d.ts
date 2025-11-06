import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    senderRole: "dealer" | "customer";
    senderModel: "Customer" | "Dealer";
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    senderRole: "dealer" | "customer";
    senderModel: "Customer" | "Dealer";
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    senderRole: "dealer" | "customer";
    senderModel: "Customer" | "Dealer";
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
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    senderRole: "dealer" | "customer";
    senderModel: "Customer" | "Dealer";
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    senderRole: "dealer" | "customer";
    senderModel: "Customer" | "Dealer";
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    senderRole: "dealer" | "customer";
    senderModel: "Customer" | "Dealer";
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
