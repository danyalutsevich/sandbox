import { QueryBus } from '@nestjs/cqrs';
import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { IAccountingTemplate, IAccountingTemplateUpdateInput, IPagination, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from '../core/crud';
import { AccountingTemplate } from './accounting-template.entity';
import { AccountingTemplateService } from './accounting-template.service';
import { AccountingTemplateQueryDTO, SaveAccountingTemplateDTO } from './dto';
export declare class AccountingTemplateController extends CrudController<AccountingTemplate> {
    private readonly accountingTemplateService;
    private readonly queryBus;
    constructor(accountingTemplateService: AccountingTemplateService, queryBus: QueryBus);
    /**
     * GET count for accounting template
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<AccountingTemplate>): Promise<number>;
    /**
     * GET accounting templates using pagination params
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<AccountingTemplate>): Promise<IPagination<IAccountingTemplate>>;
    /**
     * GET accounting template
     *
     * @param options
     * @param themeLanguage
     * @returns
     */
    getAccountingTemplate(options: AccountingTemplateQueryDTO, themeLanguage: LanguagesEnum): Promise<IAccountingTemplate>;
    generatePreview(input: any): Promise<any>;
    /**
     * Save accounting template to the organization
     *
     * @param entity
     * @returns
     */
    saveTemplate(entity: SaveAccountingTemplateDTO): Promise<IAccountingTemplate | UpdateResult>;
    findAll(options: PaginationParams<AccountingTemplate>): Promise<IPagination<IAccountingTemplate>>;
    findById(id: string): Promise<IAccountingTemplate>;
    update(id: string, input: IAccountingTemplateUpdateInput): Promise<IAccountingTemplate>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
