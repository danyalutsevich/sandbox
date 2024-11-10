import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IntegrationMapSyncProjectCommand } from './../integration-map.sync-project.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncProjectHandler implements ICommandHandler<IntegrationMapSyncProjectCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService);
    /**
     * Third party organization project integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncProjectCommand): Promise<any>;
}
