import { ICommandHandler } from '@nestjs/cqrs';
import { GauzyCloudService } from '../../gauzy-cloud.service';
import { RoleService } from './../../../role/role.service';
import { GauzyCloudTenantMigrateCommand } from './../gauzy-cloud-tenant.migrate.command';
import { RolePermissionService } from './../../../role-permission/role-permission.service';
export declare class GauzyCloudTenantMigrateHandler implements ICommandHandler<GauzyCloudTenantMigrateCommand> {
    private readonly _gauzyCloudService;
    private readonly _roleService;
    private readonly _rolePermissionService;
    constructor(_gauzyCloudService: GauzyCloudService, _roleService: RoleService, _rolePermissionService: RolePermissionService);
    execute(command: GauzyCloudTenantMigrateCommand): Promise<any>;
    private migrateRoles;
    private migratePermissions;
}
