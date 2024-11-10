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
exports.ProductCategoryController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const product_category_entity_1 = require("./product-category.entity");
const product_category_service_1 = require("./product-category.service");
const crud_1 = require("./../core/crud");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./dto");
const commands_1 = require("./commands");
let ProductCategoryController = exports.ProductCategoryController = class ProductCategoryController extends crud_1.CrudController {
    productCategoryService;
    commandBus;
    constructor(productCategoryService, commandBus) {
        super(productCategoryService);
        this.productCategoryService = productCategoryService;
        this.commandBus = commandBus;
    }
    /**
     * GET inventory product categories count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.productCategoryService.countBy(options);
    }
    /**
     * GET inventory product categories by pagination
     *
     * @param options
     * @returns
     */
    async pagination(options, themeLanguage, languageCode) {
        return await this.productCategoryService.pagination(options, themeLanguage || languageCode);
    }
    /**
     * GET all product categories
     *
     * @param options
     * @param themeLanguage
     * @param languageCode
     * @returns
     */
    async findAll(options, themeLanguage, languageCode) {
        return await this.productCategoryService.findProductCategories(options, themeLanguage || languageCode);
    }
    /**
     * CREATE product category
     *
     * @param entity
     * @returns
     */
    async create(entity, themeLanguage, languageCode) {
        return await this.commandBus.execute(new commands_1.ProductCategoryCreateCommand(entity, themeLanguage || languageCode));
    }
    /**
     * UPDATE product category by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.productCategoryService.updateProductCategory(id, entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find product categories Count ' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Count product categories',
        type: product_category_entity_1.ProductCategory
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_CATEGORIES_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all product categories by pagination' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product categories by pagination',
        type: product_category_entity_1.ProductCategory
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_CATEGORIES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams, String, String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all product categories.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product categories.',
        type: product_category_entity_1.ProductCategory
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_CATEGORIES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams, String, String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ProductCategoryDTO, String, String]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "create", null);
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
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ProductCategoryDTO]),
    __metadata("design:returntype", Promise)
], ProductCategoryController.prototype, "update", null);
exports.ProductCategoryController = ProductCategoryController = __decorate([
    (0, swagger_1.ApiTags)('ProductCategories'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_CATEGORIES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_category_service_1.ProductCategoryService,
        cqrs_1.CommandBus])
], ProductCategoryController);
//# sourceMappingURL=product-category.controller.js.map