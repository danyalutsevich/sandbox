import { BetterAuthService } from "../better-auth.service.js";
import { BetterAuthOptions } from "better-auth";
export declare function createBetterAuthService(options: BetterAuthOptions, callback: (auth: any) => void): void;
export declare function toNestJsController(authService: BetterAuthService, request: Request, response: Response): Promise<void>;
