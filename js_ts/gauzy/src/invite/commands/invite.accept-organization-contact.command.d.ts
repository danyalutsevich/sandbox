import { LanguagesEnum, IOrganizationContactAcceptInviteInput } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InviteAcceptOrganizationContactCommand implements ICommand {
    readonly input: IOrganizationContactAcceptInviteInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite] Accept Organization Contact";
    constructor(input: IOrganizationContactAcceptInviteInput, languageCode: LanguagesEnum);
}
