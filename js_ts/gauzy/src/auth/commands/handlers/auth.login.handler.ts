import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserLoginInput, IAuthResponse } from '../../../../plugins/contracts/dist/index';
import { AuthLoginCommand } from '../auth.login.command';
import { AuthService } from '../../auth.service';

@CommandHandler(AuthLoginCommand)
export class AuthLoginHandler implements ICommandHandler<AuthLoginCommand> {

	constructor(
		private readonly authService: AuthService
	) { }

	public async execute(command: AuthLoginCommand): Promise<IAuthResponse | null> {
		const { input } = command;
		const { email, password }: IUserLoginInput = input;

		return await this.authService.login({ email, password });
	}
}
