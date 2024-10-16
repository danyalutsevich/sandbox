import { ICommandHandler } from '@nestjs/cqrs';
import { IntegrationMapSyncEntityCommand } from '..';
import { IntegrationMapService } from '../../integration-map.service';
import { IntegrationMap } from '../../integration-map.entity';
export declare class IntegrationMapSyncEntityHandler implements ICommandHandler<IntegrationMapSyncEntityCommand> {
    private readonly _integrationMapService;
    constructor(_integrationMapService: IntegrationMapService);
    execute(command: IntegrationMapSyncEntityCommand): Promise<IntegrationMap>;
}
