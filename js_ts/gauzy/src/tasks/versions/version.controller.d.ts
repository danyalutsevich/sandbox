import { QueryBus } from '@nestjs/cqrs';
import { IPagination, ITaskVersion } from '../../../plugins/contracts';
import { TaskVersionService } from './version.service';
import { TaskVersion } from './version.entity';
import { VersionQueryDTO } from './dto';
declare const TaskVersionController_base: import("../../../plugins/common/dist").Type<import("../../core/crud").ICrudController<TaskVersion>>;
export declare class TaskVersionController extends TaskVersionController_base {
    private readonly queryBus;
    protected readonly taskVersionService: TaskVersionService;
    constructor(queryBus: QueryBus, taskVersionService: TaskVersionService);
    /**
     * GET versions by filters
     * If parameters not match, retrieve global versions
     *
     * @param params
     * @returns
     */
    findTaskVersions(params: VersionQueryDTO): Promise<IPagination<ITaskVersion>>;
}
export {};
