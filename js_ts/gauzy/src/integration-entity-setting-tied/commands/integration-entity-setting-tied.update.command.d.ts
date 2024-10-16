import { ICommand } from '@nestjs/cqrs';
import { IIntegrationEntitySettingTied, IIntegrationTenant } from '../../../plugins/contracts';
export declare class IntegrationEntitySettingTiedUpdateCommand implements ICommand {
    readonly integrationId: IIntegrationTenant['id'];
    readonly input: IIntegrationEntitySettingTied | IIntegrationEntitySettingTied[];
    static readonly type = "[Integration Entity Setting Tied] Update By Integration";
    constructor(integrationId: IIntegrationTenant['id'], input: IIntegrationEntitySettingTied | IIntegrationEntitySettingTied[]);
}
