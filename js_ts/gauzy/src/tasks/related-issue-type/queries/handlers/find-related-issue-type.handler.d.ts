import { IQueryHandler } from '@nestjs/cqrs';
import { IPagination, ITaskRelatedIssueType } from '../../../../../plugins/contracts/dist/index';
import { TaskRelatedIssueTypeService } from '../../related-issue-type.service';
import { FindRelatedIssueTypesQuery } from '../find-related-issue-type.query';
export declare class FindRelatedIssueTypesHandler implements IQueryHandler<FindRelatedIssueTypesQuery> {
    private readonly TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice: TaskRelatedIssueTypeService);
    /**
     *
     * @param query
     * @returns
     */
    execute(query: FindRelatedIssueTypesQuery): Promise<IPagination<ITaskRelatedIssueType>>;
}
