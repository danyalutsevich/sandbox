import { ICommand } from '@nestjs/cqrs';
import { IOrganizationContactInviteInput } from '../../../plugins/contracts';
export declare class InviteOrganizationContactCommand implements ICommand {
    readonly input: IOrganizationContactInviteInput;
    static readonly type = "[OrganizationContact] Invite";
    constructor(input: IOrganizationContactInviteInput);
}
