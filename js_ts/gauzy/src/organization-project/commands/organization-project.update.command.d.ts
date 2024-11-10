import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProjectUpdateInput } from '../../../plugins/contracts';
export declare class OrganizationProjectUpdateCommand implements ICommand {
    readonly input: IOrganizationProjectUpdateInput;
    static readonly type = "[Organization Project] Update";
    constructor(input: IOrganizationProjectUpdateInput);
}
