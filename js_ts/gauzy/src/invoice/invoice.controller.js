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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const invoice_service_1 = require("./invoice.service");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let InvoiceController = exports.InvoiceController = class InvoiceController extends crud_1.CrudController {
    invoiceService;
    commandBus;
    constructor(invoiceService, commandBus) {
        super(invoiceService);
        this.invoiceService = invoiceService;
        this.commandBus = commandBus;
    }
    /**
     * GET invoice count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.invoiceService.countBy(options);
    }
    /**
     * GET invoices by pagination params
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this.invoiceService.pagination(options);
    }
    /**
     * GET highest invoice number
     *
     * @returns
     */
    async findHighestInvoiceNumber() {
        return await this.invoiceService.getHighestInvoiceNumber();
    }
    /**
     * GET all invoices
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        try {
            return await this.invoiceService.findAll(options);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * GET invoice by ID
     *
     * @param id
     * @param data
     * @returns
     */
    async findById(id, data) {
        const { relations = [], findInput = null } = data;
        return this.invoiceService.findOneByIdString(id, {
            where: findInput,
            relations
        });
    }
    /**
     * Create invoice
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.InvoiceCreateCommand(entity));
    }
    /**
     * Update invoice
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.InvoiceUpdateCommand({ id, ...entity }));
    }
    /**
     * Update estimate status
     *
     * @param id
     * @param entity
     * @returns
     */
    async updateEstimate(id, entity) {
        return await this.commandBus.execute(new commands_1.InvoiceUpdateCommand({ id, ...entity }));
    }
    /**
     * Update invoice/estimate action
     *
     * @param id
     * @param entity
     * @returns
     */
    async updateAction(id, entity) {
        return await this.commandBus.execute(new commands_1.InvoiceUpdateCommand({ id, ...entity }));
    }
    /**
     * Send estimate/invoice email
     *
     * @param email
     * @param body
     * @param languageCode
     * @param originalUrl
     * @returns
     */
    async emailInvoice(email, body, languageCode, origin) {
        return this.commandBus.execute(new commands_1.InvoiceSendEmailCommand(languageCode, email, body.params, origin));
    }
    /**
     * Generate invoice/estimate public link
     *
     * @param uuid
     * @returns
     */
    async generateLink(uuid) {
        return await this.commandBus.execute(new commands_1.InvoiceGenerateLinkCommand(uuid));
    }
    async delete(id) {
        return await this.commandBus.execute(new commands_1.InvoiceDeleteCommand(id));
    }
    /**
     * Download invoice pdf
     *
     * @param uuid
     * @param locale
     * @param res
     * @returns
     */
    async downloadInvoicePdf(uuid, locale, res) {
        const buffer = await this.commandBus.execute(new commands_1.InvoiceGeneratePdfCommand(uuid, locale));
        if (!buffer) {
            return;
        }
        const stream = this.invoiceService.getReadableStream(buffer);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.length
        });
        stream.pipe(res);
    }
    /**
     * Download invoice payment pdf
     *
     * @param uuid
     * @param locale
     * @param res
     * @returns
     */
    async downloadInvoicePaymentPdf(uuid, locale, res) {
        const buffer = await this.commandBus.execute(new commands_1.InvoicePaymentGeneratePdfCommand(uuid, locale));
        if (!buffer) {
            return;
        }
        const stream = this.invoiceService.getReadableStream(buffer);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.length
        });
        stream.pipe(res);
    }
};
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "getCount", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "pagination", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)('highest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findHighestInvoiceNumber", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.OptionParams]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateInvoiceDTO]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateInvoiceDTO]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update estimate invoice' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)('/:id/estimate'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateEstimateInvoiceDTO]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "updateEstimate", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update Invoice's Status" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)('/:id/action'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateInvoiceActionDTO]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "updateAction", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __param(3, (0, common_1.Headers)('origin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "emailInvoice", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)('generate/:uuid'),
    __param(0, (0, common_1.Param)('uuid', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "generateLink", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Download Invoice' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The invoice has been successfully downloaded'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Invoice not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)('download/:uuid'),
    __param(0, (0, common_1.Param)('uuid', pipes_1.UUIDValidationPipe)),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "downloadInvoicePdf", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Download Invoice' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The invoice has been successfully downloaded'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Invoice not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)('payment/download/:uuid'),
    __param(0, (0, common_1.Param)('uuid', pipes_1.UUIDValidationPipe)),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "downloadInvoicePaymentPdf", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, swagger_1.ApiTags)('Invoice'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService, cqrs_1.CommandBus])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map