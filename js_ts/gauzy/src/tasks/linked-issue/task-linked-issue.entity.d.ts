import { ITask, ITaskLinkedIssue, TaskRelatedIssuesRelationEnum } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class TaskLinkedIssue extends TenantOrganizationBaseEntity implements ITaskLinkedIssue {
    action: TaskRelatedIssuesRelationEnum;
    taskFrom?: ITask;
    taskFromId: ITask['id'];
    /**
     * Task Linked Issues
     */
    taskTo?: ITask;
    taskToId: ITask['id'];
}
