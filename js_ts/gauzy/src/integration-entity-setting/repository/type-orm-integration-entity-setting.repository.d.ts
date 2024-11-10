import { Repository } from 'typeorm';
import { IntegrationEntitySetting } from '../integration-entity-setting.entity';
export declare class TypeOrmIntegrationEntitySettingRepository extends Repository<IntegrationEntitySetting> {
    readonly repository: Repository<IntegrationEntitySetting>;
    constructor(repository: Repository<IntegrationEntitySetting>);
}
