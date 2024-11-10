import { QueryBus } from '@nestjs/cqrs';
import { IPagination, ITaskStatus } from '../../../plugins/contracts';
import { TaskStatusService } from './status.service';
import { TaskStatus } from './status.entity';
import { StatusQueryDTO } from './dto';
import { ReorderRequestDTO } from './dto/reorder.dto';
declare const TaskStatusController_base: import("../../../plugins/common/dist").Type<import("./../../core/crud").ICrudController<TaskStatus>>;
export declare class TaskStatusController extends TaskStatusController_base {
    private readonly queryBus;
    protected readonly taskStatusService: TaskStatusService;
    constructor(queryBus: QueryBus, taskStatusService: TaskStatusService);
    /**
     * Reorder records based on the given input.
     * @param request - ReorderRequestDTO containing the reorder instructions.
     * @returns A success message indicating that the reordering operation completed successfully.
     */
    reorder({ reorder }: ReorderRequestDTO): Promise<{
        success: boolean;
        list?: import("../../../plugins/contracts").IReorderDTO[];
    }>;
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
     *
     * @param params
     * @returns
     */
    findTaskStatuses(params: StatusQueryDTO): Promise<IPagination<ITaskStatus>>;
}
export {};
