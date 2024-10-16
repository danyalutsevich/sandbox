import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { MikroOrmEmployeeRepository, TypeOrmEmployeeRepository } from '../../employee/repository';
export declare class OrganizationPermissionGuard implements CanActivate {
    private cacheManager;
    readonly _reflector: Reflector;
    readonly _typeOrmEmployeeRepository: TypeOrmEmployeeRepository;
    readonly _mikroOrmEmployeeRepository: MikroOrmEmployeeRepository;
    constructor(cacheManager: Cache, _reflector: Reflector, _typeOrmEmployeeRepository: TypeOrmEmployeeRepository, _mikroOrmEmployeeRepository: MikroOrmEmployeeRepository);
    /**
     * Checks if the user is authorized based on specified permissions.
     * @param context The execution context.
     * @returns A promise that resolves to a boolean indicating authorization status.
     */
    canActivate(context: ExecutionContext): Promise<boolean>;
    /**
     * Checks if the employee has at least one specified permission in the associated organization.
     * @param employeeId - The ID of the employee to check permissions for.
     * @param permissions - An array of permission strings to check.
     * @returns A Promise that resolves to a boolean indicating if at least one permission is allowed in the organization.
     */
    checkOrganizationPermission(tenantId: string, employeeId: string, permissions: string[]): Promise<boolean>;
}
