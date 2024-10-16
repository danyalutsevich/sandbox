import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationProjectIssueTypeBulkCreateCommand implements ICommand {
    readonly input: IOrganizationProject;
    static readonly type = "[Organization Project] Issue Type Bulk Create";
    constructor(input: IOrganizationProject);
}
