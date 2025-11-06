import { ObjectId } from 'mongoose';

// Generic API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Email types
export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  fullName?: string;
  email?: string;
  password?: string;
  link?: string;
  lng?: string;
  fileName?: string;
  downloadLink?: string;
  content?: string;
}

// Query parameters interface
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, unknown>;
  [key: string]: unknown;
}

// File upload types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  buffer?: Buffer;
  stream?: unknown;
}

// Vehicle related types
export interface VehicleLocation {
  country: string;
  state?: string;
  city: string;
  area?: string;
  addressLine?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VehicleDocuments {
  registrationNumber?: string;
  registrationExpiry?: Date;
  insuranceExpiry?: Date;
  pollutionCertificateExpiry?: Date;
}

export interface VehicleMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface VehicleFeatures {
  [key: string]: unknown;
}

// Chat and Message types
export interface ChatMessage {
  _id: string | ObjectId;
  chatId: string | ObjectId;
  sender: string | ObjectId;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  timestamp: Date;
  readBy: string[];
  attachments?: string[];
}

export interface ChatRoom {
  _id: string | ObjectId;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
  type: 'direct' | 'group' | 'ai';
  name?: string;
  avatar?: string;
}

// Campaign types
export interface Campaign {
  _id: string | ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetAudience: string[];
  adCreatives: AdCreative[];
  metrics: CampaignMetrics;
  createdBy: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdCreative {
  type: 'image' | 'video' | 'text';
  content: string;
  url?: string;
  headline?: string;
  description?: string;
  callToAction?: string;
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
}

// Subscription types
export interface Subscription {
  _id: string | ObjectId;
  userId: string | ObjectId;
  planId: string | ObjectId;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate: Date;
  amount: number;
  currency: string;
  paymentMethod: string;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Lead types
export interface Lead {
  _id: string | ObjectId;
  name: string;
  email: string;
  phone?: string;
  source: 'website' | 'campaign' | 'referral' | 'social';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assignedTo?: string | ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Error types
export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

// Socket types
export interface SocketData {
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

// Database operation types
export interface DatabaseQuery {
  filter: Record<string, unknown>;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
  populate?: string | string[];
  select?: string;
}

export interface DatabaseUpdate {
  filter: Record<string, unknown>;
  update: Record<string, unknown>;
  options?: {
    new?: boolean;
    upsert?: boolean;
    multi?: boolean;
  };
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Environment configuration types
export interface EnvironmentConfig {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGINS: string[];
  GOOGLE_CLOUD_BUCKET_NAME: string;
  MAX_FILE_SIZE_MB: number;
  ALLOWED_FILE_TYPES: string[];
  [key: string]: unknown;
}

// Logging types
export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
  error?: Error;
}

// Rate limiting types
export interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
  statusCode: number;
}

// Security types
export interface SecurityConfig {
  bcryptRounds: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigins: string[];
  allowedFileTypes: string[];
  maxFileSize: number;
}
