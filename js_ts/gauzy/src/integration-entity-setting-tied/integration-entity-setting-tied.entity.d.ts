import { IIntegrationEntitySetting, IIntegrationEntitySettingTied, IntegrationEntity } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class IntegrationEntitySettingTied extends TenantOrganizationBaseEntity implements IIntegrationEntitySettingTied {
    entity: IntegrationEntity;
    sync: boolean;
    /**
     * IntegrationEntitySetting
     */
    integrationEntitySetting?: IIntegrationEntitySetting;
    integrationEntitySettingId?: IIntegrationEntitySetting['id'];
}
