import { CommandBus } from '@nestjs/cqrs';
import { ITenantCreateInput, ITenant, IUser } from '../../plugins/contracts/dist/index';
import { ConfigService } from '../../plugins/config/dist/index';
import { CrudService } from '../core/crud/crud.service';
import { MikroOrmTenantRepository, TypeOrmTenantRepository } from './repository';
import { MikroOrmUserRepository, TypeOrmUserRepository } from '../user/repository';
import { MikroOrmRoleRepository, TypeOrmRoleRepository } from '../role/repository';
import { Tenant } from './tenant.entity';
export declare class TenantService extends CrudService<Tenant> {
    private readonly typeOrmTenantRepository;
    private readonly mikroOrmTenantRepository;
    private readonly typeOrmRoleRepository;
    private readonly mikroOrmRoleRepository;
    private readonly typeOrmUserRepository;
    private readonly mikroOrmUserRepository;
    private readonly commandBus;
    private readonly configService;
    constructor(typeOrmTenantRepository: TypeOrmTenantRepository, mikroOrmTenantRepository: MikroOrmTenantRepository, typeOrmRoleRepository: TypeOrmRoleRepository, mikroOrmRoleRepository: MikroOrmRoleRepository, typeOrmUserRepository: TypeOrmUserRepository, mikroOrmUserRepository: MikroOrmUserRepository, commandBus: CommandBus, configService: ConfigService);
    /**
     * Onboards a tenant and assigns roles to a user. This involves tenant creation,
     * executing update tasks, assigning the SUPER_ADMIN role, and handling import records.
     *
     * @param entity Tenant creation details.
     * @param user User to be associated with the tenant.
     * @returns The created ITenant entity.
     */
    onboardTenant(entity: ITenantCreateInput, user: IUser): Promise<ITenant>;
    /**
     * Executes a set of update tasks for a given tenant in parallel.
     *
     * @param tenant An instance of the Tenant class.
     * @returns Promise<void>
     */
    executeTenantUpdateTasks(tenant: Tenant): Promise<void>;
    /**
     * Initializes settings for a new tenant, particularly setting up the file storage provider.
     * It retrieves the file system configuration and defaults to LOCAL storage if no specific
     * setting is found. Then, it executes a TenantSettingSaveCommand to save these settings for the tenant.
     *
     * @param tenant The tenant entity for which settings are being initialized.
     */
    private initializeTenantSettings;
    /**
     * Handles the creation of import records for a tenant and associated user based on migration data.
     * It checks the tenant creation input for import requirements and processes accordingly.
     *
     * @param entity Details about the tenant import.
     * @param tenant The tenant entity.
     * @param user The associated user entity.
     */
    importRecords(entity: ITenantCreateInput, tenant: ITenant, user: IUser): Promise<void>;
}
