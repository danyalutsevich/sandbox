import { Repository } from 'typeorm';
import { TaskRelatedIssueType } from '../related-issue-type.entity';
export declare class TypeOrmTaskRelatedIssueTypeRepository extends Repository<TaskRelatedIssueType> {
    readonly repository: Repository<TaskRelatedIssueType>;
    constructor(repository: Repository<TaskRelatedIssueType>);
}
