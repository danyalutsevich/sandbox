import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ITask } from '../../../../plugins/contracts/dist/index';
import { OrganizationProjectService } from './../../../organization-project/organization-project.service';
import { TaskCreateCommand } from './../task-create.command';
import { TaskService } from '../../task.service';
export declare class TaskCreateHandler implements ICommandHandler<TaskCreateCommand> {
    private readonly _eventBus;
    private readonly _taskService;
    private readonly _organizationProjectService;
    private readonly logger;
    constructor(_eventBus: EventBus, _taskService: TaskService, _organizationProjectService: OrganizationProjectService);
    execute(command: TaskCreateCommand): Promise<ITask>;
}
