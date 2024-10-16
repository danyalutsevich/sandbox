import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskRelatedIssueType } from '../../../../../plugins/contracts/dist/index';
import { OrganizationRelatedIssueTypeBulkCreateCommand } from '../organization-related-issue-type-bulk-create.command';
import { TaskRelatedIssueTypeService } from '../../related-issue-type.service';
import { TaskRelatedIssueType } from '../../related-issue-type.entity';
export declare class OrganizationRelatedIssueTypeBulkCreateHandler implements ICommandHandler<OrganizationRelatedIssueTypeBulkCreateCommand> {
    private readonly TaskRelatedIssueTypeervice;
    constructor(TaskRelatedIssueTypeervice: TaskRelatedIssueTypeService);
    execute(command: OrganizationRelatedIssueTypeBulkCreateCommand): Promise<ITaskRelatedIssueType[] | TaskRelatedIssueType[]>;
}
