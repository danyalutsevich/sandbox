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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const role_service_1 = require("./role.service");
const role_entity_1 = require("./role.entity");
const dto_1 = require("./dto");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
let RoleController = exports.RoleController = class RoleController extends crud_1.CrudController {
    roleService;
    constructor(roleService) {
        super(roleService);
        this.roleService = roleService;
    }
    /**
     * GET role by where condition
     *
     * @param options
     * @returns
     */
    async findOneRoleByOptions(options) {
        try {
            try {
                return await this.roleService.findOneByIdString(context_1.RequestContext.currentRoleId(), {
                    where: {
                        name: index_1.RolesEnum.EMPLOYEE
                    }
                });
            }
            catch (e) {
                return await this.roleService.findOneByWhereOptions(options);
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * GET roles for specific tenant
     *
     * @returns
     */
    async findAll() {
        return await this.roleService.findAll();
    }
    /**
     * CREATE role for specific tenant
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        try {
            return await this.roleService.create(entity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * UPDATE role by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        try {
            await this.roleService.findOneByIdString(id);
            return await this.roleService.update(id, entity);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * Deletes a role by its ID.
     * This endpoint handles HTTP DELETE requests to delete a role identified by the given ID.
     *
     * @param id - The UUID of the role to delete.
     * @returns {Promise<DeleteResult>} - The result of the delete operation.
     */
    async delete(id) {
        try {
            return await this.roleService.delete(id);
        }
        catch (error) {
            console.error('Error while deleting role:', error);
            throw new common_1.ForbiddenException(`Deletion of role with ID ${id} is forbidden`);
        }
    }
    /**
     * Import self hosted to gauzy cloud
     *
     * @param input
     * @returns
     */
    async importRole(input) {
        return await this.roleService.migrateImportRecord(input);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find role.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found role',
        type: role_entity_1.Role
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.CHANGE_ROLES_PERMISSIONS, index_1.PermissionsEnum.ORG_TEAM_ADD),
    (0, common_1.Get)('options'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindRoleQueryDTO]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findOneRoleByOptions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find roles.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found roles.',
        type: role_entity_1.Role
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRoleDTO]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateRoleDTO]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Import role from self hosted to gauzy cloud hosted in bulk' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Role have been successfully imported.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The request body may contain clues as to what went wrong'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.MIGRATE_GAUZY_CLOUD),
    (0, common_1.Post)('import/migrate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "importRole", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiTags)('Role')
    //@UseGuards(TenantPermissionGuard, PermissionGuard)
    ,
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.CHANGE_ROLES_PERMISSIONS),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map