import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { IRole, ITenant, IRoleMigrateInput, IImportRecord } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { Role } from './role.entity';
import { MikroOrmRoleRepository, TypeOrmRoleRepository } from './repository';
export declare class RoleService extends TenantAwareCrudService<Role> {
    readonly typeOrmRoleRepository: TypeOrmRoleRepository;
    readonly mikroOrmRoleRepository: MikroOrmRoleRepository;
    private readonly _commandBus;
    constructor(typeOrmRoleRepository: TypeOrmRoleRepository, mikroOrmRoleRepository: MikroOrmRoleRepository, _commandBus: CommandBus);
    /**
     * Creates multiple roles for each tenant and saves them.
     * @param tenants - An array of tenants for which roles will be created.
     * @returns A promise that resolves to an array of created roles.
     */
    createBulk(tenants: ITenant[]): Promise<IRole[] & Role[]>;
    migrateRoles(): Promise<IRoleMigrateInput[]>;
    migrateImportRecord(roles: IRoleMigrateInput[]): Promise<IImportRecord[]>;
    /**
     * Few Roles can't be removed/delete for tenant
     * RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.EMPLOYEE, RolesEnum.VIEWER, RolesEnum.CANDIDATE
     *
     * @param id
     * @returns
     */
    delete(id: IRole['id']): Promise<DeleteResult>;
}
