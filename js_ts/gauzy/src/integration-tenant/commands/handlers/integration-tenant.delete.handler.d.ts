import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IntegrationTenantService } from '../../integration-tenant.service';
import { IntegrationTenantDeleteCommand } from '../integration-tenant.delete.command';
import { DeleteResult } from 'typeorm';
export declare class IntegrationTenantDeleteHandler implements ICommandHandler<IntegrationTenantDeleteCommand> {
    private readonly _commandBus;
    private readonly _integrationTenantService;
    constructor(_commandBus: CommandBus, _integrationTenantService: IntegrationTenantService);
    /**
 * Execute the command to delete the integration tenant.
 * @param command - The IntegrationTenantDeleteCommand instance.
 */
    execute(command: IntegrationTenantDeleteCommand): Promise<DeleteResult>;
}
