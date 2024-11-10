import { IIntegrationSetting } from '../../plugins/contracts/dist/index';
import { IntegrationTenant, TenantOrganizationBaseEntity } from './../core/entities/internal';
export declare class IntegrationSetting extends TenantOrganizationBaseEntity implements IIntegrationSetting {
    settingsName: string;
    settingsValue: string;
    /**
     * IntegrationTenant
     */
    integration?: IntegrationTenant;
    integrationId?: IntegrationTenant['id'];
    /**
     * Additional fields to expose secret fields
     */
    wrapSecretKey?: string;
    wrapSecretValue?: string;
}
