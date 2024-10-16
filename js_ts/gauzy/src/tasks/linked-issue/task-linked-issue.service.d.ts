import { TaskLinkedIssue } from './task-linked-issue.entity';
import { TenantAwareCrudService } from '../../core/crud';
import { MikroOrmTaskLinkedIssueRepository } from './repository/mikro-orm-linked-issue.repository';
import { TypeOrmTaskLinkedIssueRepository } from './repository/type-orm-linked-issue.repository';
export declare class TaskLinkedIssueService extends TenantAwareCrudService<TaskLinkedIssue> {
    constructor(typeOrmTaskLinkedIssueRepository: TypeOrmTaskLinkedIssueRepository, mikroOrmTaskLinkedIssueRepository: MikroOrmTaskLinkedIssueRepository);
}
