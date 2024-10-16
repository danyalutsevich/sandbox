import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationProjectTaskSizeBulkCreateCommand implements ICommand {
    readonly input: IOrganizationProject;
    static readonly type = "[Organization Project] Task Size Bulk Create";
    constructor(input: IOrganizationProject);
}
