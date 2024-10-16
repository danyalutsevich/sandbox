import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IIssueType } from '../../../../../plugins/contracts/dist/index';;
import { OrganizationIssueTypeBulkCreateCommand } from '../organization-issue-type-bulk-create.command';
import { IssueTypeService } from './../../issue-type.service';

@CommandHandler(OrganizationIssueTypeBulkCreateCommand)
export class OrganizationIssueTypeBulkCreateHandler
	implements ICommandHandler<OrganizationIssueTypeBulkCreateCommand>
{
	constructor(private readonly issueTypeService: IssueTypeService) {}

	public async execute(
		command: OrganizationIssueTypeBulkCreateCommand
	): Promise<IIssueType[]> {
		const { input } = command;

		// Create issue types of the organization.
		return await this.issueTypeService.bulkCreateOrganizationIssueType(
			input
		);
	}
}
