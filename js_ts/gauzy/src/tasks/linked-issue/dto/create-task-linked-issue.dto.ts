import { ITaskLinkedIssueCreateInput } from '../../../../plugins/contracts/dist/index';
import { TaskLinkedIssueDTO } from './task-linked-issue.dto';

export class CreateTaskLinkedIssueDTO extends TaskLinkedIssueDTO implements ITaskLinkedIssueCreateInput { }
