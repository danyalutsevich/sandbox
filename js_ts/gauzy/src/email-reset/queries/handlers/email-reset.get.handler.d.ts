import { IQueryHandler } from '@nestjs/cqrs';
import { IEmailReset } from '../../../../plugins/contracts/dist/index';
import { EmailResetGetQuery } from '../email-reset.get.query';
import { EmailResetService } from '../../email-reset.service';
export declare class EmailResetGetHandler implements IQueryHandler<EmailResetGetQuery> {
    private readonly _emailResetService;
    constructor(_emailResetService: EmailResetService);
    execute(query: EmailResetGetQuery): Promise<IEmailReset>;
}
