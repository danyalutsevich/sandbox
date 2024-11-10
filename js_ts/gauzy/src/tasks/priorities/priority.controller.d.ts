import { IPagination, ITaskPriority } from '../../../plugins/contracts';
import { TaskPriority } from './priority.entity';
import { TaskPriorityService } from './priority.service';
import { TaskPriorityQueryDTO } from './dto';
declare const TaskPriorityController_base: import("../../../plugins/common/dist").Type<import("../../core/crud").ICrudController<TaskPriority>>;
export declare class TaskPriorityController extends TaskPriorityController_base {
    protected readonly taskPriorityService: TaskPriorityService;
    constructor(taskPriorityService: TaskPriorityService);
    /**
     * GET task priorities by filters
     * If parameters not match, retrieve global task priorities
     *
     * @param params
     * @returns
     */
    fetchAll(params: TaskPriorityQueryDTO): Promise<IPagination<ITaskPriority>>;
}
export {};
