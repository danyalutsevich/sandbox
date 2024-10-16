import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationProjectRelatedIssueTypeBulkCreateCommand implements ICommand {
    readonly input: IOrganizationProject;
    static readonly type = "[Organization Project] Task RelatedIssueType Bulk Create";
    constructor(input: IOrganizationProject);
}
