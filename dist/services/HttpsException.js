import { MulterError } from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'yup';
const { JsonWebTokenError } = jwt;
export default class HttpException extends Error {
    status;
    errorCode;
    errors;
    constructor(status, message, errorCode = 'UNKNOWN_ERROR', errors) {
        super(message);
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}
export function NotFoundException(message, errorCode) {
    return new HttpException(404, message, errorCode || 'NOT_FOUND');
}
export function BadRequestException(message, errorCode) {
    return new HttpException(400, message, errorCode || 'BAD_REQUEST');
}
export function UnauthorizedException(message, errorCode) {
    return new HttpException(401, message, errorCode || 'UNAUTHORIZED');
}
export function InternalServerException(message, errorCode, errors) {
    return new HttpException(500, message, errorCode || 'INTERNAL_SERVER_ERROR', errors);
}
export function JwtException(error) {
    const message = error instanceof Error ? error.message : 'JWT Error';
    return new HttpException(401, message, 'JWT_ERROR');
}
export function MongooseException(error) {
    const message = error instanceof Error ? error.message : 'Mongoose Error';
    return new HttpException(500, message, 'MONGOOSE_ERROR', error);
}
export function MulterException(error) {
    const message = error instanceof Error ? error.message : 'Multer Error';
    return new HttpException(400, message, 'MULTER_ERROR');
}
export function ValidationException(error) {
    const message = error instanceof Error ? error.message : 'Validation Error';
    const errors = error instanceof ValidationError ? error.errors : undefined;
    return new HttpException(400, message, 'VALIDATION_ERROR', errors);
}
export function resolveStatus(error) {
    // Type guard for objects with status property
    if (error && typeof error === 'object' && 'status' in error && typeof error.status === 'number') {
        return error.status;
    }
    if (error instanceof MulterError)
        return 415;
    if (error instanceof ValidationError)
        return 400;
    if (error instanceof JsonWebTokenError)
        return 401;
    if (error instanceof mongoose.Error)
        return 500;
    // Type guard for objects with name property
    if (error && typeof error === 'object' && 'name' in error) {
        const errorName = error.name;
        if (errorName === 'CastError')
            return 400;
        if (errorName === 'DocumentNotFoundError')
            return 404;
    }
    return 500;
}
//# sourceMappingURL=HttpsException.js.map