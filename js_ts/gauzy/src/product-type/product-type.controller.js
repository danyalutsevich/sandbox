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
exports.ProductTypeController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const product_type_service_1 = require("./product-type.service");
const product_type_entity_1 = require("./product-type.entity");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const crud_1 = require("./../core/crud");
const dto_1 = require("./dto");
const commands_1 = require("./commands");
let ProductTypeController = exports.ProductTypeController = class ProductTypeController extends crud_1.CrudController {
    productTypesService;
    commandBus;
    constructor(productTypesService, commandBus) {
        super(productTypesService);
        this.productTypesService = productTypesService;
        this.commandBus = commandBus;
    }
    /**
     * GET inventory product types count
     *
     * @param data
     * @returns
     */
    async getCount(options) {
        return await this.productTypesService.countBy(options);
    }
    /**
     * GET inventory product types by pagination
     *
     * @param options
     * @param themeLanguage
     * @param languageCode
     * @returns
     */
    async pagination(options, themeLanguage, languageCode) {
        return await this.productTypesService.pagination(options, themeLanguage || languageCode);
    }
    /**
     * GET all product types
     *
     * @param options
     * @param themeLanguage
     * @returns
     */
    async findAll(options, themeLanguage, languageCode) {
        return await this.productTypesService.findProductTypes(options, themeLanguage || languageCode);
    }
    /**
     * CREATE product type
     *
     * @param entity
     * @returns
     */
    async create(entity, themeLanguage, languageCode) {
        return await this.commandBus.execute(new commands_1.ProductTypeCreateCommand(entity, themeLanguage || languageCode));
    }
    /**
     * UPDATE product type by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.productTypesService.updateProductType(id, entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Product Types Count ' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Count Product Types',
        type: product_type_entity_1.ProductType
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_TYPES_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all product types by pagination' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product types by pagination',
        type: product_type_entity_1.ProductType
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_TYPES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams, String, String]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all product types.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found product types.',
        type: product_type_entity_1.ProductType
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_TYPES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams, String, String]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "findAll", null);
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
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ProductTypeDTO, String, String]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "create", null);
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
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({
        transform: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ProductTypeDTO]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "update", null);
exports.ProductTypeController = ProductTypeController = __decorate([
    (0, swagger_1.ApiTags)('ProductTypes'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_PRODUCT_TYPES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_type_service_1.ProductTypeService, cqrs_1.CommandBus])
], ProductTypeController);
//# sourceMappingURL=product-type.controller.js.map