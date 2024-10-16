import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ITask, ITaskUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TaskService } from '../../task.service';
import { TaskUpdateCommand } from '../task-update.command';
export declare class TaskUpdateHandler implements ICommandHandler<TaskUpdateCommand> {
    private readonly _eventBus;
    private readonly _taskService;
    private readonly logger;
    constructor(_eventBus: EventBus, _taskService: TaskService);
    execute(command: TaskUpdateCommand): Promise<ITask>;
    /**
     * Update task, if already exist
     *
     * @param id
     * @param request
     * @returns
     */
    update(id: ITask['id'], request: ITaskUpdateInput, triggeredEvent: boolean): Promise<ITask>;
}
