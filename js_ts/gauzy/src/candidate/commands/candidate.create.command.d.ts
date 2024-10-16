import { ICommand } from '@nestjs/cqrs';
import { ICandidateCreateInput, LanguagesEnum } from '../../../plugins/contracts';
export declare class CandidateCreateCommand implements ICommand {
    readonly input: ICandidateCreateInput;
    readonly languageCode?: LanguagesEnum;
    readonly originUrl?: string;
    static readonly type = "[Candidate] Create";
    constructor(input: ICandidateCreateInput, languageCode?: LanguagesEnum, originUrl?: string);
}
