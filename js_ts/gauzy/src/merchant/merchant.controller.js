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
exports.MerchantController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_2 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const merchant_entity_1 = require("./merchant.entity");
const merchant_service_1 = require("./merchant.service");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./../shared/dto");
const dto_2 = require("./dto");
let MerchantController = exports.MerchantController = class MerchantController extends crud_1.CrudController {
    merchantService;
    constructor(merchantService) {
        super(merchantService);
        this.merchantService = merchantService;
    }
    /**
     * GET merchant stores count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.merchantService.countBy(options);
    }
    /**
     * GET merchant stores by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this.merchantService.paginate(params);
    }
    /**
     * GET merchant stores
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        try {
            return await this.merchantService.findAll(params);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * GET merchant by id
     *
     * @param id
     * @param query
     * @returns
     */
    async findById(id, query) {
        return await this.merchantService.findById(id, query.relations);
    }
    /**
     * CREATE new merchant store
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        try {
            return await this.merchantService.create(entity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * UPDATE merchant store by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        try {
            return await this.merchantService.update(id, entity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, swagger_2.ApiOperation)({ summary: 'Find all merchant stores count in the same tenant' }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found merchant stores count'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "getCount", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "pagination", null);
__decorate([
    (0, swagger_2.ApiOperation)({
        summary: 'Find all product stores.'
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product stores.',
        type: merchant_entity_1.Merchant
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findAll", null);
__decorate([
    (0, swagger_2.ApiOperation)({
        summary: 'Get merchant by id.'
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found merchant.',
        type: merchant_entity_1.Merchant
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.RelationsQueryDTO]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findById", null);
__decorate([
    (0, swagger_2.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The merchant store has been successfully created.' /*, type: T*/
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CreateMerchantDTO]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "create", null);
__decorate([
    (0, swagger_2.ApiOperation)({ summary: 'Update merchant store record' }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The merchant store record has been successfully updated.'
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.UpdateMerchantDTO]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "update", null);
exports.MerchantController = MerchantController = __decorate([
    (0, swagger_1.ApiTags)('Merchants'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService])
], MerchantController);
//# sourceMappingURL=merchant.controller.js.map