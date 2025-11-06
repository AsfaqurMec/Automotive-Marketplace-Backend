import { Request } from 'express';
import { JWTPayload } from './auth.js';
export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}
export interface FileUploadRequest extends Request {
    files?: Express.Multer.File[] | {
        [fieldname: string]: Express.Multer.File[];
    };
}
export interface AuthenticatedFileUploadRequest extends AuthenticatedRequest {
    files?: Express.Multer.File[] | {
        [fieldname: string]: Express.Multer.File[];
    };
}
export interface VehicleQueryParams {
    page?: string;
    limit?: string;
    sort?: string;
    type?: string;
    isAvailable?: string;
    search?: string;
    [key: string]: string | undefined;
}
export interface VehicleRequest extends Omit<Request, 'params'> {
    query: VehicleQueryParams;
    params: {
        id?: string;
        slug?: string;
        [key: string]: string | undefined;
    };
}
export interface AuthenticatedVehicleRequest extends Omit<AuthenticatedRequest, 'params'> {
    query: VehicleQueryParams;
    params: {
        id?: string;
        slug?: string;
        [key: string]: string | undefined;
    };
}
export interface ChatQueryParams {
    userId?: string;
    role?: string;
    chatId?: string;
    type?: string;
    [key: string]: string | undefined;
}
export interface ChatRequest extends Request {
    query: ChatQueryParams;
}
export interface AuthenticatedChatRequest extends AuthenticatedRequest {
    query: ChatQueryParams;
}
export interface MessageRequest extends Request {
    body: {
        chatId: string;
        content: string;
        type?: 'text' | 'image' | 'file';
        attachments?: string[];
    };
}
export interface AuthenticatedMessageRequest extends AuthenticatedRequest {
    body: {
        chatId: string;
        content: string;
        type?: 'text' | 'image' | 'file';
        attachments?: string[];
    };
}
export interface CommunityPostRequest extends AuthenticatedFileUploadRequest {
    body: {
        title: string;
        content: string;
        category?: string;
        tags?: string[];
        isPublic?: boolean;
    };
}
export interface CampaignCreateRequest extends AuthenticatedFileUploadRequest {
    body: {
        title: string;
        description: string;
        campaignObjective: string;
        networksString?: string;
        adType: string;
        dailyBudget?: string;
        biddingStrategy: string;
        targetLocations: string;
        isABTestingString?: string;
        startDate: string;
        endDate: string;
        totalBudgetString?: string;
        searchAdAString?: string;
        searchAdBString?: string;
        displayAdAString?: string;
        displayAdBString?: string;
    };
}
export interface AdminQueryParams {
    page?: string;
    limit?: string;
    sort?: string;
    search?: string;
    status?: string;
    [key: string]: string | undefined;
}
export interface AdminRequest extends AuthenticatedRequest {
    query: AdminQueryParams;
}
export interface GarageCreateRequest extends AuthenticatedFileUploadRequest {
    body: {
        name: string;
        address: string;
        phone: string;
        email: string;
        services: string[];
        description?: string;
        workingHours?: string;
        isVerified?: boolean;
    };
}
export interface GarageUpdateRequest extends AuthenticatedFileUploadRequest {
    body: {
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
        services?: string[];
        description?: string;
        workingHours?: string;
        isVerified?: boolean;
    };
    params: {
        id: string;
    };
}
export interface SparePartCreateRequest extends AuthenticatedFileUploadRequest {
    body: {
        name: string;
        brand: string;
        model: string;
        year: string;
        category: string;
        price: number;
        stock: number;
        description?: string;
        compatibleCars?: string | string[];
        condition: 'new' | 'used' | 'refurbished';
        warranty?: string;
    };
}
export interface SparePartUpdateRequest extends AuthenticatedFileUploadRequest {
    body: {
        name?: string;
        brand?: string;
        model?: string;
        year?: string;
        category?: string;
        price?: number;
        stock?: number;
        description?: string;
        compatibleCars?: string | string[];
        condition?: 'new' | 'used' | 'refurbished';
        warranty?: string;
    };
    params: {
        id: string;
    };
}
export interface LeadCreateRequest extends AuthenticatedRequest {
    body: {
        name: string;
        email: string;
        phone?: string;
        source: 'website' | 'campaign' | 'referral' | 'social';
        notes?: string;
        assignedTo?: string;
    };
}
export interface LeadUpdateRequest extends AuthenticatedRequest {
    body: {
        name?: string;
        email?: string;
        phone?: string;
        source?: 'website' | 'campaign' | 'referral' | 'social';
        status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
        notes?: string;
        assignedTo?: string;
    };
    params: {
        id: string;
    };
}
export interface SubscriptionCreateRequest extends AuthenticatedRequest {
    body: {
        planId: string;
        amount: number;
        currency: string;
        paymentMethod: string;
        autoRenew: boolean;
    };
}
export interface UserCreateRequest extends AuthenticatedRequest {
    body: {
        email: string;
        password: string;
        fullName: string;
        role: 'admin' | 'dealer' | 'customer';
        phone?: string;
        companyName?: string;
        isVerified?: boolean;
    };
}
export interface UserUpdateRequest extends AuthenticatedRequest {
    body: {
        email?: string;
        fullName?: string;
        role?: 'admin' | 'dealer' | 'customer';
        phone?: string;
        companyName?: string;
        isVerified?: boolean;
        isBlocked?: boolean;
    };
    params: {
        id: string;
    };
}
export interface PaginationQuery {
    page?: string;
    limit?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    [key: string]: string | undefined;
}
export interface PaginatedRequest extends Request {
    query: PaginationQuery;
}
export interface AuthenticatedPaginatedRequest extends AuthenticatedRequest {
    query: PaginationQuery;
}
export interface ValidationErrorDetail {
    field: string;
    message: string;
    value?: unknown;
}
export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: ValidationErrorDetail[];
    };
}
export interface ApiSuccessResponse<T = unknown> {
    success: true;
    message: string;
    data?: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export interface SocketRequest {
    userId?: string;
    apiKey?: string;
    numbers?: string[];
    message?: string;
    results?: unknown[];
    senderId?: string;
    content?: string;
    tempId?: string;
    chatId?: string;
    chatType?: string;
    senderRole?: string;
    messageContentType?: string;
    recipientId?: string;
    initialChatId?: string;
    type?: string;
    sendedId?: string;
    timestamp?: string;
}
