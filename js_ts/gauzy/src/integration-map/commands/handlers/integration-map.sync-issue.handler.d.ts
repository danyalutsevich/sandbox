import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { IIntegrationMap } from '../../../../plugins/contracts/dist/index';
import { TaskService } from 'tasks/task.service';
import { IntegrationMapSyncIssueCommand } from './../integration-map.sync-issue.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncIssueHandler implements ICommandHandler<IntegrationMapSyncIssueCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    private readonly _taskService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService, _taskService: TaskService);
    /**
     * Execute the IntegrationMapSyncIssueCommand to sync GitHub issues and update tasks.
     *
     * @param command - The IntegrationMapSyncIssueCommand containing the request data.
     * @returns A promise that resolves to the updated integration map.
     */
    execute(command: IntegrationMapSyncIssueCommand): Promise<IIntegrationMap>;
}
