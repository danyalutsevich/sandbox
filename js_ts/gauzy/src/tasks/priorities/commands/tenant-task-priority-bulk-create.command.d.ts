import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';
export declare class TenantTaskPriorityBulkCreateCommand implements ICommand {
    readonly tenants: ITenant[];
    static readonly type = "[Tenant] Task Priority Bulk Create";
    constructor(tenants: ITenant[]);
}
