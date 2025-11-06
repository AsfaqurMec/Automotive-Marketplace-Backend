import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    email: string;
    createdAt: NativeDate;
    fullName: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    isBlocked: boolean;
    isEmailVerified: boolean;
    dateOfBirth?: NativeDate | null | undefined;
    phone?: string | null | undefined;
    profileImage?: string | null | undefined;
    licenseNumber?: string | null | undefined;
    licenseExpiry?: NativeDate | null | undefined;
    lastLogin?: NativeDate | null | undefined;
    gender?: "Male" | "Female" | "Other" | null | undefined;
    role?: mongoose.Types.ObjectId | null | undefined;
    address?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    idVerification?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    createdAt: NativeDate;
    fullName: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    isBlocked: boolean;
    isEmailVerified: boolean;
    dateOfBirth?: NativeDate | null | undefined;
    phone?: string | null | undefined;
    profileImage?: string | null | undefined;
    licenseNumber?: string | null | undefined;
    licenseExpiry?: NativeDate | null | undefined;
    lastLogin?: NativeDate | null | undefined;
    gender?: "Male" | "Female" | "Other" | null | undefined;
    role?: mongoose.Types.ObjectId | null | undefined;
    address?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    idVerification?: string | null | undefined;
}> & {
    email: string;
    createdAt: NativeDate;
    fullName: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    isBlocked: boolean;
    isEmailVerified: boolean;
    dateOfBirth?: NativeDate | null | undefined;
    phone?: string | null | undefined;
    profileImage?: string | null | undefined;
    licenseNumber?: string | null | undefined;
    licenseExpiry?: NativeDate | null | undefined;
    lastLogin?: NativeDate | null | undefined;
    gender?: "Male" | "Female" | "Other" | null | undefined;
    role?: mongoose.Types.ObjectId | null | undefined;
    address?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    idVerification?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    createdAt: NativeDate;
    fullName: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    isBlocked: boolean;
    isEmailVerified: boolean;
    dateOfBirth?: NativeDate | null | undefined;
    phone?: string | null | undefined;
    profileImage?: string | null | undefined;
    licenseNumber?: string | null | undefined;
    licenseExpiry?: NativeDate | null | undefined;
    lastLogin?: NativeDate | null | undefined;
    gender?: "Male" | "Female" | "Other" | null | undefined;
    role?: mongoose.Types.ObjectId | null | undefined;
    address?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    idVerification?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    createdAt: NativeDate;
    fullName: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    isBlocked: boolean;
    isEmailVerified: boolean;
    dateOfBirth?: NativeDate | null | undefined;
    phone?: string | null | undefined;
    profileImage?: string | null | undefined;
    licenseNumber?: string | null | undefined;
    licenseExpiry?: NativeDate | null | undefined;
    lastLogin?: NativeDate | null | undefined;
    gender?: "Male" | "Female" | "Other" | null | undefined;
    role?: mongoose.Types.ObjectId | null | undefined;
    address?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    idVerification?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    email: string;
    createdAt: NativeDate;
    fullName: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    isBlocked: boolean;
    isEmailVerified: boolean;
    dateOfBirth?: NativeDate | null | undefined;
    phone?: string | null | undefined;
    profileImage?: string | null | undefined;
    licenseNumber?: string | null | undefined;
    licenseExpiry?: NativeDate | null | undefined;
    lastLogin?: NativeDate | null | undefined;
    gender?: "Male" | "Female" | "Other" | null | undefined;
    role?: mongoose.Types.ObjectId | null | undefined;
    address?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
    } | null | undefined;
    idVerification?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
