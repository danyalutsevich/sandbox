import { Repository } from 'typeorm';
import { TenantSetting } from '../tenant-setting.entity';
export declare class TypeOrmTenantSettingRepository extends Repository<TenantSetting> {
    readonly repository: Repository<TenantSetting>;
    constructor(repository: Repository<TenantSetting>);
}
