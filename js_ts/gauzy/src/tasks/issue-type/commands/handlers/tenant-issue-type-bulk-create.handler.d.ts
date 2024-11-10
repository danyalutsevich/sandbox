import { ICommandHandler } from '@nestjs/cqrs';
import { IIssueType } from '../../../../../plugins/contracts/dist/index';
import { TenantIssueTypeBulkCreateCommand } from '../tenant-issue-type-bulk-create.command';
import { IssueTypeService } from '../../issue-type.service';
export declare class TenantIssueTypeBulkCreateHandler implements ICommandHandler<TenantIssueTypeBulkCreateCommand> {
    private readonly issueTypeService;
    constructor(issueTypeService: IssueTypeService);
    /**
     *
     * @param command
     * @returns
     */
    execute(command: TenantIssueTypeBulkCreateCommand): Promise<IIssueType[]>;
}
