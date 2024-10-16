import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationSetting } from '../../../../plugins/contracts/dist/index';
import { IntegrationSettingGetManyCommand } from './../integration-setting.getMany.command';
import { IntegrationSettingService } from '../../integration-setting.service';
export declare class IntegrationSettingGetManyHandler implements ICommandHandler<IntegrationSettingGetManyCommand> {
    private readonly _integrationSettingService;
    constructor(_integrationSettingService: IntegrationSettingService);
    /**
     * Executes a command to retrieve multiple integration settings.
     *
     * @param command - The command to execute for retrieving integration settings.
     * @returns A Promise that resolves to an array of integration settings.
     */
    execute(command: IntegrationSettingGetManyCommand): Promise<IIntegrationSetting[]>;
}
