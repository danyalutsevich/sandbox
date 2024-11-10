import { IInviteAcceptInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InviteAcceptCommand implements ICommand {
    readonly input: IInviteAcceptInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite Employee/User/Candidate] Accept";
    constructor(input: IInviteAcceptInput, languageCode: LanguagesEnum);
}
