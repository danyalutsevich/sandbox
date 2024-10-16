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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrganizationDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const user_organization_delete_command_1 = require("../user-organization.delete.command");
const user_service_1 = require("../../../user/user.service");
const user_organization_services_1 = require("../../user-organization.services");
const role_service_1 = require("../../../role/role.service");
const index_1 = require("../../../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
/**
 * 1. Remove user from given organization if user belongs to multiple organizations
 * 2. Remove user record if the user belongs only to the given organization
 * 3. Allow the deletion of Admin and Super Admin Users only if there are more than 1 users of that Role.
 * 4. When a Super Admins are deleted, they must be removed from all existing organizations.
 * 5. Super Admin user can be deleted only by a Super Admin user.
 */
let UserOrganizationDeleteHandler = exports.UserOrganizationDeleteHandler = class UserOrganizationDeleteHandler {
    userOrganizationService;
    userService;
    roleService;
    i18n;
    constructor(userOrganizationService, userService, roleService, i18n) {
        this.userOrganizationService = userOrganizationService;
        this.userService = userService;
        this.roleService = roleService;
        this.i18n = i18n;
    }
    async execute(command) {
        const { input } = command;
        // 1. find user to delete
        const { user: { role: { name: roleName } }, userId } = await this.userOrganizationService.findOneByIdString(input.userOrganizationId, { relations: ['user', 'user.role'] });
        // 2. Handle Super Admin Deletion if applicable
        if (roleName === index_1.RolesEnum.SUPER_ADMIN)
            return this._removeSuperAdmin(input.requestingUser, userId, input.language);
        return this._removeUserFromOrganization(userId, input.userOrganizationId);
    }
    async _removeUserFromOrganization(userId, userOrganizationId) {
        // 1. get count of organizations the user belongs to
        const { total } = await this.userOrganizationService.findAll({
            where: { userId }
        });
        return total === 1
            ? this.userService.delete(userId)
            : this.userOrganizationService.delete(userOrganizationId);
    }
    async _removeSuperAdmin(requestingUser, userId, language) {
        // 1. Check if the requesting user has permission to delete Super Admin
        const { name: requestingUserRoleName } = await this.roleService.findOneByIdString(requestingUser.roleId);
        if (requestingUserRoleName !== index_1.RolesEnum.SUPER_ADMIN)
            throw new common_1.UnauthorizedException('Only Super Admin user can delete Super Admin users');
        // 2. Check if there are at least 2 Super Admins before deleting Super Admin user
        const { total } = await this.userService.findAll({
            where: {
                role: { id: requestingUser.roleId },
                tenant: { id: requestingUser.tenantId }
            },
            relations: ['role', 'tenant']
        });
        if (total === 1)
            throw new common_1.BadRequestException(await this.i18n.translate('USER_ORGANIZATION.CANNOT_DELETE_ALL_SUPER_ADMINS', {
                lang: language,
                args: { count: 1 }
            }));
        // 3. Delete Super Admin user from all organizations
        return this.userService.delete(userId);
    }
};
exports.UserOrganizationDeleteHandler = UserOrganizationDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(user_organization_delete_command_1.UserOrganizationDeleteCommand),
    __metadata("design:paramtypes", [user_organization_services_1.UserOrganizationService,
        user_service_1.UserService,
        role_service_1.RoleService,
        nestjs_i18n_1.I18nService])
], UserOrganizationDeleteHandler);
//# sourceMappingURL=user-organization.delete.handler.js.map