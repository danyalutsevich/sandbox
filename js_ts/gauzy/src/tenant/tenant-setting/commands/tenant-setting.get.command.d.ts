import { ICommand } from '@nestjs/cqrs';
export declare class TenantSettingGetCommand implements ICommand {
    static readonly type = "[Tenant] Setting Get";
    constructor();
}
