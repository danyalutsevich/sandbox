import { IOrganizationTaskSettingCreateInput } from '../../../plugins/contracts';
import { OrganizationTaskSettingDTO } from './organization-task-setting.dto';

/**
 * Create organization task setting
 */
export class CreateOrganizationTaskSettingDTO extends OrganizationTaskSettingDTO implements IOrganizationTaskSettingCreateInput { }
