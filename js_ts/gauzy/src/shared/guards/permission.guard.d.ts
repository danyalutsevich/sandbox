import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { RolePermissionService } from '../../role-permission/role-permission.service';
export declare class PermissionGuard implements CanActivate {
    private cacheManager;
    private readonly _reflector;
    private readonly _rolePermissionService;
    constructor(cacheManager: Cache, _reflector: Reflector, _rolePermissionService: RolePermissionService);
    /**
     * Checks if the user is authorized based on specified permissions.
     * @param context The execution context.
     * @returns A promise that resolves to a boolean indicating authorization status.
     */
    canActivate(context: ExecutionContext): Promise<boolean>;
}
