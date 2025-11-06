import { ValidationError } from 'yup';
import { MulterError } from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import HttpException from '../services/HttpsException.js';

// Base error type
export interface BaseError {
  message: string;
  status?: number;
  errorCode?: string;
}

// Extended error types
export interface HttpError extends BaseError {
  status: number;
  errorCode: string;
  errors?: unknown;
}

export interface ValidationErrorType extends BaseError {
  status: 400;
  errorCode: 'VALIDATION_ERROR';
  errors: ValidationError['errors'];
}

export interface MulterErrorType extends BaseError {
  status: 415;
  errorCode: 'MULTER_ERROR';
  code?: string;
}

export interface JwtErrorType extends BaseError {
  status: 401;
  errorCode: 'JWT_ERROR';
}

export interface MongooseErrorType extends BaseError {
  status: 500;
  errorCode: 'MONGOOSE_ERROR';
  name?: string;
}

export interface EmailErrorType extends BaseError {
  status: 500;
  errorCode: 'EMAIL_ERROR';
}

// Union type for all possible errors
export type AppError = 
  | HttpException
  | ValidationError
  | MulterError
  | jwt.JsonWebTokenError
  | mongoose.Error
  | EmailErrorType
  | Error;

// Type guard functions
export function isHttpException(error: unknown): error is HttpException {
  return error instanceof HttpException;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isMulterError(error: unknown): error is MulterError {
  return error instanceof MulterError;
}

export function isJwtError(error: unknown): error is jwt.JsonWebTokenError {
  return error instanceof jwt.JsonWebTokenError;
}

export function isMongooseError(error: unknown): error is mongoose.Error {
  return error instanceof mongoose.Error;
}

export function isEmailError(error: unknown): error is EmailErrorType {
  return typeof error === 'object' && error !== null && 'errorCode' in error && (error as EmailErrorType).errorCode === 'EMAIL_ERROR';
}

// Helper function to get error status
export function getErrorStatus(error: AppError): number {
  if (isHttpException(error)) return error.status;
  if (isValidationError(error)) return 400;
  if (isMulterError(error)) return 415;
  if (isJwtError(error)) return 401;
  if (isMongooseError(error)) return 500;
  if (isEmailError(error)) return error.status;
  
  return 500; // Default fallback
}

// Helper function to get error message
export function getErrorMessage(error: AppError): string {
  if (isHttpException(error)) return error.message;
  if (isValidationError(error)) return error.message;
  if (isMulterError(error)) return error.message;
  if (isJwtError(error)) return error.message;
  if (isMongooseError(error)) return error.message;
  if (isEmailError(error) && typeof error.message === 'string') return error.message;

  if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message: string }).message === 'string') {
    return (error as { message: string }).message;
  }

  return 'Unknown error occurred';
}
