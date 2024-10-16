import { ICommand } from '@nestjs/cqrs';
import { IIntegrationTenantCreateInput } from '../../../plugins/contracts';
export declare class IntegrationTenantCreateCommand implements ICommand {
    readonly input: IIntegrationTenantCreateInput;
    static readonly type = "[Integration] Create Integration";
    constructor(input: IIntegrationTenantCreateInput);
}
