import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskRelatedIssueType } from '../../../../../plugins/contracts/dist/index';
import { OrganizationProjectRelatedIssueTypeBulkCreateCommand } from '../organization-project-related-issue-type-bulk-create.command';
import { TaskRelatedIssueTypeService } from '../../related-issue-type.service';
import { TaskRelatedIssueType } from '../../related-issue-type.entity';
export declare class OrganizationProjectRelatedIssueTypeBulkCreateHandler implements ICommandHandler<OrganizationProjectRelatedIssueTypeBulkCreateCommand> {
    private readonly TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice: TaskRelatedIssueTypeService);
    execute(command: OrganizationProjectRelatedIssueTypeBulkCreateCommand): Promise<ITaskRelatedIssueType[] & TaskRelatedIssueType[]>;
}
