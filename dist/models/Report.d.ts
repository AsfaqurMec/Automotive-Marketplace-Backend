import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    data?: any;
    title?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
    filters?: any;
    reportType?: "Leads" | "Customers" | "Tasks" | "Interactions" | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    data?: any;
    title?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
    filters?: any;
    reportType?: "Leads" | "Customers" | "Tasks" | "Interactions" | null | undefined;
}> & {
    createdAt: NativeDate;
    data?: any;
    title?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
    filters?: any;
    reportType?: "Leads" | "Customers" | "Tasks" | "Interactions" | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    data?: any;
    title?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
    filters?: any;
    reportType?: "Leads" | "Customers" | "Tasks" | "Interactions" | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    data?: any;
    title?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
    filters?: any;
    reportType?: "Leads" | "Customers" | "Tasks" | "Interactions" | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    data?: any;
    title?: string | null | undefined;
    createdBy?: mongoose.Types.ObjectId | null | undefined;
    filters?: any;
    reportType?: "Leads" | "Customers" | "Tasks" | "Interactions" | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
