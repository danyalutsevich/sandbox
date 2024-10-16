import { CommandBus } from '@nestjs/cqrs';
import { ITaskEstimation } from '../../../plugins/contracts';
import { TaskEstimation } from './task-estimation.entity';
import { TaskEstimationService } from './task-estimation.service';
import { CrudController } from './../../core/crud';
import { CreateTaskEstimationDTO, UpdateTaskEstimationDTO } from './dto';
import { DeleteResult } from 'typeorm';
export declare class TaskEstimationController extends CrudController<TaskEstimation> {
    protected readonly taskEstimationService: TaskEstimationService;
    private readonly commandBus;
    constructor(taskEstimationService: TaskEstimationService, commandBus: CommandBus);
    /**
     * Create new Linked Issue
     *
     * @param entity
     * @returns
     */
    create(entity: CreateTaskEstimationDTO): Promise<ITaskEstimation>;
    update(id: ITaskEstimation['id'], entity: UpdateTaskEstimationDTO): Promise<ITaskEstimation>;
    delete(id: ITaskEstimation['id']): Promise<DeleteResult>;
}
