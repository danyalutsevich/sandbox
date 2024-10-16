import { IQueryHandler } from '@nestjs/cqrs';
import { EmailTemplateService } from './../../email-template.service';
import { EmailTemplateQuery } from '../email-template.query';
export declare class EmailTemplateQueryHandler implements IQueryHandler<EmailTemplateQuery> {
    private readonly emailTemplateService;
    constructor(emailTemplateService: EmailTemplateService);
    execute(query: EmailTemplateQuery): Promise<import("../../../../plugins/contracts/dist").IPagination<import("../../../../plugins/contracts/dist").IEmailTemplate>>;
}
