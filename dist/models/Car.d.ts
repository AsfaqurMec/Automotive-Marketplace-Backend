import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    model: string;
    createdAt: NativeDate;
    year: number;
    title: string;
    price: number;
    priceNegotiable: boolean;
    vinNumber: string;
    brand: string;
    condition: "New" | "Used";
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    features: string[];
    postedBy: mongoose.Types.ObjectId;
    isAvailable: boolean;
    views: number;
    public: boolean;
    type?: "rent" | "sell" | null | undefined;
    description?: string | null | undefined;
    status?: "Pending" | "Sold" | "Available" | null | undefined;
    slug?: string | null | undefined;
    location?: {
        city: string;
        country: string;
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    mileage?: number | null | undefined;
    fuelType?: string | null | undefined;
    transmission?: string | null | undefined;
    seats?: number | null | undefined;
    color?: string | null | undefined;
    videoUrl?: string | null | undefined;
    documents?: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: NativeDate | null | undefined;
        insuranceExpiry?: NativeDate | null | undefined;
        pollutionCertificateExpiry?: NativeDate | null | undefined;
    } | null | undefined;
    contactPhone?: string | null | undefined;
    contactEmail?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    model: string;
    createdAt: NativeDate;
    year: number;
    title: string;
    price: number;
    priceNegotiable: boolean;
    vinNumber: string;
    brand: string;
    condition: "New" | "Used";
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    features: string[];
    postedBy: mongoose.Types.ObjectId;
    isAvailable: boolean;
    views: number;
    public: boolean;
    type?: "rent" | "sell" | null | undefined;
    description?: string | null | undefined;
    status?: "Pending" | "Sold" | "Available" | null | undefined;
    slug?: string | null | undefined;
    location?: {
        city: string;
        country: string;
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    mileage?: number | null | undefined;
    fuelType?: string | null | undefined;
    transmission?: string | null | undefined;
    seats?: number | null | undefined;
    color?: string | null | undefined;
    videoUrl?: string | null | undefined;
    documents?: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: NativeDate | null | undefined;
        insuranceExpiry?: NativeDate | null | undefined;
        pollutionCertificateExpiry?: NativeDate | null | undefined;
    } | null | undefined;
    contactPhone?: string | null | undefined;
    contactEmail?: string | null | undefined;
}> & {
    model: string;
    createdAt: NativeDate;
    year: number;
    title: string;
    price: number;
    priceNegotiable: boolean;
    vinNumber: string;
    brand: string;
    condition: "New" | "Used";
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    features: string[];
    postedBy: mongoose.Types.ObjectId;
    isAvailable: boolean;
    views: number;
    public: boolean;
    type?: "rent" | "sell" | null | undefined;
    description?: string | null | undefined;
    status?: "Pending" | "Sold" | "Available" | null | undefined;
    slug?: string | null | undefined;
    location?: {
        city: string;
        country: string;
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    mileage?: number | null | undefined;
    fuelType?: string | null | undefined;
    transmission?: string | null | undefined;
    seats?: number | null | undefined;
    color?: string | null | undefined;
    videoUrl?: string | null | undefined;
    documents?: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: NativeDate | null | undefined;
        insuranceExpiry?: NativeDate | null | undefined;
        pollutionCertificateExpiry?: NativeDate | null | undefined;
    } | null | undefined;
    contactPhone?: string | null | undefined;
    contactEmail?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    model: string;
    createdAt: NativeDate;
    year: number;
    title: string;
    price: number;
    priceNegotiable: boolean;
    vinNumber: string;
    brand: string;
    condition: "New" | "Used";
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    features: string[];
    postedBy: mongoose.Types.ObjectId;
    isAvailable: boolean;
    views: number;
    public: boolean;
    type?: "rent" | "sell" | null | undefined;
    description?: string | null | undefined;
    status?: "Pending" | "Sold" | "Available" | null | undefined;
    slug?: string | null | undefined;
    location?: {
        city: string;
        country: string;
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    mileage?: number | null | undefined;
    fuelType?: string | null | undefined;
    transmission?: string | null | undefined;
    seats?: number | null | undefined;
    color?: string | null | undefined;
    videoUrl?: string | null | undefined;
    documents?: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: NativeDate | null | undefined;
        insuranceExpiry?: NativeDate | null | undefined;
        pollutionCertificateExpiry?: NativeDate | null | undefined;
    } | null | undefined;
    contactPhone?: string | null | undefined;
    contactEmail?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    model: string;
    createdAt: NativeDate;
    year: number;
    title: string;
    price: number;
    priceNegotiable: boolean;
    vinNumber: string;
    brand: string;
    condition: "New" | "Used";
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    features: string[];
    postedBy: mongoose.Types.ObjectId;
    isAvailable: boolean;
    views: number;
    public: boolean;
    type?: "rent" | "sell" | null | undefined;
    description?: string | null | undefined;
    status?: "Pending" | "Sold" | "Available" | null | undefined;
    slug?: string | null | undefined;
    location?: {
        city: string;
        country: string;
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    mileage?: number | null | undefined;
    fuelType?: string | null | undefined;
    transmission?: string | null | undefined;
    seats?: number | null | undefined;
    color?: string | null | undefined;
    videoUrl?: string | null | undefined;
    documents?: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: NativeDate | null | undefined;
        insuranceExpiry?: NativeDate | null | undefined;
        pollutionCertificateExpiry?: NativeDate | null | undefined;
    } | null | undefined;
    contactPhone?: string | null | undefined;
    contactEmail?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    model: string;
    createdAt: NativeDate;
    year: number;
    title: string;
    price: number;
    priceNegotiable: boolean;
    vinNumber: string;
    brand: string;
    condition: "New" | "Used";
    media: mongoose.Types.DocumentArray<{
        type: "image" | "video";
        url: string;
    }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
        type: "image" | "video";
        url: string;
    }> & {
        type: "image" | "video";
        url: string;
    }>;
    features: string[];
    postedBy: mongoose.Types.ObjectId;
    isAvailable: boolean;
    views: number;
    public: boolean;
    type?: "rent" | "sell" | null | undefined;
    description?: string | null | undefined;
    status?: "Pending" | "Sold" | "Available" | null | undefined;
    slug?: string | null | undefined;
    location?: {
        city: string;
        country: string;
        state?: string | null | undefined;
        area?: string | null | undefined;
        addressLine?: string | null | undefined;
        coordinates?: {
            lng?: number | null | undefined;
            lat?: number | null | undefined;
        } | null | undefined;
    } | null | undefined;
    mileage?: number | null | undefined;
    fuelType?: string | null | undefined;
    transmission?: string | null | undefined;
    seats?: number | null | undefined;
    color?: string | null | undefined;
    videoUrl?: string | null | undefined;
    documents?: {
        registrationNumber?: string | null | undefined;
        registrationExpiry?: NativeDate | null | undefined;
        insuranceExpiry?: NativeDate | null | undefined;
        pollutionCertificateExpiry?: NativeDate | null | undefined;
    } | null | undefined;
    contactPhone?: string | null | undefined;
    contactEmail?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
