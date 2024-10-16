import { IInviteAcceptInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class InviteAcceptCandidateCommand implements ICommand {
    readonly input: IInviteAcceptInput;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Invite] Accept Candidate";
    constructor(input: IInviteAcceptInput, languageCode: LanguagesEnum);
}
