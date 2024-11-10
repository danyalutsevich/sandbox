import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IntegrationMapSyncTimeLogCommand } from '../integration-map.sync-time-log.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncTimeLogHandler implements ICommandHandler<IntegrationMapSyncTimeLogCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService);
    /**
     * Third party timeslot integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncTimeLogCommand): Promise<any>;
}
