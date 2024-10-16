import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProject, IOrganizationProjectSetting } from '../../../plugins/contracts';
export declare class OrganizationProjectSettingUpdateCommand implements ICommand {
    readonly id: IOrganizationProject['id'];
    readonly input: IOrganizationProjectSetting;
    static readonly type = "[Organization Project Setting] Update";
    constructor(id: IOrganizationProject['id'], input: IOrganizationProjectSetting);
}
