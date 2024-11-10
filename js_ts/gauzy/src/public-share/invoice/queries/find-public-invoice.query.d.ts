import { IQuery } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { Invoice } from '../../../core/entities/internal';
export declare class FindPublicInvoiceQuery implements IQuery {
    readonly params: FindOptionsWhere<Invoice>;
    readonly relations: string[];
    constructor(params: FindOptionsWhere<Invoice>, relations: string[]);
}
