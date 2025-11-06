import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    process.exit(1);
}
export default function authenticateUser(req, res, next) {
    try {
        const token = req.cookies?.['nextdeal-token'] ||
            req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({
                success: false,
                message: "No authentication token provided"
            });
            return;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: "Authentication token expired"
            });
            return;
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: "Invalid authentication token"
            });
            return;
        }
        res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
        return;
    }
}
// Optional authentication middleware
export const optionalAuth = (req, res, next) => {
    try {
        const token = req.cookies?.['nextdeal-token'] ||
            req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
        }
        next();
    }
    catch {
        // Continue without authentication if token is invalid
        next();
    }
};
// Role-based authorization middleware
export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Insufficient permissions"
            });
            return;
        }
        next();
    };
};
//# sourceMappingURL=authMiddleware.js.map