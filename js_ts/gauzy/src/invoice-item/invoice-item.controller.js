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
exports.InvoiceItemController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const invoice_item_service_1 = require("./invoice-item.service");
const commands_1 = require("./commands");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./dto");
let InvoiceItemController = exports.InvoiceItemController = class InvoiceItemController extends crud_1.CrudController {
    invoiceItemService;
    commandBus;
    constructor(invoiceItemService, commandBus) {
        super(invoiceItemService);
        this.invoiceItemService = invoiceItemService;
        this.commandBus = commandBus;
    }
    async findAll(data) {
        const { relations = [], findInput = null } = data;
        return this.invoiceItemService.findAll({
            where: findInput,
            relations
        });
    }
    async createBulk(invoiceId, input) {
        return this.commandBus.execute(new commands_1.InvoiceItemBulkCreateCommand(invoiceId, input.list));
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceItemController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create invoice item in Bulk' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Invoice item have been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INVOICES_EDIT),
    (0, common_1.Post)('/bulk/:invoiceId'),
    __param(0, (0, common_1.Param)('invoiceId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)(pipes_1.BulkBodyLoadTransformPipe, new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.InvoiceItemBulkInputDTO]),
    __metadata("design:returntype", Promise)
], InvoiceItemController.prototype, "createBulk", null);
exports.InvoiceItemController = InvoiceItemController = __decorate([
    (0, swagger_1.ApiTags)('InvoiceItem'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [invoice_item_service_1.InvoiceItemService,
        cqrs_1.CommandBus])
], InvoiceItemController);
//# sourceMappingURL=invoice-item.controller.js.map