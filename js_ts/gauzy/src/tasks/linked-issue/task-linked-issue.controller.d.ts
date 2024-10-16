import { ITaskLinkedIssue } from '../../../plugins/contracts';
import { CrudController } from '../../core/crud';
import { TaskLinkedIssue } from './task-linked-issue.entity';
import { TaskLinkedIssueService } from './task-linked-issue.service';
import { CreateTaskLinkedIssueDTO, UpdateTaskLinkedIssueDTO } from './dto';
export declare class TaskLinkedIssueController extends CrudController<TaskLinkedIssue> {
    protected readonly taskLinkedIssueService: TaskLinkedIssueService;
    constructor(taskLinkedIssueService: TaskLinkedIssueService);
    /**
     * Create new Linked Issue
     *
     * @param entity
     * @returns
     */
    create(entity: CreateTaskLinkedIssueDTO): Promise<ITaskLinkedIssue>;
    /**
     * Update existing Linked Issue
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ITaskLinkedIssue['id'], entity: UpdateTaskLinkedIssueDTO): Promise<ITaskLinkedIssue>;
}
