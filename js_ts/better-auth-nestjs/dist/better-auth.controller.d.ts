import { NextFunction } from 'express';
import { BetterAuthService } from './better-auth.service.js';
export declare class BetterAuthController {
    private readonly authService;
    constructor(authService: BetterAuthService);
    handleAuth(request: Request, response: Response, next: NextFunction): Promise<void>;
}
