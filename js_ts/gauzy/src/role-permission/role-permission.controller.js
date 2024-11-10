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
exports.RolePermissionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
const role_permission_entity_1 = require("./role-permission.entity");
const role_permission_service_1 = require("./role-permission.service");
let RolePermissionController = exports.RolePermissionController = class RolePermissionController extends crud_1.CrudController {
    _rolePermissionService;
    constructor(_rolePermissionService) {
        super(_rolePermissionService);
        this._rolePermissionService = _rolePermissionService;
    }
    /**
     * Import/Migrate role-permissions for specific tenant
     *
     * @param input
     * @returns
     */
    async importRole(input) {
        return await this._rolePermissionService.migrateImportRecord(input);
    }
    /**
     * Retrieves the permissions of the current user.
     *
     * @return {Promise<IPagination<RolePermission>>} A Promise that resolves to a paginated list of RolePermission objects.
     */
    async findMePermissions() {
        return await this._rolePermissionService.findMePermissions();
    }
    /**
     * GET role-permissions for specific tenant
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this._rolePermissionService.findAllRolePermissions(options);
    }
    /**
     * GET all role permissions for specific tenant
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        console.log('Received data:', data);
        const { findInput } = data;
        return this._rolePermissionService.findAllRolePermissions({ where: findInput });
    }
    /**
     * CREATE role permissions for specific tenant
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return this._rolePermissionService.createPermission(entity);
    }
    /**
     * UPDATE role permissions for specific tenant
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this._rolePermissionService.updatePermission(id, entity);
    }
    /**
     * DELETE role permissions for specific tenant
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await this._rolePermissionService.deletePermission(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Import role-permissions from self hosted to gauzy cloud hosted in bulk' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Role Permissions have been successfully imported.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The request body may contain clues as to what went wrong'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.MIGRATE_GAUZY_CLOUD),
    (0, common_1.Post)('import/migrate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "importRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find current user permissions.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found current user permissions',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Permissions not found'
    }),
    (0, decorators_1.Permissions)(),
    (0, common_1.Get)('/me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "findMePermissions", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find role permissions.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found role permissions.',
        type: role_permission_entity_1.RolePermission
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "findAll", null);
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
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRolePermissionDTO]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "create", null);
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
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateRolePermissionDTO]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolePermissionController.prototype, "delete", null);
exports.RolePermissionController = RolePermissionController = __decorate([
    (0, swagger_1.ApiTags)('Role')
    //@UseGuards(TenantPermissionGuard, PermissionGuard)
    //@Permissions(PermissionsEnum.CHANGE_ROLES_PERMISSIONS)
    ,
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [role_permission_service_1.RolePermissionService])
], RolePermissionController);
//# sourceMappingURL=role-permission.controller.js.map