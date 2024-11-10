import { ICommandHandler } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { TaskEstimationService } from '../../task-estimation.service';
import { TaskEstimationDeleteCommand } from '../task-estimation-delete.command';
export declare class TaskEstimationDeleteHandler implements ICommandHandler<TaskEstimationDeleteCommand> {
    private readonly _taskEstimationService;
    private readonly commandBus;
    constructor(_taskEstimationService: TaskEstimationService, commandBus: CommandBus);
    execute(command: TaskEstimationDeleteCommand): Promise<import("typeorm").DeleteResult>;
    /**
     * Delete task estimation, if already exist
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
