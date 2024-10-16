import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { TaskService } from 'tasks/task.service';
import { IntegrationMapSyncTaskCommand } from './../integration-map.sync-task.command';
import { IntegrationMapService } from '../../integration-map.service';
export declare class IntegrationMapSyncTaskHandler implements ICommandHandler<IntegrationMapSyncTaskCommand> {
    private readonly _commandBus;
    private readonly _integrationMapService;
    private readonly _taskService;
    constructor(_commandBus: CommandBus, _integrationMapService: IntegrationMapService, _taskService: TaskService);
    /**
     * Third party project task integrated and mapped
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationMapSyncTaskCommand): Promise<any>;
}
