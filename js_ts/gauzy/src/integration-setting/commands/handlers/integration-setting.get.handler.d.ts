import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationSetting } from '../../../../plugins/contracts/dist/index';
import { IntegrationSettingGetCommand } from './../integration-setting.get.command';
import { IntegrationSettingService } from '../../integration-setting.service';
export declare class IntegrationSettingGetHandler implements ICommandHandler<IntegrationSettingGetCommand> {
    private readonly integrationSettingService;
    constructor(integrationSettingService: IntegrationSettingService);
    /**
     * Executes the 'IntegrationSettingGetCommand' to retrieve an integration setting.
     *
     * @param command - The 'IntegrationSettingGetCommand' containing the input for the query.
     * @returns A promise that resolves to an 'IIntegrationSetting' object.
     */
    execute(command: IntegrationSettingGetCommand): Promise<IIntegrationSetting>;
}
