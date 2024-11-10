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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const product_service_1 = require("./product.service");
const product_entity_1 = require("./product.entity");
const commands_1 = require("./commands");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let ProductController = exports.ProductController = class ProductController extends crud_1.CrudController {
    productService;
    commandBus;
    constructor(productService, commandBus) {
        super(productService);
        this.productService = productService;
        this.commandBus = commandBus;
    }
    /**
     * GET all products translated
     *
     * @param langCode
     * @param data
     * @param page
     * @param limit
     * @returns
     */
    async findAllProductsTranslated(langCode, data, page, limit) {
        const { relations = [], findInput = null } = data;
        return this.productService.findAllProducts(langCode, relations, findInput, { page, limit });
    }
    /**
     * GET product by language & id
     *
     * @param id
     * @param langCode
     * @param data
     * @returns
     */
    async findOneProductTranslated(id, langCode, data) {
        const { relations = [] } = data;
        return this.productService.findByIdTranslated(langCode, id, relations);
    }
    /**
     * CRAETE product image gallery
     *
     * @param productId
     * @param images
     * @returns
     */
    async addGalleryImage(productId, images) {
        return this.productService.addGalleryImages(productId, images);
    }
    /**
     * UPDATE product set image as a feature
     *
     * @param productId
     * @param image
     * @returns
     */
    async setAsFeatured(productId, image) {
        return this.productService.setAsFeatured(productId, image);
    }
    /**
     * DELETE product gallery image by id
     *
     * @param productId
     * @param imageId
     * @returns
     */
    async deleteGaleryImage(productId, imageId) {
        return this.productService.deleteGalleryImage(productId, imageId);
    }
    /**
     * DELETE product feature image by product id
     *
     * @param productId
     * @returns
     */
    async deleteFeaturedImage(productId) {
        return this.productService.deleteFeaturedImage(productId);
    }
    /**
     * GET inventory products count
     *
     * @param data
     * @returns
     */
    async getCount(data) {
        const { findInput = null } = data;
        return await this.productService.count({
            where: {
                tenantId: context_1.RequestContext.currentTenantId(),
                ...findInput
            }
        });
    }
    /**
     * GET inventory products by pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter, themeLanguage) {
        return this.productService.pagination(filter, themeLanguage);
    }
    /**
     * GET all inventory products in the same tenant
     *
     * @param data
     * @param themeLanguage
     * @returns
     */
    async findAll(data, themeLanguage) {
        return await this.productService.findProducts(data, themeLanguage);
    }
    /**
     * GET product by id
     *
     * @param id
     * @param data
     * @returns
     */
    async findById(id, data) {
        const { relations = [], findInput = null } = data;
        return this.productService.findOneByIdString(id, {
            relations,
            where: findInput
        });
    }
    /**
     * CREATE new product
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.ProductCreateCommand(entity));
    }
    /**
     * UPDATE existing product by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.ProductUpdateCommand(id, entity));
    }
    /**
     * DELETE product by id
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await this.commandBus.execute(new commands_1.ProductDeleteCommand(id));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all products translated'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found products',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)('local/:langCode'),
    __param(0, (0, common_1.Param)('langCode')),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('_limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllProductsTranslated", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find one product translated'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)('local/:langCode/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Param)('langCode')),
    __param(2, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOneProductTranslated", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create gallery image' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The gallery image has been stored.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Post)('add-images/:productId'),
    __param(0, (0, common_1.Param)('productId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addGalleryImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Set featured image' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The featured image has been saved.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Post)('set-as-featured/:productId'),
    __param(0, (0, common_1.Param)('productId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "setAsFeatured", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete image from gallery' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Delete)(':productId/gallery-image/:imageId'),
    __param(0, (0, common_1.Param)('productId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Param)('imageId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteGaleryImage", null);
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
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Delete)('featured-image/:productId'),
    __param(0, (0, common_1.Param)('productId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteFeaturedImage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Products Count ' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Count Products',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getCount", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all products' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found products',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Product by id ' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record',
        type: product_entity_1.Product
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
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
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
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
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
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
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INVENTORY_PRODUCT_EDIT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('Product'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_service_1.ProductService, cqrs_1.CommandBus])
], ProductController);
//# sourceMappingURL=product.controller.js.map