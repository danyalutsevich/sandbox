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
exports.OrganizationEmploymentTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const organization_employment_type_entity_1 = require("./organization-employment-type.entity");
const organization_employment_type_service_1 = require("./organization-employment-type.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let OrganizationEmploymentTypeController = exports.OrganizationEmploymentTypeController = class OrganizationEmploymentTypeController extends crud_1.CrudController {
    organizationEmploymentTypeService;
    constructor(organizationEmploymentTypeService) {
        super(organizationEmploymentTypeService);
        this.organizationEmploymentTypeService = organizationEmploymentTypeService;
    }
    /**
     * GET all organization employment types
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { findInput, relations } = data;
        return this.organizationEmploymentTypeService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * UPDATE organization employment type by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        try {
            return this.organizationEmploymentTypeService.create({
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
        summary: 'Find all organization employment types.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employment types',
        type: organization_employment_type_entity_1.OrganizationEmploymentType
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
], OrganizationEmploymentTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, organization_employment_type_entity_1.OrganizationEmploymentType]),
    __metadata("design:returntype", Promise)
], OrganizationEmploymentTypeController.prototype, "update", null);
exports.OrganizationEmploymentTypeController = OrganizationEmploymentTypeController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationEmploymentType'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_employment_type_service_1.OrganizationEmploymentTypeService])
], OrganizationEmploymentTypeController);
//# sourceMappingURL=organization-employment-type.controller.js.map