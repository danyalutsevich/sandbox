import { DeleteResult, FindOptionsWhere } from 'typeorm';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { IInvoice, LanguagesEnum, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, OptionParams, PaginationParams } from './../core/crud';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDTO, UpdateEstimateInvoiceDTO, UpdateInvoiceActionDTO, UpdateInvoiceDTO } from './dto';
export declare class InvoiceController extends CrudController<Invoice> {
    private readonly invoiceService;
    private readonly commandBus;
    constructor(invoiceService: InvoiceService, commandBus: CommandBus);
    /**
     * GET invoice count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Invoice>): Promise<number>;
    /**
     * GET invoices by pagination params
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<Invoice>): Promise<IPagination<IInvoice>>;
    /**
     * GET highest invoice number
     *
     * @returns
     */
    findHighestInvoiceNumber(): Promise<Invoice>;
    /**
     * GET all invoices
     *
     * @param options
     * @returns
     */
    findAll(options: OptionParams<IInvoice>): Promise<IPagination<IInvoice>>;
    /**
     * GET invoice by ID
     *
     * @param id
     * @param data
     * @returns
     */
    findById(id: IInvoice['id'], data: any): Promise<IInvoice>;
    /**
     * Create invoice
     *
     * @param entity
     * @returns
     */
    create(entity: CreateInvoiceDTO): Promise<Invoice>;
    /**
     * Update invoice
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IInvoice['id'], entity: UpdateInvoiceDTO): Promise<Invoice>;
    /**
     * Update estimate status
     *
     * @param id
     * @param entity
     * @returns
     */
    updateEstimate(id: IInvoice['id'], entity: UpdateEstimateInvoiceDTO): Promise<any>;
    /**
     * Update invoice/estimate action
     *
     * @param id
     * @param entity
     * @returns
     */
    updateAction(id: IInvoice['id'], entity: UpdateInvoiceActionDTO): Promise<any>;
    /**
     * Send estimate/invoice email
     *
     * @param email
     * @param body
     * @param languageCode
     * @param originalUrl
     * @returns
     */
    emailInvoice(email: string, body: any, languageCode: LanguagesEnum, origin: string): Promise<any>;
    /**
     * Generate invoice/estimate public link
     *
     * @param uuid
     * @returns
     */
    generateLink(uuid: IInvoice['id']): Promise<IInvoice>;
    delete(id: IInvoice['id']): Promise<DeleteResult>;
    /**
     * Download invoice pdf
     *
     * @param uuid
     * @param locale
     * @param res
     * @returns
     */
    downloadInvoicePdf(uuid: IInvoice['id'], locale: LanguagesEnum, res: Response): Promise<any>;
    /**
     * Download invoice payment pdf
     *
     * @param uuid
     * @param locale
     * @param res
     * @returns
     */
    downloadInvoicePaymentPdf(uuid: IInvoice['id'], locale: LanguagesEnum, res: Response): Promise<any>;
}
