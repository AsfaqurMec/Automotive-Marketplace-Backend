import mongoose from "mongoose";
declare const DealerAIChat: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    dealer: mongoose.Types.ObjectId;
    assistantInstructions: string;
    lastMessage?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    dealer: mongoose.Types.ObjectId;
    assistantInstructions: string;
    lastMessage?: mongoose.Types.ObjectId | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    dealer: mongoose.Types.ObjectId;
    assistantInstructions: string;
    lastMessage?: mongoose.Types.ObjectId | null | undefined;
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
    dealer: mongoose.Types.ObjectId;
    assistantInstructions: string;
    lastMessage?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    dealer: mongoose.Types.ObjectId;
    assistantInstructions: string;
    lastMessage?: mongoose.Types.ObjectId | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    dealer: mongoose.Types.ObjectId;
    assistantInstructions: string;
    lastMessage?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default DealerAIChat;
