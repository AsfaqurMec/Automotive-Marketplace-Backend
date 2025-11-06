import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    email: string;
    token: string;
    used: boolean;
    expiresAt: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    token: string;
    used: boolean;
    expiresAt: NativeDate;
}> & {
    email: string;
    token: string;
    used: boolean;
    expiresAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    token: string;
    used: boolean;
    expiresAt: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    token: string;
    used: boolean;
    expiresAt: NativeDate;
}>> & mongoose.FlatRecord<{
    email: string;
    token: string;
    used: boolean;
    expiresAt: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
