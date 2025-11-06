import mongoose from "mongoose";
declare const Campaign: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "draft" | "active" | "paused" | "completed" | "failed" | "pending_approval" | "disapproved" | "Paused";
    title: string;
    dealerId: mongoose.Types.ObjectId;
    networks: string[];
    dailyBudget: number;
    isABTesting: boolean;
    startDate: NativeDate;
    googleAdsCampaignId: string;
    googleAdsAdGroupId: string;
    googleAdsAccountId: string;
    syncedWithGoogle: boolean;
    abTestAdCreative: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    };
    description?: string | null | undefined;
    primaryAdCreative?: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    } | null | undefined;
    campaignObjective?: string | null | undefined;
    adType?: "Search" | "Display" | null | undefined;
    biddingStrategy?: string | null | undefined;
    targetLocations?: string | null | undefined;
    endDate?: NativeDate | null | undefined;
    totalBudget?: number | null | undefined;
    payment?: {
        status: "pending" | "failed" | "succeeded";
        transactionId?: string | null | undefined;
        amountPaid?: number | null | undefined;
        paidAt?: NativeDate | null | undefined;
    } | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "draft" | "active" | "paused" | "completed" | "failed" | "pending_approval" | "disapproved" | "Paused";
    title: string;
    dealerId: mongoose.Types.ObjectId;
    networks: string[];
    dailyBudget: number;
    isABTesting: boolean;
    startDate: NativeDate;
    googleAdsCampaignId: string;
    googleAdsAdGroupId: string;
    googleAdsAccountId: string;
    syncedWithGoogle: boolean;
    abTestAdCreative: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    };
    description?: string | null | undefined;
    primaryAdCreative?: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    } | null | undefined;
    campaignObjective?: string | null | undefined;
    adType?: "Search" | "Display" | null | undefined;
    biddingStrategy?: string | null | undefined;
    targetLocations?: string | null | undefined;
    endDate?: NativeDate | null | undefined;
    totalBudget?: number | null | undefined;
    payment?: {
        status: "pending" | "failed" | "succeeded";
        transactionId?: string | null | undefined;
        amountPaid?: number | null | undefined;
        paidAt?: NativeDate | null | undefined;
    } | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "draft" | "active" | "paused" | "completed" | "failed" | "pending_approval" | "disapproved" | "Paused";
    title: string;
    dealerId: mongoose.Types.ObjectId;
    networks: string[];
    dailyBudget: number;
    isABTesting: boolean;
    startDate: NativeDate;
    googleAdsCampaignId: string;
    googleAdsAdGroupId: string;
    googleAdsAccountId: string;
    syncedWithGoogle: boolean;
    abTestAdCreative: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    };
    description?: string | null | undefined;
    primaryAdCreative?: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    } | null | undefined;
    campaignObjective?: string | null | undefined;
    adType?: "Search" | "Display" | null | undefined;
    biddingStrategy?: string | null | undefined;
    targetLocations?: string | null | undefined;
    endDate?: NativeDate | null | undefined;
    totalBudget?: number | null | undefined;
    payment?: {
        status: "pending" | "failed" | "succeeded";
        transactionId?: string | null | undefined;
        amountPaid?: number | null | undefined;
        paidAt?: NativeDate | null | undefined;
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
    status: "draft" | "active" | "paused" | "completed" | "failed" | "pending_approval" | "disapproved" | "Paused";
    title: string;
    dealerId: mongoose.Types.ObjectId;
    networks: string[];
    dailyBudget: number;
    isABTesting: boolean;
    startDate: NativeDate;
    googleAdsCampaignId: string;
    googleAdsAdGroupId: string;
    googleAdsAccountId: string;
    syncedWithGoogle: boolean;
    abTestAdCreative: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    };
    description?: string | null | undefined;
    primaryAdCreative?: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    } | null | undefined;
    campaignObjective?: string | null | undefined;
    adType?: "Search" | "Display" | null | undefined;
    biddingStrategy?: string | null | undefined;
    targetLocations?: string | null | undefined;
    endDate?: NativeDate | null | undefined;
    totalBudget?: number | null | undefined;
    payment?: {
        status: "pending" | "failed" | "succeeded";
        transactionId?: string | null | undefined;
        amountPaid?: number | null | undefined;
        paidAt?: NativeDate | null | undefined;
    } | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "draft" | "active" | "paused" | "completed" | "failed" | "pending_approval" | "disapproved" | "Paused";
    title: string;
    dealerId: mongoose.Types.ObjectId;
    networks: string[];
    dailyBudget: number;
    isABTesting: boolean;
    startDate: NativeDate;
    googleAdsCampaignId: string;
    googleAdsAdGroupId: string;
    googleAdsAccountId: string;
    syncedWithGoogle: boolean;
    abTestAdCreative: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    };
    description?: string | null | undefined;
    primaryAdCreative?: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    } | null | undefined;
    campaignObjective?: string | null | undefined;
    adType?: "Search" | "Display" | null | undefined;
    biddingStrategy?: string | null | undefined;
    targetLocations?: string | null | undefined;
    endDate?: NativeDate | null | undefined;
    totalBudget?: number | null | undefined;
    payment?: {
        status: "pending" | "failed" | "succeeded";
        transactionId?: string | null | undefined;
        amountPaid?: number | null | undefined;
        paidAt?: NativeDate | null | undefined;
    } | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "draft" | "active" | "paused" | "completed" | "failed" | "pending_approval" | "disapproved" | "Paused";
    title: string;
    dealerId: mongoose.Types.ObjectId;
    networks: string[];
    dailyBudget: number;
    isABTesting: boolean;
    startDate: NativeDate;
    googleAdsCampaignId: string;
    googleAdsAdGroupId: string;
    googleAdsAccountId: string;
    syncedWithGoogle: boolean;
    abTestAdCreative: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    };
    description?: string | null | undefined;
    primaryAdCreative?: {
        finalUrl?: string | null | undefined;
        headlines?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        descriptions?: mongoose.Types.DocumentArray<{
            text: string;
        }, mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
            text: string;
        }> & {
            text: string;
        }> | null | undefined;
        path1?: string | null | undefined;
        path2?: string | null | undefined;
        headline?: string | null | undefined;
        descriptionText?: string | null | undefined;
        imageUrl?: string | null | undefined;
    } | null | undefined;
    campaignObjective?: string | null | undefined;
    adType?: "Search" | "Display" | null | undefined;
    biddingStrategy?: string | null | undefined;
    targetLocations?: string | null | undefined;
    endDate?: NativeDate | null | undefined;
    totalBudget?: number | null | undefined;
    payment?: {
        status: "pending" | "failed" | "succeeded";
        transactionId?: string | null | undefined;
        amountPaid?: number | null | undefined;
        paidAt?: NativeDate | null | undefined;
    } | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Campaign;
