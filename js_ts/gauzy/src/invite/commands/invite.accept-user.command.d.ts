import { IInviteAcceptInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InviteAcceptUserCommand implements ICommand {
    readonly input: IInviteAcceptInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite] Accept User";
    constructor(input: IInviteAcceptInput, languageCode: LanguagesEnum);
}
