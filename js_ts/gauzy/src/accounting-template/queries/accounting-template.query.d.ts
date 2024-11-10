import { IQuery } from '@nestjs/cqrs';
import { AccountingTemplate } from './../accounting-template.entity';
import { PaginationParams } from '../../core/crud/pagination-params';
export declare class AccountingTemplateQuery implements IQuery {
    readonly options: PaginationParams<AccountingTemplate>;
    static readonly type = "[Accounting Template] Query All";
    constructor(options: PaginationParams<AccountingTemplate>);
}
