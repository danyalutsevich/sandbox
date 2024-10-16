import { IIntegrationEntitySettingTied } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { IntegrationEntitySettingTied } from './integration-entity-setting-tied.entity';
import { MikroOrmIntegrationEntitySettingTiedRepository } from './repository/mikro-orm-integration-entity-setting-tied.repository';
import { TypeOrmIntegrationEntitySettingTiedRepository } from './repository/type-orm-integration-entity-setting-tied.repository';
export declare class IntegrationEntitySettingTiedService extends TenantAwareCrudService<IntegrationEntitySettingTied> {
    readonly typeOrmIntegrationEntitySettingTiedRepository: TypeOrmIntegrationEntitySettingTiedRepository;
    constructor(typeOrmIntegrationEntitySettingTiedRepository: TypeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository: MikroOrmIntegrationEntitySettingTiedRepository);
    /**
     * Create or update bulk integration entity settings tied entities by integration.
     *
     * @param input - The integration entity setting tied input data, either a single entity or an array of entities.
     * @returns A promise that resolves to an array of created or updated IIntegrationEntitySettingTied instances.
     */
    bulkUpdateOrCreate(input: IIntegrationEntitySettingTied | IIntegrationEntitySettingTied[]): Promise<IIntegrationEntitySettingTied[]>;
}
