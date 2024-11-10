import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskEstimation, ITaskEstimationUpdateInput } from '../../../../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { TaskEstimationService } from '../../task-estimation.service';
import { TaskEstimationUpdateCommand } from '../task-estimation-update.command';
export declare class TaskEstimationUpdateHandler implements ICommandHandler<TaskEstimationUpdateCommand> {
    private readonly _taskEstimationService;
    private readonly commandBus;
    constructor(_taskEstimationService: TaskEstimationService, commandBus: CommandBus);
    execute(command: TaskEstimationUpdateCommand): Promise<ITaskEstimation>;
    /**
     * Update task, if already exist
     *
     * @param id
     * @param request
     * @returns
     */
    update(id: string, request: ITaskEstimationUpdateInput): Promise<ITaskEstimation>;
}
