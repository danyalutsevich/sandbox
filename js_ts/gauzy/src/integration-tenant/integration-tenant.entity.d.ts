import { IIntegration, IIntegrationEntitySetting, IIntegrationMap, IIntegrationSetting, IIntegrationTenant, IntegrationEnum } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class IntegrationTenant extends TenantOrganizationBaseEntity implements IIntegrationTenant {
    name: IntegrationEnum;
    lastSyncedAt?: Date;
    /**
     * Integration
     */
    integration?: IIntegration;
    integrationId?: IIntegration['id'];
    /**
     * IntegrationSetting
     */
    settings?: IIntegrationSetting[];
    /**
     * IntegrationEntitySetting
     */
    entitySettings?: IIntegrationEntitySetting[];
    /**
     * IntegrationMap
     */
    entityMaps?: IIntegrationMap[];
}
