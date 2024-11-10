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
exports.TenantPermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_manager_1 = require("@nestjs/cache-manager");
const contracts_1 = require("../../../plugins/contracts");
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/common/dist/index");
const context_1 = require("./../../core/context");
const tenant_base_guard_1 = require("./tenant-base.guard");
const role_permission_service_1 = require("../../role-permission/role-permission.service");
let TenantPermissionGuard = exports.TenantPermissionGuard = class TenantPermissionGuard extends tenant_base_guard_1.TenantBaseGuard {
    cacheManager;
    _reflector;
    _rolePermissionService;
    constructor(cacheManager, _reflector, _rolePermissionService) {
        super();
        this.cacheManager = cacheManager;
        this._reflector = _reflector;
        this._rolePermissionService = _rolePermissionService;
    }
    /**
     *
     * @param context
     * @returns
     */
    async canActivate(context) {
        console.log('TenantPermissionGuard canActivate called');
        const tenantId = context_1.RequestContext.currentTenantId();
        const roleId = context_1.RequestContext.currentRoleId();
        console.log('RequestContext', roleId);
        let isAuthorized = false;
        if (!tenantId) {
            console.log('tenantId is required');
            return isAuthorized;
        }
        // Check if the guard allows access based on the parent class's canActivate method
        isAuthorized = await super.canActivate(context);
        // If the guard disallows access, return early
        if (!isAuthorized) {
            console.log('isAuthorized');
            return isAuthorized;
        }
        // Check for super admin role
        if (index_1.environment.allowSuperAdminRole && context_1.RequestContext.hasRoles([contracts_1.RolesEnum.SUPER_ADMIN])) {
            console.log('Super admin role');
            return true;
        }
        // Retrieve permissions from metadata
        const targets = [context.getHandler(), context.getClass()];
        const permissions = (0, index_2.removeDuplicates)(this._reflector.getAllAndOverride(index_2.PERMISSIONS_METADATA, targets)) || [];
        console.log('permissions', permissions);
        // Check if permissions are not empty
        if ((0, index_2.isNotEmpty)(permissions)) {
            const cacheKey = `tenantPermissions_${tenantId}_${roleId}_${permissions.join('_')}`;
            console.log('Checking Tenant Permissions from Cache with key:', cacheKey);
            const fromCache = await this.cacheManager.get(cacheKey);
            if (fromCache == null) {
                console.log('Tenant Permissions NOT loaded from Cache with key:', cacheKey);
                // Check if the tenant has the required permissions
                isAuthorized = await this._rolePermissionService.checkRolePermission(tenantId, roleId, permissions);
                await this.cacheManager.set(cacheKey, isAuthorized, 5 * 60 * 1000 // 5 minutes caching period for Tenants Permissions
                );
            }
            else {
                isAuthorized = fromCache;
                console.log(`Tenant Permissions loaded from Cache with key: ${cacheKey}. Value: ${isAuthorized}`);
            }
        }
        // Log unauthorized access attempts
        if (!isAuthorized) {
            console.log(`Unauthorized access blocked. Tenant ID: ${tenantId}, Role ID: ${roleId}, Permissions Checked: ${permissions.join(', ')}`);
        }
        else {
            console.log(`Authorized access granted. Tenant ID: ${tenantId}, Role ID: ${roleId}, Permissions Checked: ${permissions.join(', ')}`);
        }
        return isAuthorized;
    }
};
exports.TenantPermissionGuard = TenantPermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, core_1.Reflector,
        role_permission_service_1.RolePermissionService])
], TenantPermissionGuard);
//# sourceMappingURL=tenant-permission.guard.js.map