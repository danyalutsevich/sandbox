import { ICommand } from '@nestjs/cqrs';
import { IUserOrganizationDeleteInput } from '../../../plugins/contracts';
export declare class UserOrganizationDeleteCommand implements ICommand {
    readonly input: IUserOrganizationDeleteInput;
    static readonly type = "[UserOrganization] Delete";
    constructor(input: IUserOrganizationDeleteInput);
}
