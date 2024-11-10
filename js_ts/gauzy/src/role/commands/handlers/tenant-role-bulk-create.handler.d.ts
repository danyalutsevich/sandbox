import { ICommandHandler } from '@nestjs/cqrs';
import { IRole } from '../../../../plugins/contracts/dist/index';
import { RolePermissionService } from '../../../role-permission/role-permission.service';
import { RoleService } from '../../role.service';
import { TenantRoleBulkCreateCommand } from '../tenant-role-bulk-create.command';
export declare class TenantRoleBulkCreateHandler implements ICommandHandler<TenantRoleBulkCreateCommand> {
    private readonly roleService;
    private readonly rolePermissionService;
    constructor(roleService: RoleService, rolePermissionService: RolePermissionService);
    /**
     * Executes a bulk role creation and permission update operation for tenants.
     * It first creates roles in bulk for the provided tenants and then updates their permissions accordingly.
     *
     * @param command An instance of TenantRoleBulkCreateCommand containing tenant data.
     * @returns A Promise that resolves to an array of IRole, representing the newly created roles.
     */
    execute(command: TenantRoleBulkCreateCommand): Promise<IRole[]>;
}
