import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IntegrationMapSyncOrganizationCommand } from './../integration-map.sync-organization.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncOrganizationHandler implements ICommandHandler<IntegrationMapSyncOrganizationCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService);
    /**
     * Third party organization integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncOrganizationCommand): Promise<any>;
}
