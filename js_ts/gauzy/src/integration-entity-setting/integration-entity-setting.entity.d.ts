import { IIntegrationEntitySetting, IIntegrationEntitySettingTied, IIntegrationTenant, IntegrationEntity } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class IntegrationEntitySetting extends TenantOrganizationBaseEntity implements IIntegrationEntitySetting {
    entity: IntegrationEntity;
    sync: boolean;
    /**
     * IntegrationTenant
     */
    integration?: IIntegrationTenant;
    integrationId?: IIntegrationTenant['id'];
    /**
     * IntegrationEntitySettingTied
     */
    tiedEntities?: IIntegrationEntitySettingTied[];
}
