import { IInviteAcceptInput, LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';

export class InviteAcceptCommand implements ICommand {
	static readonly type = '[Invite Employee/User/Candidate] Accept';

	constructor(
		public readonly input: IInviteAcceptInput,
		public readonly languageCode: LanguagesEnum
	) {}
}
