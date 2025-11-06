import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    seen: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    seen: boolean;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    seen: boolean;
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
    seen: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    seen: boolean;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "image" | "file";
    sender: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
    content: string;
    seen: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
