import { CommandBus } from '@nestjs/cqrs';
import { IIntegrationEntitySetting, IIntegrationTenant, IPagination } from '../../plugins/contracts/dist/index';
import { IntegrationEntitySetting } from './integration-entity-setting.entity';
export declare class IntegrationEntitySettingController {
    private readonly _commandBus;
    constructor(_commandBus: CommandBus);
    /**
     * Get settings by integration.
     *
     * @param integrationId - The ID of the integration (validated using UUIDValidationPipe).
     * @returns A promise resolving to paginated integration entity settings.
     */
    getEntitySettingByIntegration(integrationId: IIntegrationTenant['id']): Promise<IPagination<IntegrationEntitySetting>>;
    /**
     * Update settings.
     *
     * @param integrationId - The ID of the integration (validated using UUIDValidationPipe).
     * @param entity - An individual IIntegrationEntitySetting or an array of IIntegrationEntitySetting objects to be updated.
     * @returns A promise resolving to an array of updated IIntegrationEntitySetting objects.
     */
    updateIntegrationEntitySettingByIntegration(integrationId: IIntegrationTenant['id'], input: IIntegrationEntitySetting | IIntegrationEntitySetting[]): Promise<IIntegrationEntitySetting[]>;
}
