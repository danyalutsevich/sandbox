import { ITaskEstimation } from '../../../../../plugins/contracts/dist/index';
import { ICommandHandler } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { TaskEstimationCreateCommand } from './../task-estimation-create.command';
import { TaskEstimationService } from '../../task-estimation.service';
export declare class TaskEstimationCreateHandler implements ICommandHandler<TaskEstimationCreateCommand> {
    private readonly _taskEstimationService;
    private readonly commandBus;
    constructor(_taskEstimationService: TaskEstimationService, commandBus: CommandBus);
    execute(command: TaskEstimationCreateCommand): Promise<ITaskEstimation>;
}
