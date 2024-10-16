import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { ITag } from '../../../../plugins/contracts/dist/index';
import { TagService } from 'tags/tag.service';
import { IntegrationMapSyncLabelCommand } from './../integration-map.sync-label.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncLabelHandler implements ICommandHandler<IntegrationMapSyncLabelCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    private readonly _tagService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService, _tagService: TagService);
    /**
     * Execute the IntegrationMapSyncLabelCommand to sync GitHub labels and update tags.
     *
     * @param command - The IntegrationMapSyncLabelCommand containing the request data.
     * @returns A promise that resolves to the updated integration map.
     */
    execute(command: IntegrationMapSyncLabelCommand): Promise<ITag>;
}
