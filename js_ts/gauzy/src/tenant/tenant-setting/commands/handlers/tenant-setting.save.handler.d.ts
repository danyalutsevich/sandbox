import { ICommandHandler } from '@nestjs/cqrs';
import { TenantSettingService } from './../../tenant-setting.service';
import { TenantSettingSaveCommand } from '../tenant-setting.save.command';
export declare class TenantSettingSaveHandler implements ICommandHandler<TenantSettingSaveCommand> {
    private readonly _tenantSettingService;
    constructor(_tenantSettingService: TenantSettingService);
    /**
     * Executes a command to save tenant settings. Delegates to _tenantSettingService,
     * using the current tenant ID from RequestContext or the one provided in the command.
     *
     * @param command A TenantSettingSaveCommand object with settings and tenant ID.
     * @returns The result of the save operation from _tenantSettingService.
     */
    execute(command: TenantSettingSaveCommand): Promise<import("../../../../../plugins/contracts/dist").ITenantSetting>;
}
