import { IOrganizationTaskSetting, IOrganizationTaskSettingFindInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from '../core/crud';
import { OrganizationTaskSetting } from './organization-task-setting.entity';
import { MikroOrmOrganizationTaskSettingRepository, TypeOrmOrganizationTaskSettingRepository } from './repository';
export declare class OrganizationTaskSettingService extends TenantAwareCrudService<OrganizationTaskSetting> {
    readonly typeOrmOrganizationTaskSettingRepository: TypeOrmOrganizationTaskSettingRepository;
    readonly mikroOrmOrganizationTaskSettingRepository: MikroOrmOrganizationTaskSettingRepository;
    constructor(typeOrmOrganizationTaskSettingRepository: TypeOrmOrganizationTaskSettingRepository, mikroOrmOrganizationTaskSettingRepository: MikroOrmOrganizationTaskSettingRepository);
    /**
     * Find organization task setting.
     *
     * @param options - The options to filter the organization task setting.
     * @returns A Promise resolving to the found organization task setting.
     */
    findByOrganization(options: IOrganizationTaskSettingFindInput): Promise<IOrganizationTaskSetting>;
}
