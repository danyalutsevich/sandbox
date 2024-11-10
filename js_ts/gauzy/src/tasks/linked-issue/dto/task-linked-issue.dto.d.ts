import { TaskRelatedIssuesRelationEnum } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
export declare class TaskLinkedIssueDTO extends TenantOrganizationBaseDTO {
    action: TaskRelatedIssuesRelationEnum;
    taskFromId: string;
    taskToId: string;
}
