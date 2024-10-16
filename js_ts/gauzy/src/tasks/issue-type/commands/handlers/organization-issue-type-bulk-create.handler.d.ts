import { ICommandHandler } from '@nestjs/cqrs';
import { IIssueType } from '../../../../../plugins/contracts/dist/index';
import { OrganizationIssueTypeBulkCreateCommand } from '../organization-issue-type-bulk-create.command';
import { IssueTypeService } from './../../issue-type.service';
export declare class OrganizationIssueTypeBulkCreateHandler implements ICommandHandler<OrganizationIssueTypeBulkCreateCommand> {
    private readonly issueTypeService;
    constructor(issueTypeService: IssueTypeService);
    execute(command: OrganizationIssueTypeBulkCreateCommand): Promise<IIssueType[]>;
}
