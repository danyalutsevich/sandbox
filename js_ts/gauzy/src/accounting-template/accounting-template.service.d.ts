import { IAccountingTemplate, IAccountingTemplateFindInput, IAccountingTemplateUpdateInput, IPagination, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { AccountingTemplate } from './accounting-template.entity';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { TypeOrmAccountingTemplateRepository } from './repository/type-orm-accounting-template.repository';
import { MikroOrmAccountingTemplateRepository } from './repository/mikro-orm-accounting-template.repository';
export declare class AccountingTemplateService extends TenantAwareCrudService<AccountingTemplate> {
    constructor(typeOrmAccountingTemplateRepository: TypeOrmAccountingTemplateRepository, mikroOrmAccountingTemplateRepository: MikroOrmAccountingTemplateRepository);
    generatePreview(input: any): {
        html: string;
    };
    /**
     * Save accounting template to the organization
     *
     * @param input
     * @returns
     */
    saveTemplate(input: IAccountingTemplateUpdateInput): Promise<AccountingTemplate | import("typeorm").UpdateResult>;
    /**
     * GET single accounting template by conditions
     *
     * @param options
     * @param themeLanguage
     * @returns
     */
    getAccountTemplate(options: IAccountingTemplateFindInput, themeLanguage: LanguagesEnum): Promise<AccountingTemplate>;
    /**
     * Get Accounting Templates using pagination params
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<AccountingTemplate>): Promise<IPagination<IAccountingTemplate>>;
}
