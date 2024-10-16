import { ITaskLinkedIssueUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TaskLinkedIssueDTO } from './task-linked-issue.dto';

export class UpdateTaskLinkedIssueDTO extends TaskLinkedIssueDTO implements ITaskLinkedIssueUpdateInput { }
