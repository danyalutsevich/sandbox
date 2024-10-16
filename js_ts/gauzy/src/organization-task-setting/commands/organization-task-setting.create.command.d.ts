import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTaskSettingCreateInput } from '../../../plugins/contracts';
export declare class OrganizationTaskSettingCreateCommand implements ICommand {
    readonly input: Partial<IOrganizationTaskSettingCreateInput>;
    static readonly type = "[Organization Task Setting] Create";
    constructor(input: Partial<IOrganizationTaskSettingCreateInput>);
}
