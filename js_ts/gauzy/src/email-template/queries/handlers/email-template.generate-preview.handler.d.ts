import { IQueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '../../../../plugins/config/dist/index';
import { EmailTemplateGeneratePreviewQuery } from '../email-template.generate-preview.query';
export declare class EmailTemplateGeneratePreviewHandler implements IQueryHandler<EmailTemplateGeneratePreviewQuery> {
    private readonly configService;
    constructor(configService: ConfigService);
    execute(command: EmailTemplateGeneratePreviewQuery): Promise<{
        html: string;
    }>;
}
