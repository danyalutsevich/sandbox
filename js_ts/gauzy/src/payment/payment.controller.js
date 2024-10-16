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
exports.PaymentController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const core_1 = require("../core");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const payment_service_1 = require("./payment.service");
const payment_map_service_1 = require("./payment.map.service");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
let PaymentController = exports.PaymentController = class PaymentController extends core_1.CrudController {
    paymentService;
    paymentMapService;
    constructor(paymentService, paymentMapService) {
        super(paymentService);
        this.paymentService = paymentService;
        this.paymentMapService = paymentMapService;
    }
    /**
     * GET payments report
     *
     * @param options
     * @returns
     */
    async getPaymentReport(options) {
        const reports = await this.paymentService.getPayments(options);
        let response = [];
        if (options.groupBy === index_1.ReportGroupFilterEnum.date) {
            response = this.paymentMapService.mapByDate(reports);
        }
        else if (options.groupBy === index_1.ReportGroupFilterEnum.client) {
            response = this.paymentMapService.mapByClient(reports);
        }
        else if (options.groupBy === index_1.ReportGroupFilterEnum.project) {
            response = this.paymentMapService.mapByProject(reports);
        }
        return response;
    }
    /**
     * GET payments report daily chart data
     *
     * @param options
     * @returns
     */
    async getDailyReportCharts(options) {
        return this.paymentService.getDailyReportCharts(options);
    }
    /**
     * SEND receipt
     *
     * @param request
     * @param languageCode
     * @returns
     */
    async sendReceipt(body, languageCode, origin) {
        const { invoice, payment } = body.params;
        return await this.paymentService.sendReceipt(languageCode, invoice, payment, origin);
    }
    /**
     * GET payment records by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this.paymentService.pagination(params);
    }
    /**
     * GET payment records
     *
     * @param data
     * @returns
     */
    async findAll(params) {
        return await this.paymentService.findAll(params);
    }
    /**
     * CREATE new payment record
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.paymentService.create(entity);
    }
    /**
     * UPDATE existing payment record
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        try {
            await this.paymentService.findOneByIdString(id);
            return await this.paymentService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Payments report.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found reports'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PAYMENT_VIEW),
    (0, common_1.Get)('report'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.PaymentReportQueryDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Payment Report daily chart' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PAYMENT_VIEW),
    (0, common_1.Get)('report/charts'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.PaymentReportQueryDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getDailyReportCharts", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Post)('receipt'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __param(2, (0, common_1.Headers)('origin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "sendReceipt", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PAYMENT_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "pagination", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PAYMENT_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePaymentDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePaymentDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "update", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PAYMENT_ADD_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        payment_map_service_1.PaymentMapService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map