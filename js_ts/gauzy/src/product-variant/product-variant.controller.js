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
exports.ProductVariantController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const product_variant_entity_1 = require("./product-variant.entity");
const product_variant_service_1 = require("./product-variant.service");
const commands_1 = require("./commands");
const product_entity_1 = require("../product/product.entity");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let ProductVariantController = exports.ProductVariantController = class ProductVariantController extends crud_1.CrudController {
    productVariantService;
    commandBus;
    constructor(productVariantService, commandBus) {
        super(productVariantService);
        this.productVariantService = productVariantService;
        this.commandBus = commandBus;
    }
    async findAllVariantsByProduct(productId) {
        return this.productVariantService.findAllVariantsByProductId(productId);
    }
    async createProductVariants(entity) {
        return await this.commandBus.execute(new commands_1.ProductVariantCreateCommand(entity));
    }
    async findAll() {
        return this.productVariantService.findAllProductVariants();
    }
    async findById(id) {
        return this.productVariantService.findOneByIdString(id);
    }
    async update(id, productVariant) {
        return this.productVariantService.updateVariant(productVariant);
    }
    async delete(id) {
        return await this.commandBus.execute(new commands_1.ProductVariantDeleteCommand(id));
    }
    async deleteFeaturedImage(variantId) {
        return this.productVariantService.deleteFeaturedImage(variantId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all variants by product id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product variants',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "findAllVariantsByProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create product variants' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'These records have been successfully created.' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('variants'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "createProductVariants", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all product variants'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product variants',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all product variants'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product variants',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
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
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_variant_entity_1.ProductVariant]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "update", null);
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
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete featured image' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)('/featured-image/:variantId'),
    __param(0, (0, common_1.Param)('variantId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductVariantController.prototype, "deleteFeaturedImage", null);
exports.ProductVariantController = ProductVariantController = __decorate([
    (0, swagger_1.ApiTags)('ProductVariant'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_variant_service_1.ProductVariantService,
        cqrs_1.CommandBus])
], ProductVariantController);
//# sourceMappingURL=product-variant.controller.js.map