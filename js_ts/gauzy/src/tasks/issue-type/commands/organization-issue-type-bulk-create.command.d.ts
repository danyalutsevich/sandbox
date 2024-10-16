import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationIssueTypeBulkCreateCommand implements ICommand {
    readonly input: IOrganization;
    static readonly type = "[Organization] Issue Type Bulk Create";
    constructor(input: IOrganization);
}
