import { CommandBus } from '@nestjs/cqrs';
import { UpdateResult, FindManyOptions, DeepPartial, FindOptionsWhere } from 'typeorm';
import { ITenant, IRolePermission, IImportRecord, IRolePermissionMigrateInput, IPagination } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { RolePermission } from './role-permission.entity';
import { Role } from '../role/role.entity';
import { RoleService } from './../role/role.service';
import { MikroOrmRolePermissionRepository } from './repository/mikro-orm-role-permission.repository';
import { TypeOrmRolePermissionRepository } from './repository/type-orm-role-permission.repository';
export declare class RolePermissionService extends TenantAwareCrudService<RolePermission> {
    readonly typeOrmRolePermissionRepository: TypeOrmRolePermissionRepository;
    readonly mikroOrmRolePermissionRepository: MikroOrmRolePermissionRepository;
    private readonly roleService;
    private readonly _commandBus;
    constructor(typeOrmRolePermissionRepository: TypeOrmRolePermissionRepository, mikroOrmRolePermissionRepository: MikroOrmRolePermissionRepository, roleService: RoleService, _commandBus: CommandBus);
    /**
     * Retrieves the permissions of the current user.
     *
     * @return {Promise<IPagination<RolePermission>>} A promise that resolves to a paginated list of RolePermission objects.
     */
    findMePermissions(): Promise<IPagination<IRolePermission>>;
    /**
     * GET all role-permissions using API filter
     *
     * @param filter
     * @returns
     */
    findAllRolePermissions(filter?: FindManyOptions<RolePermission>): Promise<IPagination<RolePermission>>;
    /**
     * Create permissions for lower roles users
     *
     * @param partialEntity
     * @returns
     */
    createPermission(partialEntity: DeepPartial<IRolePermission>): Promise<IRolePermission>;
    updatePermission(id: string | FindOptionsWhere<IRolePermission>, partialEntity: DeepPartial<IRolePermission>): Promise<UpdateResult | IRolePermission>;
    /**
     * DELETE role permissions
     *
     * @param id
     * @returns
     */
    deletePermission(id: string): Promise<import("typeorm").DeleteResult>;
    updateRoles(tenant: ITenant, role: Role): Promise<void>;
    updateRolesAndPermissions(tenants: ITenant[]): Promise<IRolePermission[] & RolePermission[]>;
    migratePermissions(): Promise<IRolePermissionMigrateInput[]>;
    migrateImportRecord(permissions: IRolePermissionMigrateInput[]): Promise<IImportRecord[]>;
    /**
     * Checks if the given role permissions are valid for the current tenant.
     * @param permissions - An array of role permissions to check.
     * @param includeRole - Optional parameter to include role-specific checks.
     * @returns A Promise with a boolean indicating if the role permissions are valid.
     * @throws Error if the ORM type is not implemented.
     */
    checkRolePermission(tenantId: string, roleId: string, permissions: string[], includeRole?: boolean): Promise<boolean>;
}
