import { ValidationError } from 'yup';
import { MulterError } from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import HttpException from '../services/HttpsException.js';
// Type guard functions
export function isHttpException(error) {
    return error instanceof HttpException;
}
export function isValidationError(error) {
    return error instanceof ValidationError;
}
export function isMulterError(error) {
    return error instanceof MulterError;
}
export function isJwtError(error) {
    return error instanceof jwt.JsonWebTokenError;
}
export function isMongooseError(error) {
    return error instanceof mongoose.Error;
}
export function isEmailError(error) {
    return typeof error === 'object' && error !== null && 'errorCode' in error && error.errorCode === 'EMAIL_ERROR';
}
// Helper function to get error status
export function getErrorStatus(error) {
    if (isHttpException(error))
        return error.status;
    if (isValidationError(error))
        return 400;
    if (isMulterError(error))
        return 415;
    if (isJwtError(error))
        return 401;
    if (isMongooseError(error))
        return 500;
    if (isEmailError(error))
        return error.status;
    return 500; // Default fallback
}
// Helper function to get error message
export function getErrorMessage(error) {
    if (isHttpException(error))
        return error.message;
    if (isValidationError(error))
        return error.message;
    if (isMulterError(error))
        return error.message;
    if (isJwtError(error))
        return error.message;
    if (isMongooseError(error))
        return error.message;
    if (isEmailError(error) && typeof error.message === 'string')
        return error.message;
    if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
        return error.message;
    }
    return 'Unknown error occurred';
}
//# sourceMappingURL=errors.js.map