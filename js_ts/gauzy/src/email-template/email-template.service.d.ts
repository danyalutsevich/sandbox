import { EmailTemplateEnum, IEmailTemplate, IPagination, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { EmailTemplate } from './email-template.entity';
import { CrudService, PaginationParams } from './../core/crud';
import { MikroOrmEmailTemplateRepository, TypeOrmEmailTemplateRepository } from './repository';
export declare class EmailTemplateService extends CrudService<EmailTemplate> {
    constructor(typeOrmEmailTemplateRepository: TypeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository: MikroOrmEmailTemplateRepository);
    /**
     * Get Email Templates
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<EmailTemplate>): Promise<IPagination<IEmailTemplate>>;
    /**
     * Insert or update global missing email templates in database.
     * Production environment not running any seeder to save templates.
     * If someone looking for templates, we are fetch it from code folders.
     *
     * @param languageCode
     * @param name
     * @param type
     * @param organizationId
     * @param tenantId
     * @param content
     * @returns
     */
    saveTemplate(languageCode: LanguagesEnum, name: EmailTemplateEnum, type: 'html' | 'subject', organizationId: string, tenantId: string, content: IEmailTemplate): Promise<IEmailTemplate>;
}
