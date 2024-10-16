import { IResendEmailInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class EmailHistoryResendCommand implements ICommand {
    readonly input: IResendEmailInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Email History] Resend";
    constructor(input: IResendEmailInput, languageCode: LanguagesEnum);
}
