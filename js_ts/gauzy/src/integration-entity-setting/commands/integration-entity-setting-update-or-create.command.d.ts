import { ICommand } from '@nestjs/cqrs';
import { IIntegrationEntitySetting, IIntegrationTenant } from '../../../plugins/contracts';
export declare class IntegrationEntitySettingUpdateOrCreateCommand implements ICommand {
    readonly integrationId: IIntegrationTenant['id'];
    readonly input: IIntegrationEntitySetting | IIntegrationEntitySetting[];
    static readonly type = "[Integration Entity Setting] Update Or Create By Integration";
    constructor(integrationId: IIntegrationTenant['id'], input: IIntegrationEntitySetting | IIntegrationEntitySetting[]);
}
