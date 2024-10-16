import { ICommand } from '@nestjs/cqrs';
import { IIntegrationTenant, IIntegrationTenantFindInput } from '../../../plugins/contracts';
export declare class IntegrationTenantDeleteCommand implements ICommand {
    readonly id: IIntegrationTenant['id'];
    readonly options: IIntegrationTenantFindInput;
    static readonly type = "[Integration] Delete Integration";
    constructor(id: IIntegrationTenant['id'], options: IIntegrationTenantFindInput);
}
