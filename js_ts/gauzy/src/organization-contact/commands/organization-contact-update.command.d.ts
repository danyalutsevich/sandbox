import { ICommand } from '@nestjs/cqrs';
import { IOrganizationContact, IOrganizationContactUpdateInput } from '../../../plugins/contracts';
export declare class OrganizationContactUpdateCommand implements ICommand {
    readonly id: IOrganizationContact['id'];
    readonly input: IOrganizationContactUpdateInput;
    static readonly type = "[Organization Contact] Update";
    constructor(id: IOrganizationContact['id'], input: IOrganizationContactUpdateInput);
}
