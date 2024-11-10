import { ICommandHandler } from '@nestjs/cqrs';
import { EmailResetCreateCommand } from '../email-reset.create.command';
import { EmailResetService } from './../../email-reset.service';
export declare class EmailResetCreateHandler implements ICommandHandler<EmailResetCreateCommand> {
    private readonly _emailResetService;
    constructor(_emailResetService: EmailResetService);
    execute(command: EmailResetCreateCommand): Promise<import("../../email-reset.entity").EmailReset>;
}
