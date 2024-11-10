import { Repository } from 'typeorm';
import { IntegrationSetting } from '../integration-setting.entity';
export declare class TypeOrmIntegrationSettingRepository extends Repository<IntegrationSetting> {
    readonly repository: Repository<IntegrationSetting>;
    constructor(repository: Repository<IntegrationSetting>);
}
