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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_manager_1 = require("@nestjs/cache-manager");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/common/dist/index");
const context_1 = require("./../../core/context");
const role_permission_service_1 = require("../../role-permission/role-permission.service");
let PermissionGuard = exports.PermissionGuard = class PermissionGuard {
    cacheManager;
    _reflector;
    _rolePermissionService;
    constructor(cacheManager, _reflector, _rolePermissionService) {
        this.cacheManager = cacheManager;
        this._reflector = _reflector;
        this._rolePermissionService = _rolePermissionService;
    }
    /**
     * Checks if the user is authorized based on specified permissions.
     * @param context The execution context.
     * @returns A promise that resolves to a boolean indicating authorization status.
     */
    async canActivate(context) {
        console.log('PermissionGuard canActivate called');
        // Retrieve permissions from metadata
        const targets = [context.getHandler(), context.getClass()];
        const permissions = (0, index_2.removeDuplicates)(this._reflector.getAllAndOverride(index_2.PERMISSIONS_METADATA, targets)) || [];
        // If no specific permissions are required, consider it authorized
        if ((0, index_2.isEmpty)(permissions)) {
            return true;
        }
        // Check user authorization
        const token = context_1.RequestContext.currentToken();
        const { id, role } = (0, jsonwebtoken_1.verify)(token, index_1.environment.JWT_SECRET);
        // Retrieve current role ID and tenant ID from RequestContext
        const tenantId = context_1.RequestContext.currentTenantId();
        const roleId = context_1.RequestContext.currentRoleId();
        const cacheKey = `userPermissions_${tenantId}_${roleId}_${permissions.join('_')}`;
        console.log('Checking User Permissions from Cache with key:', cacheKey);
        let isAuthorized = false;
        const fromCache = await this.cacheManager.get(cacheKey);
        if (fromCache == null) {
            console.log('User Permissions NOT loaded from Cache with key:', cacheKey);
            // Check if user has the required permissions
            isAuthorized = await this._rolePermissionService.checkRolePermission(tenantId, roleId, permissions, true);
            await this.cacheManager.set(cacheKey, isAuthorized, 5 * 60 * 1000 // 5 minutes cache expiration time for User Permissions
            );
        }
        else {
            isAuthorized = fromCache;
            console.log(`User Permissions loaded from Cache with key: ${cacheKey}. Value: ${isAuthorized}`);
        }
        // Log unauthorized access attempts
        if (!isAuthorized) {
            // Log unauthorized access attempts
            console.log(`Unauthorized access blocked: User ID: ${id}, Role: ${role}, Tenant ID:', ${tenantId}, Permissions Checked: ${permissions.join(', ')}`);
        }
        else {
            console.log(`Access granted.  User ID: ${id}, Role: ${role}, Tenant ID:', ${tenantId}, Permissions Checked: ${permissions.join(', ')}`);
        }
        return isAuthorized;
    }
};
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, core_1.Reflector,
        role_permission_service_1.RolePermissionService])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map