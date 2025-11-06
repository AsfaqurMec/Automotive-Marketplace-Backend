import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/requests.js';
export default function authenticateUser(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export declare const optionalAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const requireRole: (roles: string[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
