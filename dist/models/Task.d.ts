import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    priority: "Low" | "Medium" | "High";
    description?: string | null | undefined;
    title?: string | null | undefined;
    assignedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    dueDate?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    priority: "Low" | "Medium" | "High";
    description?: string | null | undefined;
    title?: string | null | undefined;
    assignedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    dueDate?: NativeDate | null | undefined;
}> & {
    createdAt: NativeDate;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    priority: "Low" | "Medium" | "High";
    description?: string | null | undefined;
    title?: string | null | undefined;
    assignedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    dueDate?: NativeDate | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    priority: "Low" | "Medium" | "High";
    description?: string | null | undefined;
    title?: string | null | undefined;
    assignedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    dueDate?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    priority: "Low" | "Medium" | "High";
    description?: string | null | undefined;
    title?: string | null | undefined;
    assignedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    dueDate?: NativeDate | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
    priority: "Low" | "Medium" | "High";
    description?: string | null | undefined;
    title?: string | null | undefined;
    assignedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedTo?: mongoose.Types.ObjectId | null | undefined;
    relatedModel?: "Customer" | "Lead" | null | undefined;
    dueDate?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
