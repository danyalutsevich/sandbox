import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationTaskSizeBulkCreateCommand implements ICommand {
    readonly input: IOrganization;
    static readonly type = "[Organization] Task Size Bulk Create";
    constructor(input: IOrganization);
}
