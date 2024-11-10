import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationTenant } from '../../../../plugins/contracts/dist/index';
import { IntegrationTenantService } from '../../integration-tenant.service';
import { IntegrationTenantUpdateOrCreateCommand } from '../integration-tenant-update-or-create.command';
export declare class IntegrationTenantUpdateOrCreateHandler implements ICommandHandler<IntegrationTenantUpdateOrCreateCommand> {
    private readonly _commandBus;
    private readonly _integrationTenantService;
    constructor(_commandBus: CommandBus, _integrationTenantService: IntegrationTenantService);
    /**
     * Execute the IntegrationTenantUpdateOrCreateCommand to update or create an integration tenant.
     *
     * @param command - The IntegrationTenantUpdateOrCreateCommand containing the options and input data.
     * @returns {Promise<IIntegrationTenant>} - A promise that resolves with the updated or newly created integration tenant.
     */
    execute(command: IntegrationTenantUpdateOrCreateCommand): Promise<IIntegrationTenant>;
}
