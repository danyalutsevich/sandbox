import { IIntegrationTenant } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class IntegrationEntitySettingGetCommand implements ICommand {
    readonly integrationId: IIntegrationTenant['id'];
    static readonly type = "[Integration Entity Setting] Get By Integration";
    constructor(integrationId: IIntegrationTenant['id']);
}
