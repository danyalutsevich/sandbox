import { IQueryHandler } from '@nestjs/cqrs';
import { ICustomizableEmailTemplate } from '../../../../plugins/contracts/dist/index';
import { EmailTemplateService } from '../../email-template.service';
import { EmailTemplateReaderService } from './../../email-template-reader.service';
import { FindEmailTemplateQuery } from '../email-template.find.query';
export declare class FindEmailTemplateHandler implements IQueryHandler<FindEmailTemplateQuery> {
    private readonly emailTemplateService;
    private readonly emailTemplateReaderService;
    constructor(emailTemplateService: EmailTemplateService, emailTemplateReaderService: EmailTemplateReaderService);
    execute(command: FindEmailTemplateQuery): Promise<ICustomizableEmailTemplate>;
    private _fetchTemplate;
}
