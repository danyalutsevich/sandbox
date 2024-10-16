import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const AuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthGuard extends AuthGuard_base {
    private readonly _reflector;
    constructor(_reflector: Reflector);
    /**
     * Determines if the current request can be activated based on authorization and PUBLIC decorators.
     * @param context The execution context of the request.
     * @returns A boolean indicating whether access is allowed.
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
