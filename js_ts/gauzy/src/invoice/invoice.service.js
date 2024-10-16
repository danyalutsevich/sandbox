"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const crud_1 = require("./../core/crud");
const invoice_entity_1 = require("./invoice.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const email_service_1 = require("./../email-send/email.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../../plugins/config/dist/index");
const nestjs_i18n_1 = require("nestjs-i18n");
const moment_1 = __importDefault(require("moment"));
const estimate_email_service_1 = require("../estimate-email/estimate-email.service");
const stream_1 = require("stream");
const pdfmaker_service_1 = require("./pdfmaker.service");
const index_2 = require("./index");
const organization_1 = require("./../organization");
const type_orm_invoice_repository_1 = require("./repository/type-orm-invoice.repository");
const mikro_orm_invoice_repository_1 = require("./repository/mikro-orm-invoice.repository");
let InvoiceService = exports.InvoiceService = class InvoiceService extends crud_1.TenantAwareCrudService {
    emailService;
    estimateEmailService;
    pdfmakerService;
    i18n;
    organizationService;
    constructor(typeOrmInvoiceRepository, mikroOrmInvoiceRepository, emailService, estimateEmailService, pdfmakerService, i18n, organizationService) {
        super(typeOrmInvoiceRepository, mikroOrmInvoiceRepository);
        this.emailService = emailService;
        this.estimateEmailService = estimateEmailService;
        this.pdfmakerService = pdfmakerService;
        this.i18n = i18n;
        this.organizationService = organizationService;
    }
    /**
     * GET highest invoice number
     *
     * @returns
     */
    async getHighestInvoiceNumber() {
        try {
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            return await query.select(`COALESCE(MAX(${query.alias}.invoiceNumber), 0)`, 'max').getRawOne();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async sendEmail(languageCode, email, invoiceNumber, invoiceId, isEstimate, origin, organizationId) {
        try {
            //create estimate email record
            const estimateEmail = await this.estimateEmailService.createEstimateEmail(invoiceId, email);
            const organization = await this.organizationService.findOneByIdString(organizationId);
            try {
                //generate estimate/invoice pdf and attached in email
                const buffer = await this.generateInvoicePdf(invoiceId, languageCode);
                if (!buffer)
                    throw new Error('PDF generation failed');
                const base64 = buffer?.toString('base64');
                await this.emailService.emailInvoice(languageCode, email, base64, invoiceNumber, invoiceId, isEstimate, estimateEmail.token, origin, organization);
            }
            catch (error) {
                console.log(`Error while sending estimate email ${invoiceNumber}: %s`, error?.message);
            }
        }
        catch (error) {
            console.log(`Error while creating estimate email for invoice ${invoiceId}: %s`, error?.message);
        }
    }
    /**
     * Generate invoice public link
     *
     * @param invoiceId
     * @returns
     */
    async generateLink(invoiceId) {
        try {
            const invoice = await this.findOneByIdString(invoiceId);
            const payload = {
                id: invoice.id,
                organizationId: invoice.organizationId,
                tenantId: invoice.tenantId
            };
            return await this.create({
                id: invoiceId,
                token: (0, jsonwebtoken_1.sign)(payload, index_1.environment.JWT_SECRET, {})
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async generateInvoicePdf(invoiceId, language) {
        const invoice = await this.findOneByIdString(invoiceId, {
            relations: [
                'fromOrganization',
                'invoiceItems.employee.user',
                'invoiceItems.employee',
                'invoiceItems.expense',
                'invoiceItems.product',
                'invoiceItems.product.translations',
                'invoiceItems.project',
                'invoiceItems.task',
                'invoiceItems',
                'toContact'
            ]
        });
        const translatedText = {
            item: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE_ITEM.ITEM', { lang: language }),
            description: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE_ITEM.DESCRIPTION', {
                lang: language
            }),
            quantity: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE_ITEM.QUANTITY', {
                lang: language
            }),
            price: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE_ITEM.PRICE', { lang: language }),
            totalValue: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE_ITEM.TOTAL_VALUE', {
                lang: language
            }),
            invoice: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE', { lang: language }),
            estimate: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.ESTIMATE', { lang: language }),
            number: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.NUMBER', { lang: language }),
            from: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.FROM', { lang: language }),
            to: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.TO', { lang: language }),
            date: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.DATE', { lang: language }),
            dueDate: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.DUE_DATE', { lang: language }),
            discountValue: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICES_SELECT_DISCOUNT_VALUE', {
                lang: language
            }),
            discountType: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.DISCOUNT_TYPE', {
                lang: language
            }),
            taxValue: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.TAX_VALUE', { lang: language }),
            taxType: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.TAX_TYPE', { lang: language }),
            currency: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.CURRENCY', { lang: language }),
            terms: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICES_SELECT_TERMS', {
                lang: language
            }),
            paid: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAID', { lang: language }),
            yes: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.YES', { lang: language }),
            no: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.NO', { lang: language }),
            alreadyPaid: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.ALREADY_PAID', { lang: language }),
            amountDue: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.AMOUNT_DUE', { lang: language })
        };
        const docDefinition = await (0, index_2.generateInvoicePdfDefinition)(invoice, invoice.fromOrganization, invoice.toContact, translatedText, language);
        return await this.pdfmakerService.generatePdf(docDefinition);
    }
    async generateInvoicePaymentPdf(invoiceId, language) {
        const invoice = await this.findOneByIdString(invoiceId, {
            relations: [
                'invoiceItems',
                'fromOrganization',
                'toContact',
                'payments',
                'payments.invoice',
                'payments.recordedBy'
            ]
        });
        const translatedText = {
            overdue: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.OVERDUE', { lang: language }),
            onTime: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.ON_TIME', { lang: language }),
            paymentDate: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.PAYMENT_DATE', {
                lang: language
            }),
            amount: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.AMOUNT', { lang: language }),
            recordedBy: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.RECORDED_BY', {
                lang: language
            }),
            note: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.NOTE', { lang: language }),
            status: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.STATUS', { lang: language }),
            paymentsForInvoice: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.PAYMENTS_FOR_INVOICE', { lang: language }),
            dueDate: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.DUE_DATE', { lang: language }),
            totalValue: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.INVOICE_ITEM.TOTAL_VALUE', {
                lang: language
            }),
            totalPaid: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.TOTAL_PAID', {
                lang: language
            }),
            receivedFrom: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.RECEIVED_FROM', {
                lang: language
            }),
            receiver: await this.i18n.translate('USER_ORGANIZATION.INVOICES_PAGE.PAYMENTS.RECEIVER', { lang: language })
        };
        const docDefinition = await (0, index_2.generateInvoicePaymentPdfDefinition)(invoice, invoice.payments, invoice.fromOrganization, invoice.toContact, invoice.alreadyPaid, translatedText);
        return await this.pdfmakerService.generatePdf(docDefinition);
    }
    getReadableStream(buffer) {
        const stream = new stream_1.Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
    /**
     * GET invoices pagination by params
     *
     * @param filter
     * @returns
     */
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            if (where.tags) {
                filter.where.tags = {
                    id: (0, typeorm_2.In)(where.tags)
                };
            }
            if (where.toContact) {
                filter.where.toContact = {
                    id: (0, typeorm_2.In)(where.toContact)
                };
            }
            if ('invoiceDate' in where) {
                const { invoiceDate } = where;
                const { startDate, endDate } = invoiceDate;
                if (startDate && endDate) {
                    filter.where.invoiceDate = (0, typeorm_2.Between)(moment_1.default.utc(startDate).format('YYYY-MM-DD HH:mm:ss'), moment_1.default.utc(endDate).format('YYYY-MM-DD HH:mm:ss'));
                }
                else {
                    filter.where.invoiceDate = (0, typeorm_2.Between)((0, moment_1.default)().startOf('month').utc().format('YYYY-MM-DD HH:mm:ss'), (0, moment_1.default)().endOf('month').utc().format('YYYY-MM-DD HH:mm:ss'));
                }
            }
            if ('dueDate' in where) {
                const { dueDate } = where;
                const { startDate, endDate } = dueDate;
                if (startDate && endDate) {
                    filter.where.dueDate = (0, typeorm_2.Between)(moment_1.default.utc(startDate).format('YYYY-MM-DD HH:mm:ss'), moment_1.default.utc(endDate).format('YYYY-MM-DD HH:mm:ss'));
                }
                else {
                    filter.where.dueDate = (0, typeorm_2.Between)((0, moment_1.default)().startOf('month').utc().format('YYYY-MM-DD HH:mm:ss'), (0, moment_1.default)().endOf('month').utc().format('YYYY-MM-DD HH:mm:ss'));
                }
            }
        }
        return super.paginate(filter);
    }
};
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [type_orm_invoice_repository_1.TypeOrmInvoiceRepository,
        mikro_orm_invoice_repository_1.MikroOrmInvoiceRepository,
        email_service_1.EmailService,
        estimate_email_service_1.EstimateEmailService,
        pdfmaker_service_1.PdfmakerService,
        nestjs_i18n_1.I18nService,
        organization_1.OrganizationService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map