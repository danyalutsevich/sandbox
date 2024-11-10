import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationMap, IOrganization, IOrganizationProject, ITask, ITaskCreateInput, ITaskUpdateInput } from '../../../../plugins/contracts/dist/index';
import { AutomationTaskSyncCommand } from './../automation-task.sync.command';
import { TaskService } from './../../task.service';
import { TypeOrmIntegrationMapRepository } from '../../../integration-map/repository/type-orm-integration-map.repository';
import { TypeOrmTaskStatusRepository } from 'tasks/statuses/repository/type-orm-task-status.repository';
import { TypeOrmTaskRepository } from 'tasks/repository/type-orm-task.repository';
export declare class AutomationTaskSyncHandler implements ICommandHandler<AutomationTaskSyncCommand> {
    private readonly typeOrmTaskRepository;
    private readonly typeOrmTaskStatusRepository;
    private readonly typeOrmIntegrationMapRepository;
    private readonly _taskService;
    constructor(typeOrmTaskRepository: TypeOrmTaskRepository, typeOrmTaskStatusRepository: TypeOrmTaskStatusRepository, typeOrmIntegrationMapRepository: TypeOrmIntegrationMapRepository, _taskService: TaskService);
    execute(command: AutomationTaskSyncCommand): Promise<IIntegrationMap>;
    /**
     * Creates a new task within a project.
     *
     * @param options - An object containing parameters for task creation.
     * @returns A Promise that resolves to the newly created task.
     */
    createTask(options: {
        projectId: IOrganizationProject['id'];
        organizationId: IOrganization['id'];
        tenantId: IOrganization['tenantId'];
    }, entity: ITaskCreateInput | ITaskUpdateInput): Promise<ITask>;
    /**
     * Updates a task with new data.
     *
     * @param id - The ID of the task to update.
     * @param entity - The new data for the task.
     * @returns A Promise that resolves to the updated task.
     */
    updateTask(id: ITaskUpdateInput['id'], entity: ITaskUpdateInput): Promise<ITask>;
}
