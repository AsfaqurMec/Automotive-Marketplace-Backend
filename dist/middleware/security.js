import helmet from 'helmet';
import logger from '../utils/logger.js';
// Security headers middleware using Helmet
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
});
// Remove sensitive headers
export const removeSensitiveHeaders = (req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
};
// Request logging middleware
export const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
        };
        if (res.statusCode >= 400) {
            logger.warn('HTTP Request', logData);
        }
        else {
            logger.info('HTTP Request', logData);
        }
    });
    next();
};
// Input sanitization middleware
export const sanitizeInput = (req, res, next) => {
    // Sanitize query parameters
    if (req.query) {
        Object.keys(req.query).forEach(key => {
            if (typeof req.query[key] === 'string') {
                req.query[key] = req.query[key].trim();
            }
        });
    }
    // Sanitize body parameters
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            }
        });
    }
    next();
};
// CORS configuration
export const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        const allowedOrigins = process.env.CORS_ORIGINS?.split(',').filter(Boolean) || ['http://localhost:3000'];
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            logger.warn('CORS blocked request', { origin, allowedOrigins });
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
// Prevent parameter pollution
export const preventParameterPollution = (req, res, next) => {
    // Check for duplicate query parameters
    const queryKeys = Object.keys(req.query);
    const uniqueKeys = new Set(queryKeys);
    if (queryKeys.length !== uniqueKeys.size) {
        logger.warn('Parameter pollution detected', {
            url: req.url,
            ip: req.ip,
            duplicateKeys: queryKeys.filter(key => queryKeys.indexOf(key) !== queryKeys.lastIndexOf(key))
        });
        return res.status(400).json({
            success: false,
            error: {
                code: 'PARAMETER_POLLUTION',
                message: 'Duplicate parameters detected'
            }
        });
    }
    next();
};
// Content type validation
export const validateContentType = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        const contentType = req.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(415).json({
                success: false,
                error: {
                    code: 'UNSUPPORTED_MEDIA_TYPE',
                    message: 'Content-Type must be application/json'
                }
            });
        }
    }
    next();
};
//# sourceMappingURL=security.js.map