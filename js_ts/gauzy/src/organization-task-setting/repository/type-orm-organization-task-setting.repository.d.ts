import { Repository } from 'typeorm';
import { OrganizationTaskSetting } from '../organization-task-setting.entity';
export declare class TypeOrmOrganizationTaskSettingRepository extends Repository<OrganizationTaskSetting> {
    readonly repository: Repository<OrganizationTaskSetting>;
    constructor(repository: Repository<OrganizationTaskSetting>);
}
