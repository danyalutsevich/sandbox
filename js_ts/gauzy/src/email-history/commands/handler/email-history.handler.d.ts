import { IEmailHistory } from '../../../../plugins/contracts';
import { ICommandHandler } from '@nestjs/cqrs';
import { EmailService } from 'email-send/email.service';
import { UpdateResult } from 'typeorm';
import { EmailHistoryResendCommand } from '../email-history.resend.command';
export declare class EmailHistoryResendHandler implements ICommandHandler<EmailHistoryResendCommand> {
    private readonly emailService;
    constructor(emailService: EmailService);
    execute(command: EmailHistoryResendCommand): Promise<UpdateResult | IEmailHistory>;
}
