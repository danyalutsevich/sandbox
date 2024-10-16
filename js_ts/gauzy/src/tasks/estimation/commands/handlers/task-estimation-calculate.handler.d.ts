import { ICommandHandler } from '@nestjs/cqrs';
import { TaskEstimationCalculateCommand } from '../task-estimation-calculate.command';
import { TaskEstimationService } from '../../task-estimation.service';
import { TaskService } from '../../../task.service';
export declare class TaskEstimationCalculateHandler implements ICommandHandler<TaskEstimationCalculateCommand> {
    private readonly _taskEstimationService;
    private readonly _taskService;
    constructor(_taskEstimationService: TaskEstimationService, _taskService: TaskService);
    execute(command: TaskEstimationCalculateCommand): Promise<void>;
}
