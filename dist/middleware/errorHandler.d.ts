import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';
import { AppError } from '../types/common.js';
export declare class OperationalError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const errorHandler: (error: Error | AppError | OperationalError, req: Request, res: Response, _next: NextFunction) => void;
export declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
export declare const handleValidationError: (error: ValidationError) => {
    statusCode: number;
    message: string;
    errors: {
        field: string | undefined;
        message: string;
    }[];
};
