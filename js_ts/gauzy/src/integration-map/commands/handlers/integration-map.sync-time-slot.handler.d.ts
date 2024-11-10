import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IntegrationMapSyncTimeSlotCommand } from '../integration-map.sync-time-slot.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncTimeSlotHandler implements ICommandHandler<IntegrationMapSyncTimeSlotCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService);
    /**
     * Third party timeslot integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncTimeSlotCommand): Promise<any>;
}
