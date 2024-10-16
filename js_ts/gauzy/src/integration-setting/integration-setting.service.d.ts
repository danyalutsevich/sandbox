import { IIntegrationSetting, IIntegrationTenant } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { IntegrationSetting } from './integration-setting.entity';
import { TypeOrmIntegrationSettingRepository } from './repository/type-orm-integration-setting.repository';
import { MikroOrmIntegrationSettingRepository } from './repository/mikro-orm-integration-setting.repository';
export declare class IntegrationSettingService extends TenantAwareCrudService<IntegrationSetting> {
    readonly typeOrmIntegrationSettingRepository: TypeOrmIntegrationSettingRepository;
    readonly mikroOrmIntegrationSettingRepository: MikroOrmIntegrationSettingRepository;
    constructor(typeOrmIntegrationSettingRepository: TypeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository: MikroOrmIntegrationSettingRepository);
    /**
     * Bulk update or create integration settings for a specific integration.
     *
     * @param integrationId - The identifier of the integration for which settings are updated or created.
     * @param input - An array of integration settings or a single integration setting to update or create.
     * @returns {Promise<IIntegrationSetting[]>} - A promise that resolves with an array of updated or created integration settings.
     */
    bulkUpdateOrCreate(integrationId: IIntegrationTenant['id'], input: IIntegrationSetting | IIntegrationSetting[]): Promise<IIntegrationSetting[]>;
}
