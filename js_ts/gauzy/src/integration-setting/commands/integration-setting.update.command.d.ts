import { ICommand } from '@nestjs/cqrs';
import { IIntegrationSetting, IIntegrationTenant } from '../../../plugins/contracts';
export declare class IntegrationSettingUpdateCommand implements ICommand {
    readonly integrationId: IIntegrationTenant['id'];
    readonly input: IIntegrationSetting | IIntegrationSetting[];
    static readonly type = "[Integration Setting] Update";
    constructor(integrationId: IIntegrationTenant['id'], input: IIntegrationSetting | IIntegrationSetting[]);
}
