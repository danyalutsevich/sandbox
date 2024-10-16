import { ICommand } from '@nestjs/cqrs';
import { ITenant } from '../../../plugins/contracts';
export declare class TenantRoleBulkCreateCommand implements ICommand {
    readonly input: ITenant[];
    static readonly type = "[Role] Bulk Create";
    constructor(input: ITenant[]);
}
