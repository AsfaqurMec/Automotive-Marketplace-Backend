import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    date: NativeDate;
    contactType: "Email" | "Call" | "Meeting" | "Message";
    notes?: string | null | undefined;
    summary?: string | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    recordedBy?: mongoose.Types.ObjectId | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    contactType: "Email" | "Call" | "Meeting" | "Message";
    notes?: string | null | undefined;
    summary?: string | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    recordedBy?: mongoose.Types.ObjectId | null | undefined;
}> & {
    date: NativeDate;
    contactType: "Email" | "Call" | "Meeting" | "Message";
    notes?: string | null | undefined;
    summary?: string | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    recordedBy?: mongoose.Types.ObjectId | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: NativeDate;
    contactType: "Email" | "Call" | "Meeting" | "Message";
    notes?: string | null | undefined;
    summary?: string | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    recordedBy?: mongoose.Types.ObjectId | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date: NativeDate;
    contactType: "Email" | "Call" | "Meeting" | "Message";
    notes?: string | null | undefined;
    summary?: string | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    recordedBy?: mongoose.Types.ObjectId | null | undefined;
}>> & mongoose.FlatRecord<{
    date: NativeDate;
    contactType: "Email" | "Call" | "Meeting" | "Message";
    notes?: string | null | undefined;
    summary?: string | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    recordedBy?: mongoose.Types.ObjectId | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
