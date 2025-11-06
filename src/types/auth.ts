import { ObjectId } from 'mongoose';

// User interfaces
export interface IUser {
  _id: string | ObjectId;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDealer extends IUser {
  companyName?: string;
  fullName: string;
  contactPerson?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  logo?: string;
  profileImage?: string;
  businessLicenseNumber?: string;
  licenseDocument?: string;
  licenseExpiry?: Date;
  carsPosted?: ObjectId[];
  rating?: number;
  numberOfReviews?: number;
  isVerified?: boolean;
  isBlocked?: boolean;
  lastLogin?: Date;
  isEmailVerified?: boolean;
  googleAdsCustomerId?: string;
  subscriptionId?: ObjectId;
  renewDate?: Date;
  googleAdsAccountCurrencyCode?: string;
  googleAdsAccountTimeZone?: string;
}

export interface ICustomer extends IUser {
  fullName: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  profileImage?: string;
  isBlocked?: boolean;
  lastLogin?: Date;
  isEmailVerified?: boolean;
  language?: string;
}

// JWT Token interfaces
export interface JWTPayload {
  _id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Login interfaces
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  companyName?: string;
  contactPerson?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  newPassword: string;
}

// Response interfaces
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Partial<IDealer | ICustomer>;
  token?: string;
  authenticated?: boolean;
}

// Cookie configuration
export interface CookieConfig {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'None' | 'Lax' | 'Strict';
  maxAge: number;
  domain?: string;
  path?: string;
}
