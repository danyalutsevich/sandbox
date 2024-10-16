import { ICommand } from '@nestjs/cqrs';
import { IIntegrationTenant, IIntegrationTenantUpdateInput } from '../../../plugins/contracts';
export declare class IntegrationTenantUpdateCommand implements ICommand {
    readonly id: IIntegrationTenant['id'];
    readonly input: IIntegrationTenantUpdateInput;
    static readonly type = "[Integration] Update Integration";
    constructor(id: IIntegrationTenant['id'], input: IIntegrationTenantUpdateInput);
}
