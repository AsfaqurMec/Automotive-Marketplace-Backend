import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    relation: "Other" | "Customer" | "Lead" | "Personal";
    name?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    linkedTo?: mongoose.Types.ObjectId | null | undefined;
    linkedModel?: "Customer" | "Lead" | null | undefined;
    addedBy?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    relation: "Other" | "Customer" | "Lead" | "Personal";
    name?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    linkedTo?: mongoose.Types.ObjectId | null | undefined;
    linkedModel?: "Customer" | "Lead" | null | undefined;
    addedBy?: mongoose.Types.ObjectId | null | undefined;
}> & {
    createdAt: NativeDate;
    relation: "Other" | "Customer" | "Lead" | "Personal";
    name?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    linkedTo?: mongoose.Types.ObjectId | null | undefined;
    linkedModel?: "Customer" | "Lead" | null | undefined;
    addedBy?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    relation: "Other" | "Customer" | "Lead" | "Personal";
    name?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    linkedTo?: mongoose.Types.ObjectId | null | undefined;
    linkedModel?: "Customer" | "Lead" | null | undefined;
    addedBy?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    relation: "Other" | "Customer" | "Lead" | "Personal";
    name?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    linkedTo?: mongoose.Types.ObjectId | null | undefined;
    linkedModel?: "Customer" | "Lead" | null | undefined;
    addedBy?: mongoose.Types.ObjectId | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    relation: "Other" | "Customer" | "Lead" | "Personal";
    name?: string | null | undefined;
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    linkedTo?: mongoose.Types.ObjectId | null | undefined;
    linkedModel?: "Customer" | "Lead" | null | undefined;
    addedBy?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
