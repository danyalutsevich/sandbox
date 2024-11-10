import { IIntegrationEntitySetting, IIntegrationTenant, IPagination } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { IntegrationEntitySetting } from './integration-entity-setting.entity';
import { MikroOrmIntegrationEntitySettingRepository } from './repository/mikro-orm-integration-entity-setting.repository';
import { TypeOrmIntegrationEntitySettingRepository } from './repository/type-orm-integration-entity-setting.repository';
export declare class IntegrationEntitySettingService extends TenantAwareCrudService<IntegrationEntitySetting> {
    readonly typeOrmIntegrationEntitySettingRepository: TypeOrmIntegrationEntitySettingRepository;
    constructor(typeOrmIntegrationEntitySettingRepository: TypeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository: MikroOrmIntegrationEntitySettingRepository);
    /**
     * Get integration entity settings by integration ID.
     *
     * @param integrationId - The ID of the integration.
     * @returns A promise resolving to an array of integration entity settings.
     */
    getIntegrationEntitySettings(integrationId: IIntegrationTenant['id']): Promise<IPagination<IntegrationEntitySetting>>;
    /**
     * Create or update integration entity settings in bulk by integration.
     *
     * @param input - An individual IIntegrationEntitySetting or an array of IIntegrationEntitySetting objects to be created or updated.
     * @returns A promise resolving to an array of created or updated IIntegrationEntitySetting objects.
     */
    bulkUpdateOrCreate(input: IIntegrationEntitySetting | IIntegrationEntitySetting[]): Promise<IIntegrationEntitySetting[]>;
}
