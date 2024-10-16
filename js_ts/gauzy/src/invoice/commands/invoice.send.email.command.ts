import { LanguagesEnum } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';

export class InvoiceSendEmailCommand implements ICommand {
	static readonly type = '[Invoice] Send Email';

	constructor(
		public readonly languageCode: LanguagesEnum,
		public readonly email: string,
		public readonly params: any,
		public readonly origin: string
	) { }
}
