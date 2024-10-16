import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { TenantBaseGuard } from './tenant-base.guard';
import { RolePermissionService } from '../../role-permission/role-permission.service';
export declare class TenantPermissionGuard extends TenantBaseGuard implements CanActivate {
    private cacheManager;
    private readonly _reflector;
    private readonly _rolePermissionService;
    constructor(cacheManager: Cache, _reflector: Reflector, _rolePermissionService: RolePermissionService);
    /**
     *
     * @param context
     * @returns
     */
    canActivate(context: ExecutionContext): Promise<boolean>;
}
