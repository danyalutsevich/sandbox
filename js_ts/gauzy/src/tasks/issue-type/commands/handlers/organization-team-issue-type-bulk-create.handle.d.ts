import { ICommandHandler } from '@nestjs/cqrs';
import { IIssueType } from '../../../../../plugins/contracts/dist/index';
import { OrganizationTeamIssueTypeBulkCreateCommand } from './../organization-team-issue-type-bulk-create.command';
import { IssueTypeService } from './../../issue-type.service';
export declare class OrganizationTeamIssueTypeBulkCreateHandler implements ICommandHandler<OrganizationTeamIssueTypeBulkCreateCommand> {
    private readonly issueTypeService;
    constructor(issueTypeService: IssueTypeService);
    execute(command: OrganizationTeamIssueTypeBulkCreateCommand): Promise<IIssueType[]>;
}
