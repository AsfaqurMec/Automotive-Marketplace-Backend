import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    dealer: mongoose.Types.ObjectId;
    email: string;
    createdAt: NativeDate;
    rating: number;
    numberOfReviews: number;
    services: ("Other" | "General Service" | "Oil Change" | "Engine Repair" | "Brake Repair" | "Battery Replacement" | "Tire Service" | "AC Repair" | "Electrical Work" | "Diagnostics")[];
    images: string[];
    isApproved: boolean;
    description?: string | null | undefined;
    phone?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    location?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    workingHours?: {
        close?: string | null | undefined;
        open?: string | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    dealer: mongoose.Types.ObjectId;
    email: string;
    createdAt: NativeDate;
    rating: number;
    numberOfReviews: number;
    services: ("Other" | "General Service" | "Oil Change" | "Engine Repair" | "Brake Repair" | "Battery Replacement" | "Tire Service" | "AC Repair" | "Electrical Work" | "Diagnostics")[];
    images: string[];
    isApproved: boolean;
    description?: string | null | undefined;
    phone?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    location?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    workingHours?: {
        close?: string | null | undefined;
        open?: string | null | undefined;
    } | null | undefined;
}> & {
    name: string;
    dealer: mongoose.Types.ObjectId;
    email: string;
    createdAt: NativeDate;
    rating: number;
    numberOfReviews: number;
    services: ("Other" | "General Service" | "Oil Change" | "Engine Repair" | "Brake Repair" | "Battery Replacement" | "Tire Service" | "AC Repair" | "Electrical Work" | "Diagnostics")[];
    images: string[];
    isApproved: boolean;
    description?: string | null | undefined;
    phone?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    location?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    workingHours?: {
        close?: string | null | undefined;
        open?: string | null | undefined;
    } | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    dealer: mongoose.Types.ObjectId;
    email: string;
    createdAt: NativeDate;
    rating: number;
    numberOfReviews: number;
    services: ("Other" | "General Service" | "Oil Change" | "Engine Repair" | "Brake Repair" | "Battery Replacement" | "Tire Service" | "AC Repair" | "Electrical Work" | "Diagnostics")[];
    images: string[];
    isApproved: boolean;
    description?: string | null | undefined;
    phone?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    location?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    workingHours?: {
        close?: string | null | undefined;
        open?: string | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    dealer: mongoose.Types.ObjectId;
    email: string;
    createdAt: NativeDate;
    rating: number;
    numberOfReviews: number;
    services: ("Other" | "General Service" | "Oil Change" | "Engine Repair" | "Brake Repair" | "Battery Replacement" | "Tire Service" | "AC Repair" | "Electrical Work" | "Diagnostics")[];
    images: string[];
    isApproved: boolean;
    description?: string | null | undefined;
    phone?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    location?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    workingHours?: {
        close?: string | null | undefined;
        open?: string | null | undefined;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    name: string;
    dealer: mongoose.Types.ObjectId;
    email: string;
    createdAt: NativeDate;
    rating: number;
    numberOfReviews: number;
    services: ("Other" | "General Service" | "Oil Change" | "Engine Repair" | "Brake Repair" | "Battery Replacement" | "Tire Service" | "AC Repair" | "Electrical Work" | "Diagnostics")[];
    images: string[];
    isApproved: boolean;
    description?: string | null | undefined;
    phone?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    location?: {
        street?: string | null | undefined;
        city?: string | null | undefined;
        state?: string | null | undefined;
        zipCode?: string | null | undefined;
        country?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    workingHours?: {
        close?: string | null | undefined;
        open?: string | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
