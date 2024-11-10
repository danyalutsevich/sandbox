import { ICommand } from '@nestjs/cqrs';
import { IOrganizationContactCreateInput } from '../../../plugins/contracts';
export declare class OrganizationContactCreateCommand implements ICommand {
    readonly input: IOrganizationContactCreateInput;
    static readonly type = "[Organization Contact] Create";
    constructor(input: IOrganizationContactCreateInput);
}
