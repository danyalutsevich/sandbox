import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationRelatedIssueTypeBulkCreateCommand implements ICommand {
    readonly input: IOrganization;
    static readonly type = "[Organization RelatedIssueType] Bulk Create";
    constructor(input: IOrganization);
}
