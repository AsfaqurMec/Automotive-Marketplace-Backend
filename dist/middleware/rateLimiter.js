import rateLimit from 'express-rate-limit';
import { configData } from '../config/index.js';
import logger from '../utils/logger.js';
// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: configData.RATE_LIMIT_WINDOW_MS,
    max: configData.RATE_LIMIT_MAX_REQUESTS,
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests from this IP, please try again later.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            url: req.url
        });
        res.status(429).json({
            success: false,
            error: {
                code: 'RATE_LIMIT_EXCEEDED',
                message: 'Too many requests from this IP, please try again later.'
            }
        });
    }
});
// Stricter rate limiter for authentication endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: {
        success: false,
        error: {
            code: 'AUTH_RATE_LIMIT_EXCEEDED',
            message: 'Too many authentication attempts, please try again later.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('Authentication rate limit exceeded', {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            url: req.url
        });
        res.status(429).json({
            success: false,
            error: {
                code: 'AUTH_RATE_LIMIT_EXCEEDED',
                message: 'Too many authentication attempts, please try again later.'
            }
        });
    }
});
// Rate limiter for file uploads
export const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // 20 uploads per hour
    message: {
        success: false,
        error: {
            code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
            message: 'Too many file uploads, please try again later.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('Upload rate limit exceeded', {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            url: req.url
        });
        res.status(429).json({
            success: false,
            error: {
                code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
                message: 'Too many file uploads, please try again later.'
            }
        });
    }
});
// Rate limiter for password reset
export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 password reset attempts per hour
    message: {
        success: false,
        error: {
            code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
            message: 'Too many password reset attempts, please try again later.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('Password reset rate limit exceeded', {
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            url: req.url
        });
        res.status(429).json({
            success: false,
            error: {
                code: 'PASSWORD_RESET_RATE_LIMIT_EXCEEDED',
                message: 'Too many password reset attempts, please try again later.'
            }
        });
    }
});
//# sourceMappingURL=rateLimiter.js.map