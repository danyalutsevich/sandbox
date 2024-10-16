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
exports.OrganizationLanguageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const organization_language_service_1 = require("./organization-language.service");
const organization_language_entity_1 = require("./organization-language.entity");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let OrganizationLanguageController = exports.OrganizationLanguageController = class OrganizationLanguageController extends crud_1.CrudController {
    organizationLanguageService;
    constructor(organizationLanguageService) {
        super(organizationLanguageService);
        this.organizationLanguageService = organizationLanguageService;
    }
    /**
     * GET all organization language
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.organizationLanguageService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE organization language
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return this.organizationLanguageService.create(entity);
    }
    /**
     * UPDATE organization language by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return this.organizationLanguageService.update(id, entity);
    }
    /**
     * DELETE organization language by id
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return this.organizationLanguageService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find Organization Language.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found Organization Language',
        type: organization_language_entity_1.OrganizationLanguage
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationLanguageController.prototype, "findAll", null);
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationLanguageController.prototype, "create", null);
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
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationLanguageController.prototype, "update", null);
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
], OrganizationLanguageController.prototype, "delete", null);
exports.OrganizationLanguageController = OrganizationLanguageController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationLanguage'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_language_service_1.OrganizationLanguageService])
], OrganizationLanguageController);
//# sourceMappingURL=organization-language.controller.js.map