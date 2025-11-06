import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    dealer: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    price: number;
    condition: "New" | "Used" | "Refurbished";
    isAvailable: boolean;
    images: string[];
    partNumber: string;
    compatibleCars: string[];
    quantityInStock: number;
    category: "Other" | "Engine" | "Transmission" | "Brakes" | "Suspension" | "Electrical" | "Body" | "Interior";
    description?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    dealer: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    price: number;
    condition: "New" | "Used" | "Refurbished";
    isAvailable: boolean;
    images: string[];
    partNumber: string;
    compatibleCars: string[];
    quantityInStock: number;
    category: "Other" | "Engine" | "Transmission" | "Brakes" | "Suspension" | "Electrical" | "Body" | "Interior";
    description?: string | null | undefined;
}> & {
    name: string;
    dealer: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    price: number;
    condition: "New" | "Used" | "Refurbished";
    isAvailable: boolean;
    images: string[];
    partNumber: string;
    compatibleCars: string[];
    quantityInStock: number;
    category: "Other" | "Engine" | "Transmission" | "Brakes" | "Suspension" | "Electrical" | "Body" | "Interior";
    description?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    dealer: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    price: number;
    condition: "New" | "Used" | "Refurbished";
    isAvailable: boolean;
    images: string[];
    partNumber: string;
    compatibleCars: string[];
    quantityInStock: number;
    category: "Other" | "Engine" | "Transmission" | "Brakes" | "Suspension" | "Electrical" | "Body" | "Interior";
    description?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    dealer: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    price: number;
    condition: "New" | "Used" | "Refurbished";
    isAvailable: boolean;
    images: string[];
    partNumber: string;
    compatibleCars: string[];
    quantityInStock: number;
    category: "Other" | "Engine" | "Transmission" | "Brakes" | "Suspension" | "Electrical" | "Body" | "Interior";
    description?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    name: string;
    dealer: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    price: number;
    condition: "New" | "Used" | "Refurbished";
    isAvailable: boolean;
    images: string[];
    partNumber: string;
    compatibleCars: string[];
    quantityInStock: number;
    category: "Other" | "Engine" | "Transmission" | "Brakes" | "Suspension" | "Electrical" | "Body" | "Interior";
    description?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
