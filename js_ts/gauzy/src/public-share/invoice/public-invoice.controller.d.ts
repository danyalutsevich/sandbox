import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindOptionsWhere, UpdateResult } from 'typeorm';
import { IInvoice } from '../../../plugins/contracts';
import { Invoice } from './../../core/entities/internal';
import { PublicEstimateUpdateDTO, PublicInvoiceQueryDTO } from './dto';
export declare class PublicInvoiceController {
    private readonly queryBus;
    private readonly commandBus;
    constructor(queryBus: QueryBus, commandBus: CommandBus);
    /**
     * GET invoice by token
     *
     * @param params
     * @param query
     * @returns
     */
    findOneByPublicLink(params: FindOptionsWhere<Invoice>, query: PublicInvoiceQueryDTO): Promise<IInvoice>;
    /**
     * Update public estimate/invoice status
     *
     * @param params
     * @param entity
     * @returns
     */
    updateInvoiceByEstimateEmailToken(params: IInvoice, entity: PublicEstimateUpdateDTO): Promise<IInvoice | UpdateResult>;
}
