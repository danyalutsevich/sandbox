import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IntegrationMapSyncActivityCommand } from './../integration-map.sync-activity.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncActivityHandler implements ICommandHandler<IntegrationMapSyncActivityCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService);
    /**
     * Third party activity integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncActivityCommand): Promise<any>;
}
