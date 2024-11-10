import { ICommand } from '@nestjs/cqrs';
import { IUserRegistrationInput } from '../../../plugins/contracts';

export class GauzyCloudUserMigrateCommand implements ICommand {
	static readonly type = '[Gauzy Cloud] User Migrate';

	constructor(public readonly input: IUserRegistrationInput) {}
}