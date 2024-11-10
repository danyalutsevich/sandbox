import { ICommand } from '@nestjs/cqrs';
import { ITenantSetting } from '../../../../plugins/contracts/dist/index';
export declare class TenantSettingSaveCommand implements ICommand {
    readonly input: ITenantSetting;
    readonly tenantId?: string;
    static readonly type = "[Tenant] Setting Save";
    constructor(input: ITenantSetting, tenantId?: string);
}
