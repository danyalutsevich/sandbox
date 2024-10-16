import { IUserUpdateInput, LanguagesEnum } from '../../../plugins/contracts';
export declare class UpdatePreferredLanguageDTO implements IUserUpdateInput {
    readonly preferredLanguage: LanguagesEnum;
}
