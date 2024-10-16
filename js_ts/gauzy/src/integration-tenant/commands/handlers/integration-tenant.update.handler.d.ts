import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationTenant, IIntegrationTenantUpdateInput } from '../../../../plugins/contracts/dist/index';
import { IntegrationTenantUpdateCommand } from '../../commands';
import { IntegrationTenantService } from '../../integration-tenant.service';
import { IntegrationTenant } from '../../integration-tenant.entity';
export declare class IntegrationTenantUpdateHandler implements ICommandHandler<IntegrationTenantUpdateCommand> {
    private readonly _commandBus;
    private readonly _integrationTenantService;
    constructor(_commandBus: CommandBus, _integrationTenantService: IntegrationTenantService);
    execute(command: IntegrationTenantUpdateCommand): Promise<IntegrationTenant>;
    /**
     * Update an integration tenant with the provided data.
     * @param id The ID of the integration tenant to update.
     * @param request The data to update the integration tenant.
     * @returns A promise that resolves to the updated integration tenant.
     */
    update(integrationId: IIntegrationTenant['id'], request: IIntegrationTenantUpdateInput): Promise<IIntegrationTenant>;
}
