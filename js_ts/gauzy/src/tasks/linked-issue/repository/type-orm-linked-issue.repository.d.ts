import { Repository } from 'typeorm';
import { TaskLinkedIssue } from '../task-linked-issue.entity';
export declare class TypeOrmTaskLinkedIssueRepository extends Repository<TaskLinkedIssue> {
    readonly repository: Repository<TaskLinkedIssue>;
    constructor(repository: Repository<TaskLinkedIssue>);
}
