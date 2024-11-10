import { QueryBus } from '@nestjs/cqrs';
import { IPagination, ITaskRelatedIssueType } from '../../../plugins/contracts';
import { TaskRelatedIssueTypeService } from './related-issue-type.service';
import { TaskRelatedIssueType } from './related-issue-type.entity';
import { RelatedIssueTypeQueryDTO } from './dto';
declare const TaskRelatedIssueTypeController_base: import("../../../plugins/common/dist").Type<import("../../core/crud").ICrudController<TaskRelatedIssueType>>;
export declare class TaskRelatedIssueTypeController extends TaskRelatedIssueTypeController_base {
    private readonly queryBus;
    protected readonly TaskRelatedIssueTypeService: TaskRelatedIssueTypeService;
    constructor(queryBus: QueryBus, TaskRelatedIssueTypeService: TaskRelatedIssueTypeService);
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
     *
     * @param params
     * @returns
     */
    findTaskRelatedIssueType(params: RelatedIssueTypeQueryDTO): Promise<IPagination<ITaskRelatedIssueType>>;
}
export {};
