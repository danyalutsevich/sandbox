import { IEmailTemplate, IEmailTemplateSaveInput, IPagination, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { CrudController, PaginationParams } from './../core/crud';
import { EmailTemplate } from './email-template.entity';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateQueryDTO, SaveEmailTemplateDTO } from './dto';
export declare class EmailTemplateController extends CrudController<EmailTemplate> {
    private readonly emailTemplateService;
    private readonly queryBus;
    private readonly commandBus;
    constructor(emailTemplateService: EmailTemplateService, queryBus: QueryBus, commandBus: CommandBus);
    /**
     * GET count for email templates in the same tenant
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<EmailTemplate>): Promise<number>;
    /**
     * GET email templates using pagination params
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<EmailTemplate>): Promise<IPagination<IEmailTemplate>>;
    /**
     * GET specific email template by conditions
     *
     * @param themeLanguage
     * @param options
     * @returns
     */
    findEmailTemplate(themeLanguage: LanguagesEnum, options: EmailTemplateQueryDTO): Promise<IEmailTemplate>;
    /**
     * Generate email template preview
     *
     * @param data
     * @returns
     */
    generatePreview(data: string): Promise<IEmailTemplate>;
    /**
     * SAVE email template for specific language
     *
     * @param entity
     * @returns
     */
    saveEmailTemplate(entity: SaveEmailTemplateDTO): Promise<IEmailTemplate>;
    /**
     * GET email templates in the same tenant
     *
     * @param options
     * @returns
     */
    findAll(options: PaginationParams<EmailTemplate>): Promise<IPagination<IEmailTemplate>>;
    /**
     * FIND email template by id in the same tenant
     *
     * @param id
     * @returns
     */
    findById(id: string): Promise<IEmailTemplate>;
    /**
     * UPDATE email template by id in the same tenant
     *
     * @param id
     * @param input
     * @returns
     */
    update(id: string, input: IEmailTemplateSaveInput): Promise<IEmailTemplate | UpdateResult>;
    /**
     * DELETE email template by id in the same tenant
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
