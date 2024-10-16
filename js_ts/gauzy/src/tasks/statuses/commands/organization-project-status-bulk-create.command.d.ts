import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationProjectStatusBulkCreateCommand implements ICommand {
    readonly input: IOrganizationProject;
    static readonly type = "[Organization Project] Task Status Bulk Create";
    constructor(input: IOrganizationProject);
}
