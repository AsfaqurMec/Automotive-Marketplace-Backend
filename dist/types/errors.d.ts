import { ValidationError } from 'yup';
import { MulterError } from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import HttpException from '../services/HttpsException.js';
export interface BaseError {
    message: string;
    status?: number;
    errorCode?: string;
}
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
export type AppError = HttpException | ValidationError | MulterError | jwt.JsonWebTokenError | mongoose.Error | EmailErrorType | Error;
export declare function isHttpException(error: unknown): error is HttpException;
export declare function isValidationError(error: unknown): error is ValidationError;
export declare function isMulterError(error: unknown): error is MulterError;
export declare function isJwtError(error: unknown): error is jwt.JsonWebTokenError;
export declare function isMongooseError(error: unknown): error is mongoose.Error;
export declare function isEmailError(error: unknown): error is EmailErrorType;
export declare function getErrorStatus(error: AppError): number;
export declare function getErrorMessage(error: AppError): string;
