import { Repository } from 'typeorm';
import { IntegrationEntitySettingTied } from '../integration-entity-setting-tied.entity';
export declare class TypeOrmIntegrationEntitySettingTiedRepository extends Repository<IntegrationEntitySettingTied> {
    readonly repository: Repository<IntegrationEntitySettingTied>;
    constructor(repository: Repository<IntegrationEntitySettingTied>);
}
