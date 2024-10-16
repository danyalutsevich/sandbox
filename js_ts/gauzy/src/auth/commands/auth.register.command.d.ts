import { ICommand } from '@nestjs/cqrs';
import { IUserRegistrationInput, LanguagesEnum } from '../../../plugins/contracts';
import { IAppIntegrationConfig } from '../../../plugins/common/dist/index';
export declare class AuthRegisterCommand implements ICommand {
    readonly input: IUserRegistrationInput & Partial<IAppIntegrationConfig>;
    readonly languageCode: LanguagesEnum;
    static readonly type = "[Auth] Register";
    constructor(input: IUserRegistrationInput & Partial<IAppIntegrationConfig>, languageCode: LanguagesEnum);
}
