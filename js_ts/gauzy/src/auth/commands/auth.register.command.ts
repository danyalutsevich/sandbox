import { ICommand } from '@nestjs/cqrs';
import { IUserRegistrationInput, LanguagesEnum } from '../../../plugins/contracts';
import { IAppIntegrationConfig } from'../../../plugins/common/dist/index'; 

export class AuthRegisterCommand implements ICommand {
	static readonly type = '[Auth] Register';

	constructor(
		public readonly input: IUserRegistrationInput & Partial<IAppIntegrationConfig>,
		public readonly languageCode: LanguagesEnum,
	) { }
}
