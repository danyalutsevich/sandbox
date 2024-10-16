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
exports.PublicInvoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const public_transform_interceptor_1 = require("./../public-transform.interceptor");
const queries_1 = require("./queries");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let PublicInvoiceController = exports.PublicInvoiceController = class PublicInvoiceController {
    queryBus;
    commandBus;
    constructor(queryBus, commandBus) {
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    /**
     * GET invoice by token
     *
     * @param params
     * @param query
     * @returns
     */
    async findOneByPublicLink(params, query) {
        return await this.queryBus.execute(new queries_1.FindPublicInvoiceQuery(params, query.relations));
    }
    /**
     * Update public estimate/invoice status
     *
     * @param params
     * @param entity
     * @returns
     */
    async updateInvoiceByEstimateEmailToken(params, entity) {
        return await this.commandBus.execute(new commands_1.PublicInvoiceUpdateCommand(params, entity));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Invoice by invoice token.' }),
    (0, swagger_1.ApiResponse)({
        status: contracts_1.HttpStatus.OK,
        description: 'Found one record'
    }),
    (0, swagger_1.ApiResponse)({
        status: contracts_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id/:token'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.PublicInvoiceQueryDTO]),
    __metadata("design:returntype", Promise)
], PublicInvoiceController.prototype, "findOneByPublicLink", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Estimate by estimate token.' }),
    (0, swagger_1.ApiResponse)({
        status: contracts_1.HttpStatus.ACCEPTED,
        description: 'Estimate updated successfully.'
    }),
    (0, swagger_1.ApiResponse)({
        status: contracts_1.HttpStatus.NOT_FOUND,
        description: 'Record not found.'
    }),
    (0, common_1.Put)(':id/:token'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.PublicEstimateUpdateDTO]),
    __metadata("design:returntype", Promise)
], PublicInvoiceController.prototype, "updateInvoiceByEstimateEmailToken", null);
exports.PublicInvoiceController = PublicInvoiceController = __decorate([
    (0, index_1.Public)(),
    (0, common_1.UseInterceptors)(public_transform_interceptor_1.PublicTransformInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        cqrs_1.CommandBus])
], PublicInvoiceController);
//# sourceMappingURL=public-invoice.controller.js.map