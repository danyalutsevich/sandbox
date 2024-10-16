import { ICommand } from '@nestjs/cqrs';
import { IOrganizationProjectCreateInput } from '../../../plugins/contracts';
export declare class OrganizationProjectCreateCommand implements ICommand {
    readonly input: IOrganizationProjectCreateInput;
    static readonly type = "[Organization Project] Create";
    constructor(input: IOrganizationProjectCreateInput);
}
