import { IQuery } from '@nestjs/cqrs';
import { ITaskStatusFindInput } from '../../../../plugins/contracts/dist/index';
export declare class FindRelatedIssueTypesQuery implements IQuery {
    readonly options: ITaskStatusFindInput;
    static readonly type = "[Task RelatedIssueTypes] Query All";
    constructor(options: ITaskStatusFindInput);
}
