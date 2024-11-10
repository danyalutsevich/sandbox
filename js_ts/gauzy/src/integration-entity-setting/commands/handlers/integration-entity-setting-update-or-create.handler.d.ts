import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationEntitySetting } from '../../../../plugins/contracts/dist/index';
import { IntegrationEntitySettingUpdateOrCreateCommand } from '../integration-entity-setting-update-or-create.command';
import { IntegrationEntitySettingService } from '../../integration-entity-setting.service';
import { IntegrationTenantService } from '../../../integration-tenant/integration-tenant.service';
export declare class IntegrationEntitySettingUpdateOrCreateHandler implements ICommandHandler<IntegrationEntitySettingUpdateOrCreateCommand> {
    private readonly _integrationEntitySettingService;
    private readonly _integrationTenantService;
    constructor(_integrationEntitySettingService: IntegrationEntitySettingService, _integrationTenantService: IntegrationTenantService);
    /**
     * Execute the update command for integration entity settings.
     *
     * @param command - The IntegrationEntitySettingUpdateOrCreateCommand containing the input and integrationId.
     * @returns A promise resolving to an array of updated or created integration entity settings.
     */
    execute(command: IntegrationEntitySettingUpdateOrCreateCommand): Promise<IIntegrationEntitySetting[]>;
}
