import { BadRequestException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { ITenantSetting, IWasabiFileStorageProviderConfig } from '../../../plugins/contracts';
import { TenantSetting } from './tenant-setting.entity';
import { TenantAwareCrudService } from './../../core/crud';
import { TypeOrmTenantSettingRepository } from './repository/type-orm-tenant-setting.repository';
import { MikroOrmTenantSettingRepository } from './repository/mikro-orm-tenant-setting.repository';
export declare class TenantSettingService extends TenantAwareCrudService<TenantSetting> {
    constructor(typeOrmTenantSettingRepository: TypeOrmTenantSettingRepository, mikroOrmTenantSettingRepository: MikroOrmTenantSettingRepository);
    /**
     *
     * @param request
     * @returns
     */
    get(request?: FindManyOptions): Promise<import("underscore").Dictionary<string>>;
    /**
     *
     * @param input
     * @param tenantId
     * @returns
     */
    saveSettings(input: ITenantSetting, tenantId: string): Promise<ITenantSetting>;
    /**
     * Verify Wasabi Configuration
     * @param entity - Configuration details for Wasabi
     * @returns Promise containing the verification status
     */
    verifyWasabiConfiguration(entity: IWasabiFileStorageProviderConfig): Promise<Object | BadRequestException>;
}
