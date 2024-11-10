import { ICommand } from '@nestjs/cqrs';
import { ITenantCreateInput } from '../../../plugins/contracts';
export declare class GauzyCloudTenantMigrateCommand implements ICommand {
    readonly input: ITenantCreateInput;
    readonly token: string;
    static readonly type = "[Gauzy Cloud] Tenant Migrate";
    constructor(input: ITenantCreateInput, token: string);
}
