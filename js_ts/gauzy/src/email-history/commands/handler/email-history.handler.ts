import { IEmailHistory } from '../../../../plugins/contracts';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailService } from 'email-send/email.service';
import { UpdateResult } from 'typeorm';
import { EmailHistoryResendCommand } from '../email-history.resend.command';

@CommandHandler(EmailHistoryResendCommand)
export class EmailHistoryResendHandler implements ICommandHandler<EmailHistoryResendCommand> {

	constructor(
		private readonly emailService: EmailService
	) { }

	public async execute(command: EmailHistoryResendCommand): Promise<UpdateResult | IEmailHistory> {
		const { input, languageCode } = command;
		return await this.emailService.resendEmail(input, languageCode);
	}
}
