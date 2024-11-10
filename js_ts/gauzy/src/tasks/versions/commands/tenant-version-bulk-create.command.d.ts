import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../../plugins/contracts/dist/index';
export declare class TenantVersionBulkCreateCommand implements ICommand {
    readonly tenants: ITenant[];
    static readonly type = "[Tenant Version] Bulk Create";
    constructor(tenants: ITenant[]);
}
