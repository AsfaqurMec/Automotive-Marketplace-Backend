import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'yup';
import { AppError } from '../types/common.js';
import HttpException from '../services/HttpsException.js';

// Custom error class for operational errors
export class OperationalError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  error: Error | AppError | OperationalError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorCode = 'INTERNAL_SERVER_ERROR';

  // Handle different types of errors
  if (error instanceof OperationalError) {
    statusCode = error.statusCode;
    message = error.message;
    errorCode = 'OPERATIONAL_ERROR';
  } else if (error instanceof ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errorCode = 'VALIDATION_ERROR';
  } else if (error instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = 'Invalid token';
    errorCode = 'JWT_ERROR';
  } else if (error instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = 'Token expired';
    errorCode = 'JWT_EXPIRED';
  } else if (error instanceof MulterError) {
    statusCode = 400;
    message = 'File upload error';
    errorCode = 'MULTER_ERROR';
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID format';
    errorCode = 'CAST_ERROR';
  } else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Database validation error';
    errorCode = 'MONGOOSE_VALIDATION_ERROR';
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    statusCode = 404;
    message = 'Document not found';
    errorCode = 'DOCUMENT_NOT_FOUND';
  } else if (error instanceof HttpException) {
    statusCode = error.status || 500;
    message = error.message;
    errorCode = error.errorCode || 'APP_ERROR';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: (error as Error).stack }),
    },
  });
};

// Async error wrapper
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Not found middleware
export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new OperationalError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

// Validation error handler
export const handleValidationError = (error: ValidationError) => {
  const errors = error.inner.map((err) => ({
    field: err.path,
    message: err.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation failed',
    errors,
  };
};

