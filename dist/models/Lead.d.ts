import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    email: string;
    createdAt: NativeDate;
    phone: string;
    fullName: string;
    status: "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "In Progress" | "Closed";
    googleCalendarSyncStatus: "Pending" | "Failed" | "Synced";
    sharedWith: mongoose.Types.ObjectId[];
    emailLogs: mongoose.Types.DocumentArray<{
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }> & {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }>;
    source?: string | null | undefined;
    interestedIn?: string | null | undefined;
    budget?: string | null | undefined;
    reminder?: NativeDate | null | undefined;
    task?: string | null | undefined;
    googleCalendarEventId?: string | null | undefined;
    googleCalendarEventLink?: string | null | undefined;
    googleCalendarAccountEmail?: string | null | undefined;
    trackingInfo?: string | null | undefined;
    createdBy?: string | null | undefined;
    assignedTo?: string | null | undefined;
    notes?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    createdAt: NativeDate;
    phone: string;
    fullName: string;
    status: "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "In Progress" | "Closed";
    googleCalendarSyncStatus: "Pending" | "Failed" | "Synced";
    sharedWith: mongoose.Types.ObjectId[];
    emailLogs: mongoose.Types.DocumentArray<{
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }> & {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }>;
    source?: string | null | undefined;
    interestedIn?: string | null | undefined;
    budget?: string | null | undefined;
    reminder?: NativeDate | null | undefined;
    task?: string | null | undefined;
    googleCalendarEventId?: string | null | undefined;
    googleCalendarEventLink?: string | null | undefined;
    googleCalendarAccountEmail?: string | null | undefined;
    trackingInfo?: string | null | undefined;
    createdBy?: string | null | undefined;
    assignedTo?: string | null | undefined;
    notes?: string | null | undefined;
}> & {
    email: string;
    createdAt: NativeDate;
    phone: string;
    fullName: string;
    status: "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "In Progress" | "Closed";
    googleCalendarSyncStatus: "Pending" | "Failed" | "Synced";
    sharedWith: mongoose.Types.ObjectId[];
    emailLogs: mongoose.Types.DocumentArray<{
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }> & {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }>;
    source?: string | null | undefined;
    interestedIn?: string | null | undefined;
    budget?: string | null | undefined;
    reminder?: NativeDate | null | undefined;
    task?: string | null | undefined;
    googleCalendarEventId?: string | null | undefined;
    googleCalendarEventLink?: string | null | undefined;
    googleCalendarAccountEmail?: string | null | undefined;
    trackingInfo?: string | null | undefined;
    createdBy?: string | null | undefined;
    assignedTo?: string | null | undefined;
    notes?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    createdAt: NativeDate;
    phone: string;
    fullName: string;
    status: "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "In Progress" | "Closed";
    googleCalendarSyncStatus: "Pending" | "Failed" | "Synced";
    sharedWith: mongoose.Types.ObjectId[];
    emailLogs: mongoose.Types.DocumentArray<{
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }> & {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }>;
    source?: string | null | undefined;
    interestedIn?: string | null | undefined;
    budget?: string | null | undefined;
    reminder?: NativeDate | null | undefined;
    task?: string | null | undefined;
    googleCalendarEventId?: string | null | undefined;
    googleCalendarEventLink?: string | null | undefined;
    googleCalendarAccountEmail?: string | null | undefined;
    trackingInfo?: string | null | undefined;
    createdBy?: string | null | undefined;
    assignedTo?: string | null | undefined;
    notes?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    createdAt: NativeDate;
    phone: string;
    fullName: string;
    status: "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "In Progress" | "Closed";
    googleCalendarSyncStatus: "Pending" | "Failed" | "Synced";
    sharedWith: mongoose.Types.ObjectId[];
    emailLogs: mongoose.Types.DocumentArray<{
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }> & {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }>;
    source?: string | null | undefined;
    interestedIn?: string | null | undefined;
    budget?: string | null | undefined;
    reminder?: NativeDate | null | undefined;
    task?: string | null | undefined;
    googleCalendarEventId?: string | null | undefined;
    googleCalendarEventLink?: string | null | undefined;
    googleCalendarAccountEmail?: string | null | undefined;
    trackingInfo?: string | null | undefined;
    createdBy?: string | null | undefined;
    assignedTo?: string | null | undefined;
    notes?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    email: string;
    createdAt: NativeDate;
    phone: string;
    fullName: string;
    status: "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "In Progress" | "Closed";
    googleCalendarSyncStatus: "Pending" | "Failed" | "Synced";
    sharedWith: mongoose.Types.ObjectId[];
    emailLogs: mongoose.Types.DocumentArray<{
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }> & {
        status: "Sent" | "Failed";
        sentAt: NativeDate;
        subject?: string | null | undefined;
        response?: string | null | undefined;
        sentBy?: mongoose.Types.ObjectId | null | undefined;
        content?: string | null | undefined;
    }>;
    source?: string | null | undefined;
    interestedIn?: string | null | undefined;
    budget?: string | null | undefined;
    reminder?: NativeDate | null | undefined;
    task?: string | null | undefined;
    googleCalendarEventId?: string | null | undefined;
    googleCalendarEventLink?: string | null | undefined;
    googleCalendarAccountEmail?: string | null | undefined;
    trackingInfo?: string | null | undefined;
    createdBy?: string | null | undefined;
    assignedTo?: string | null | undefined;
    notes?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
