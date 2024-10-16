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
exports.TenantController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const context_1 = require("../core/context");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("../shared/pipes");
const dto_1 = require("./dto");
const tenant_service_1 = require("./tenant.service");
let TenantController = exports.TenantController = class TenantController {
    tenantService;
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    /**
     * GET Owner Tenant
     *
     * @returns
     */
    async findById() {
        const tenantId = context_1.RequestContext.currentTenantId();
        return await this.tenantService.findOneByIdString(tenantId);
    }
    /**
     * CREATE Owner Tenant
     *
     * @returns
     */
    async create(entity) {
        const user = context_1.RequestContext.currentUser();
        if (user.tenantId || user.roleId) {
            throw new common_1.BadRequestException('Tenant already exists');
        }
        return await this.tenantService.onboardTenant(entity, user);
    }
    /**
     * UPDATE Owner Tenant
     *
     * @returns
     */
    async update(entity) {
        try {
            return await this.tenantService.update(context_1.RequestContext.currentTenantId(), entity);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * DELETE Owner Tenant
     *
     * @returns
     */
    async delete() {
        try {
            return await this.tenantService.delete(context_1.RequestContext.currentTenantId());
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tenant record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Tenant record not found'
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create new tenant. The user who creates the tenant is given the super admin role.',
        security: [
            {
                role: [index_1.RolesEnum.SUPER_ADMIN]
            }
        ]
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTenantDTO]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update existing tenant. The user who updates the tenant is given the super admin role.',
        security: [
            {
                role: [index_1.RolesEnum.SUPER_ADMIN]
            }
        ]
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: 'The record has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.SUPER_ADMIN),
    (0, common_1.Put)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateTenantDTO]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete tenant',
        security: [
            {
                role: [index_1.RolesEnum.SUPER_ADMIN]
            }
        ]
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The tenant has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Tenant record not found'
    }),
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.SUPER_ADMIN),
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "delete", null);
exports.TenantController = TenantController = __decorate([
    (0, swagger_1.ApiTags)('Tenant'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantController);
//# sourceMappingURL=tenant.controller.js.map