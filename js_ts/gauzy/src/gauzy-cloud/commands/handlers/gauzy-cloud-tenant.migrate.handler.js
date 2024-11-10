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
exports.GauzyCloudTenantMigrateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const gauzy_cloud_service_1 = require("../../gauzy-cloud.service");
const role_service_1 = require("./../../../role/role.service");
const gauzy_cloud_tenant_migrate_command_1 = require("./../gauzy-cloud-tenant.migrate.command");
const role_permission_service_1 = require("./../../../role-permission/role-permission.service");
let GauzyCloudTenantMigrateHandler = exports.GauzyCloudTenantMigrateHandler = class GauzyCloudTenantMigrateHandler {
    _gauzyCloudService;
    _roleService;
    _rolePermissionService;
    constructor(_gauzyCloudService, _roleService, _rolePermissionService) {
        this._gauzyCloudService = _gauzyCloudService;
        this._roleService = _roleService;
        this._rolePermissionService = _rolePermissionService;
    }
    async execute(command) {
        const { input, token } = command;
        return this._gauzyCloudService.migrateTenant(input, token).pipe((0, operators_1.tap)(async (response) => {
            if (response && response.data) {
                const tenant = response.data;
                this.migrateRoles(tenant, token);
                this.migratePermissions(tenant, token);
            }
        }), (0, operators_1.catchError)((error) => {
            console.log('Bad Promise:', error);
            return (0, rxjs_1.of)(error);
        }));
    }
    async migrateRoles(tenant, token) {
        return this._gauzyCloudService.migrateRoles(await this._roleService.migrateRoles(), token, tenant)
            .subscribe();
    }
    async migratePermissions(tenant, token) {
        return this._gauzyCloudService.migrateRolePermissions(await this._rolePermissionService.migratePermissions(), token, tenant)
            .subscribe();
    }
};
exports.GauzyCloudTenantMigrateHandler = GauzyCloudTenantMigrateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(gauzy_cloud_tenant_migrate_command_1.GauzyCloudTenantMigrateCommand),
    __metadata("design:paramtypes", [gauzy_cloud_service_1.GauzyCloudService,
        role_service_1.RoleService,
        role_permission_service_1.RolePermissionService])
], GauzyCloudTenantMigrateHandler);
//# sourceMappingURL=gauzy-cloud-tenant.migrate.handler.js.map