import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IIntegrationMap } from '../../../../plugins/contracts/dist/index';
import { IntegrationMapSyncScreenshotCommand } from '../integration-map.sync-screenshot.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncScreenshotHandler implements ICommandHandler<IntegrationMapSyncScreenshotCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService);
    /**
     * Third party screenshot integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncScreenshotCommand): Promise<IIntegrationMap>;
}
