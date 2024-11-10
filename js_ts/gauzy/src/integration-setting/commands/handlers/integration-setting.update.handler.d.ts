import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationSetting } from '../../../../plugins/contracts/dist/index';
import { IntegrationSettingUpdateCommand } from '../integration-setting.update.command';
import { IntegrationSettingService } from '../../integration-setting.service';
export declare class IntegrationSettingUpdateHandler implements ICommandHandler<IntegrationSettingUpdateCommand> {
    private readonly _integrationSettingService;
    constructor(_integrationSettingService: IntegrationSettingService);
    /**
     * Execute the IntegrationSettingUpdateCommand to bulk update or create integration settings.
     *
     * @param command - The IntegrationSettingUpdateCommand containing the input settings and integration ID.
     * @returns {Promise<IIntegrationSetting[]>} - A promise that resolves with an array of updated or created integration settings.
     */
    execute(command: IntegrationSettingUpdateCommand): Promise<IIntegrationSetting[]>;
}
