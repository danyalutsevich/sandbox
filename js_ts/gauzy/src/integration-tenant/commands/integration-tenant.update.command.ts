import { ICommand } from '@nestjs/cqrs';
import { IIntegrationTenant, IIntegrationTenantUpdateInput } from '../../../plugins/contracts';

export class IntegrationTenantUpdateCommand implements ICommand {
    static readonly type = '[Integration] Update Integration';

    constructor(
        public readonly id: IIntegrationTenant['id'],
        public readonly input: IIntegrationTenantUpdateInput
    ) { }
}
