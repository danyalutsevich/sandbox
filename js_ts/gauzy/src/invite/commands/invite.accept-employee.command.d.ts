import { IInviteAcceptInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InviteAcceptEmployeeCommand implements ICommand {
    readonly input: IInviteAcceptInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite] Accept Employee";
    constructor(input: IInviteAcceptInput, languageCode: LanguagesEnum);
}
