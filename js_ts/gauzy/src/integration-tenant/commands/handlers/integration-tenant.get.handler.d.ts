import { ICommandHandler } from '@nestjs/cqrs';
import { IntegrationTenantGetCommand } from '../../../integration-tenant/commands/integration-tenant.get.command';
import { IntegrationTenantService } from '../../../integration-tenant/integration-tenant.service';
import { IntegrationTenant } from '../../../integration-tenant/integration-tenant.entity';
export declare class IntegrationTenantGetHandler implements ICommandHandler<IntegrationTenantGetCommand> {
    private readonly _integrationTenantService;
    constructor(_integrationTenantService: IntegrationTenantService);
    execute(command: IntegrationTenantGetCommand): Promise<IntegrationTenant>;
}
