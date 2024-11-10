/// <reference types="node" />
/// <reference types="node" />
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { Invoice } from './invoice.entity';
import { EmailService } from './../email-send/email.service';
import { IInvoice, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { I18nService } from 'nestjs-i18n';
import { EstimateEmailService } from '../estimate-email/estimate-email.service';
import { Readable } from 'stream';
import { PdfmakerService } from './pdfmaker.service';
import { OrganizationService } from './../organization';
import { TypeOrmInvoiceRepository } from './repository/type-orm-invoice.repository';
import { MikroOrmInvoiceRepository } from './repository/mikro-orm-invoice.repository';
export declare class InvoiceService extends TenantAwareCrudService<Invoice> {
    private readonly emailService;
    private readonly estimateEmailService;
    private readonly pdfmakerService;
    private readonly i18n;
    private readonly organizationService;
    constructor(typeOrmInvoiceRepository: TypeOrmInvoiceRepository, mikroOrmInvoiceRepository: MikroOrmInvoiceRepository, emailService: EmailService, estimateEmailService: EstimateEmailService, pdfmakerService: PdfmakerService, i18n: I18nService, organizationService: OrganizationService);
    /**
     * GET highest invoice number
     *
     * @returns
     */
    getHighestInvoiceNumber(): Promise<IInvoice>;
    sendEmail(languageCode: LanguagesEnum, email: string, invoiceNumber: number, invoiceId: string, isEstimate: boolean, origin: string, organizationId: string): Promise<void>;
    /**
     * Generate invoice public link
     *
     * @param invoiceId
     * @returns
     */
    generateLink(invoiceId: string): Promise<IInvoice>;
    generateInvoicePdf(invoiceId: string, language: string): Promise<Buffer>;
    generateInvoicePaymentPdf(invoiceId: string, language: string): Promise<Buffer>;
    getReadableStream(buffer: Buffer): Readable;
    /**
     * GET invoices pagination by params
     *
     * @param filter
     * @returns
     */
    pagination(filter?: PaginationParams<any>): Promise<import("../../plugins/contracts/dist/core.model").IPagination<Invoice>>;
}
