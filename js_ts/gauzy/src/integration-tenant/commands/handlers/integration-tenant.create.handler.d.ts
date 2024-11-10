import { ICommandHandler } from '@nestjs/cqrs';
import { IntegrationTenantCreateCommand } from '../../commands/integration-tenant.create.command';
import { IntegrationTenantService } from '../../integration-tenant.service';
import { IntegrationTenant } from '../../integration-tenant.entity';
export declare class IntegrationTenantCreateHandler implements ICommandHandler<IntegrationTenantCreateCommand> {
    private readonly _integrationTenantService;
    constructor(_integrationTenantService: IntegrationTenantService);
    execute(command: IntegrationTenantCreateCommand): Promise<IntegrationTenant>;
}
