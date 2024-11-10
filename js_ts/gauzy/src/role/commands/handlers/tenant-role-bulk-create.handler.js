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
exports.TenantRoleBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const role_permission_service_1 = require("../../../role-permission/role-permission.service");
const role_service_1 = require("../../role.service");
const tenant_role_bulk_create_command_1 = require("../tenant-role-bulk-create.command");
let TenantRoleBulkCreateHandler = exports.TenantRoleBulkCreateHandler = class TenantRoleBulkCreateHandler {
    roleService;
    rolePermissionService;
    constructor(roleService, rolePermissionService) {
        this.roleService = roleService;
        this.rolePermissionService = rolePermissionService;
    }
    /**
     * Executes a bulk role creation and permission update operation for tenants.
     * It first creates roles in bulk for the provided tenants and then updates their permissions accordingly.
     *
     * @param command An instance of TenantRoleBulkCreateCommand containing tenant data.
     * @returns A Promise that resolves to an array of IRole, representing the newly created roles.
     */
    async execute(command) {
        const { input: tenants } = command;
        //1. Create Roles of tenant.
        const roles = await this.roleService.createBulk(tenants);
        //2. Update RolePermission of tenant.
        await this.rolePermissionService.updateRolesAndPermissions(tenants);
        return roles;
    }
};
exports.TenantRoleBulkCreateHandler = TenantRoleBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_role_bulk_create_command_1.TenantRoleBulkCreateCommand),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        role_permission_service_1.RolePermissionService])
], TenantRoleBulkCreateHandler);
//# sourceMappingURL=tenant-role-bulk-create.handler.js.map