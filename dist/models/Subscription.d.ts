import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "active" | "inactive" | "deprecated";
    price: number;
    startDate: NativeDate;
    endDate: NativeDate;
    planName: "Basic" | "Standard" | "Premium";
    features?: {
        carPostLimit: number;
        leadAccess: boolean;
        featuredListing: boolean;
        supportLevel: "Standard" | "Premium" | "Priority";
        ads?: {
            canCreate: boolean;
            canDelete: boolean;
            totalCreateLimit: number;
            createDurationDays: number;
        } | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "active" | "inactive" | "deprecated";
    price: number;
    startDate: NativeDate;
    endDate: NativeDate;
    planName: "Basic" | "Standard" | "Premium";
    features?: {
        carPostLimit: number;
        leadAccess: boolean;
        featuredListing: boolean;
        supportLevel: "Standard" | "Premium" | "Priority";
        ads?: {
            canCreate: boolean;
            canDelete: boolean;
            totalCreateLimit: number;
            createDurationDays: number;
        } | null | undefined;
    } | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "active" | "inactive" | "deprecated";
    price: number;
    startDate: NativeDate;
    endDate: NativeDate;
    planName: "Basic" | "Standard" | "Premium";
    features?: {
        carPostLimit: number;
        leadAccess: boolean;
        featuredListing: boolean;
        supportLevel: "Standard" | "Premium" | "Priority";
        ads?: {
            canCreate: boolean;
            canDelete: boolean;
            totalCreateLimit: number;
            createDurationDays: number;
        } | null | undefined;
    } | null | undefined;
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
    description: string;
    status: "active" | "inactive" | "deprecated";
    price: number;
    startDate: NativeDate;
    endDate: NativeDate;
    planName: "Basic" | "Standard" | "Premium";
    features?: {
        carPostLimit: number;
        leadAccess: boolean;
        featuredListing: boolean;
        supportLevel: "Standard" | "Premium" | "Priority";
        ads?: {
            canCreate: boolean;
            canDelete: boolean;
            totalCreateLimit: number;
            createDurationDays: number;
        } | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "active" | "inactive" | "deprecated";
    price: number;
    startDate: NativeDate;
    endDate: NativeDate;
    planName: "Basic" | "Standard" | "Premium";
    features?: {
        carPostLimit: number;
        leadAccess: boolean;
        featuredListing: boolean;
        supportLevel: "Standard" | "Premium" | "Priority";
        ads?: {
            canCreate: boolean;
            canDelete: boolean;
            totalCreateLimit: number;
            createDurationDays: number;
        } | null | undefined;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "active" | "inactive" | "deprecated";
    price: number;
    startDate: NativeDate;
    endDate: NativeDate;
    planName: "Basic" | "Standard" | "Premium";
    features?: {
        carPostLimit: number;
        leadAccess: boolean;
        featuredListing: boolean;
        supportLevel: "Standard" | "Premium" | "Priority";
        ads?: {
            canCreate: boolean;
            canDelete: boolean;
            totalCreateLimit: number;
            createDurationDays: number;
        } | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
