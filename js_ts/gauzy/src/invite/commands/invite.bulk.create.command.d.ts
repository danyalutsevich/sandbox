import { ICommand } from '@nestjs/cqrs';
import { ICreateEmailInvitesInput, LanguagesEnum } from '../../../plugins/contracts';
export declare class InviteBulkCreateCommand implements ICommand {
    readonly input: ICreateEmailInvitesInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite Bulk] Create";
    constructor(input: ICreateEmailInvitesInput, languageCode: LanguagesEnum);
}
