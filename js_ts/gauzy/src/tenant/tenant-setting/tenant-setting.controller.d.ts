import { CommandBus } from '@nestjs/cqrs';
import { ITenantSetting } from '../../../plugins/contracts';
import { CrudController } from '../../core/crud';
import { TenantSetting } from './tenant-setting.entity';
import { TenantSettingService } from './tenant-setting.service';
import { CreateTenantSettingDTO, WasabiS3ProviderConfigDTO } from './dto';
export declare class TenantSettingController extends CrudController<TenantSetting> {
    private readonly tenantSettingService;
    private readonly commandBus;
    constructor(tenantSettingService: TenantSettingService, commandBus: CommandBus);
    getSettings(): Promise<any>;
    saveSettings(entity: CreateTenantSettingDTO): Promise<ITenantSetting>;
    validateWasabiConfiguration(entity: WasabiS3ProviderConfigDTO): Promise<void | any>;
}
