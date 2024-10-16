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
exports.InvoiceEstimateHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const invoice_estimate_history_service_1 = require("./invoice-estimate-history.service");
let InvoiceEstimateHistoryController = exports.InvoiceEstimateHistoryController = class InvoiceEstimateHistoryController extends crud_1.CrudController {
    invoiceEstimateHistoryService;
    constructor(invoiceEstimateHistoryService) {
        super(invoiceEstimateHistoryService);
        this.invoiceEstimateHistoryService = invoiceEstimateHistoryService;
    }
    async findAll(data) {
        const { relations = [], findInput = null } = data;
        return this.invoiceEstimateHistoryService.findAll({
            where: findInput,
            relations
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceEstimateHistoryController.prototype, "findAll", null);
exports.InvoiceEstimateHistoryController = InvoiceEstimateHistoryController = __decorate([
    (0, swagger_1.ApiTags)('InvoiceEstimateHistory'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [invoice_estimate_history_service_1.InvoiceEstimateHistoryService])
], InvoiceEstimateHistoryController);
//# sourceMappingURL=invoice-estimate-history.controller.js.map