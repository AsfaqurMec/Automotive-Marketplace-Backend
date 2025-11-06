export default class HttpException extends Error {
    status: number;
    errorCode: string;
    errors?: unknown;
    constructor(status: number, message: string, errorCode?: string, errors?: unknown);
}
export declare function NotFoundException(message: string, errorCode?: string): HttpException;
export declare function BadRequestException(message: string, errorCode?: string): HttpException;
export declare function UnauthorizedException(message: string, errorCode?: string): HttpException;
export declare function InternalServerException(message: string, errorCode?: string, errors?: unknown): HttpException;
export declare function JwtException(error: unknown): HttpException;
export declare function MongooseException(error: unknown): HttpException;
export declare function MulterException(error: unknown): HttpException;
export declare function ValidationException(error: unknown): HttpException;
export declare function resolveStatus(error: unknown): number;
