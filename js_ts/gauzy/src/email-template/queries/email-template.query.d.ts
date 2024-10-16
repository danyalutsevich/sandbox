import { IQuery } from '@nestjs/cqrs';
import { EmailTemplate } from './../email-template.entity';
import { PaginationParams } from './../../core/crud/pagination-params';
export declare class EmailTemplateQuery implements IQuery {
    readonly options: PaginationParams<EmailTemplate>;
    static readonly type = "[Email Template] Query All";
    constructor(options: PaginationParams<EmailTemplate>);
}
