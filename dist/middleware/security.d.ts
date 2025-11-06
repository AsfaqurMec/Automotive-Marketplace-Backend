import { Request, Response, NextFunction } from 'express';
export declare const securityHeaders: (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: (err?: unknown) => void) => void;
export declare const removeSensitiveHeaders: (req: Request, res: Response, next: NextFunction) => void;
export declare const requestLogger: (req: Request, res: Response, next: NextFunction) => void;
export declare const sanitizeInput: (req: Request, res: Response, next: NextFunction) => void;
export declare const corsOptions: {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
    credentials: boolean;
    optionsSuccessStatus: number;
    methods: string[];
    allowedHeaders: string[];
};
export declare const preventParameterPollution: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateContentType: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
