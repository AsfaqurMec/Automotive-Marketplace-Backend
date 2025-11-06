import mongoose from "mongoose";
declare const CarReview: mongoose.Model<{
    car: mongoose.Types.ObjectId;
    reviewer: mongoose.Types.ObjectId;
    reviewDate: NativeDate;
    ratings: {
        overall: number;
        performance?: number | null | undefined;
        comfort?: number | null | undefined;
        fuelEfficiency?: number | null | undefined;
        reliability?: number | null | undefined;
        valueForMoney?: number | null | undefined;
    };
    reviewText: string;
    pros: string[];
    cons: string[];
    photos: string[];
    videos: string[];
    recommendation: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    car: mongoose.Types.ObjectId;
    reviewer: mongoose.Types.ObjectId;
    reviewDate: NativeDate;
    ratings: {
        overall: number;
        performance?: number | null | undefined;
        comfort?: number | null | undefined;
        fuelEfficiency?: number | null | undefined;
        reliability?: number | null | undefined;
        valueForMoney?: number | null | undefined;
    };
    reviewText: string;
    pros: string[];
    cons: string[];
    photos: string[];
    videos: string[];
    recommendation: boolean;
}> & {
    car: mongoose.Types.ObjectId;
    reviewer: mongoose.Types.ObjectId;
    reviewDate: NativeDate;
    ratings: {
        overall: number;
        performance?: number | null | undefined;
        comfort?: number | null | undefined;
        fuelEfficiency?: number | null | undefined;
        reliability?: number | null | undefined;
        valueForMoney?: number | null | undefined;
    };
    reviewText: string;
    pros: string[];
    cons: string[];
    photos: string[];
    videos: string[];
    recommendation: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    car: mongoose.Types.ObjectId;
    reviewer: mongoose.Types.ObjectId;
    reviewDate: NativeDate;
    ratings: {
        overall: number;
        performance?: number | null | undefined;
        comfort?: number | null | undefined;
        fuelEfficiency?: number | null | undefined;
        reliability?: number | null | undefined;
        valueForMoney?: number | null | undefined;
    };
    reviewText: string;
    pros: string[];
    cons: string[];
    photos: string[];
    videos: string[];
    recommendation: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    car: mongoose.Types.ObjectId;
    reviewer: mongoose.Types.ObjectId;
    reviewDate: NativeDate;
    ratings: {
        overall: number;
        performance?: number | null | undefined;
        comfort?: number | null | undefined;
        fuelEfficiency?: number | null | undefined;
        reliability?: number | null | undefined;
        valueForMoney?: number | null | undefined;
    };
    reviewText: string;
    pros: string[];
    cons: string[];
    photos: string[];
    videos: string[];
    recommendation: boolean;
}>> & mongoose.FlatRecord<{
    car: mongoose.Types.ObjectId;
    reviewer: mongoose.Types.ObjectId;
    reviewDate: NativeDate;
    ratings: {
        overall: number;
        performance?: number | null | undefined;
        comfort?: number | null | undefined;
        fuelEfficiency?: number | null | undefined;
        reliability?: number | null | undefined;
        valueForMoney?: number | null | undefined;
    };
    reviewText: string;
    pros: string[];
    cons: string[];
    photos: string[];
    videos: string[];
    recommendation: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default CarReview;
