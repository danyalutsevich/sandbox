import { ICommandHandler } from '@nestjs/cqrs';
import { IntegrationSettingCreateCommand } from '..';
import { IntegrationSettingService } from '../../integration-setting.service';
import { IIntegrationSetting } from '../../../../plugins/contracts/dist/index';
export declare class IntegrationSettingCreateHandler implements ICommandHandler<IntegrationSettingCreateCommand> {
    private readonly integrationSettingService;
    constructor(integrationSettingService: IntegrationSettingService);
    execute(command: IntegrationSettingCreateCommand): Promise<IIntegrationSetting>;
}
