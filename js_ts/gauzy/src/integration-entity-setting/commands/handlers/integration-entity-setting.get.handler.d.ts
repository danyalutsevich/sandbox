import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationEntitySetting, IPagination } from '../../../../plugins/contracts/dist/index';
import { IntegrationEntitySettingGetCommand } from './../integration-entity-setting.get.command';
import { IntegrationEntitySettingService } from './../../integration-entity-setting.service';
export declare class IntegrationEntitySettingGetHandler implements ICommandHandler<IntegrationEntitySettingGetCommand> {
    private readonly _integrationEntitySettingService;
    constructor(_integrationEntitySettingService: IntegrationEntitySettingService);
    /**
     * Execute the get command for integration entity settings.
     *
     * @param command - The IntegrationEntitySettingGetCommand containing the integrationId.
     * @returns A promise resolving to paginated integration entity settings.
     */
    execute(command: IntegrationEntitySettingGetCommand): Promise<IPagination<IIntegrationEntitySetting>>;
}
