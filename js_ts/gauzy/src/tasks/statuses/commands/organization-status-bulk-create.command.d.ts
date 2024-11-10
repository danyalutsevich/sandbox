import { ICommand } from '@nestjs/cqrs';
import { IOrganization } from '../../../../plugins/contracts/dist/index';
export declare class OrganizationStatusBulkCreateCommand implements ICommand {
    readonly input: IOrganization;
    static readonly type = "[Organization Status] Bulk Create";
    constructor(input: IOrganization);
}
