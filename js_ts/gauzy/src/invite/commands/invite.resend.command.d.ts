import { IInviteResendInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InviteResendCommand implements ICommand {
    readonly input: IInviteResendInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite] Resend";
    constructor(input: IInviteResendInput, languageCode: LanguagesEnum);
}
