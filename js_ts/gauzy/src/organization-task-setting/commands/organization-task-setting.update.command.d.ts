import { IOrganizationTaskSetting, IOrganizationTaskSettingUpdateInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class OrganizationTaskSettingUpdateCommand implements ICommand {
    readonly id: IOrganizationTaskSetting['id'];
    readonly input: IOrganizationTaskSettingUpdateInput;
    static readonly type = "[Organization Task Setting] Update";
    constructor(id: IOrganizationTaskSetting['id'], input: IOrganizationTaskSettingUpdateInput);
}
