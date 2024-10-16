import { ICommandHandler } from '@nestjs/cqrs';
import { TenantSettingGetCommand } from '../tenant-setting.get.command';
import { TenantSettingService } from './../../tenant-setting.service';
export declare class TenantSettingGetHandler implements ICommandHandler<TenantSettingGetCommand> {
    private readonly _tenantSettingService;
    constructor(_tenantSettingService: TenantSettingService);
    execute(): Promise<any>;
}
