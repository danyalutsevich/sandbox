import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RoleGuard implements CanActivate {
    private readonly _reflector;
    constructor(_reflector: Reflector);
    /**
     * Determines if the user associated with the request has the required roles.
     * @param context The execution context of the request.
     * @returns A boolean indicating whether the user has the required roles.
     */
    canActivate(context: ExecutionContext): Promise<boolean>;
}
