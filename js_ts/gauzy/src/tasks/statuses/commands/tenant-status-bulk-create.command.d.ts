import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';
export declare class TenantStatusBulkCreateCommand implements ICommand {
    readonly tenants: ITenant[];
    static readonly type = "[Tenant Status] Bulk Create";
    constructor(tenants: ITenant[]);
}
