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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationPermissionGuard = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const camelcase_1 = __importDefault(require("camelcase"));
const contracts_1 = require("../../../plugins/contracts");
const index_2 = require("../../../plugins/common/dist/index");
const context_1 = require("./../../core/context");
const repository_1 = require("../../employee/repository");
const utils_1 = require("../../core/utils");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
let OrganizationPermissionGuard = exports.OrganizationPermissionGuard = class OrganizationPermissionGuard {
    cacheManager;
    _reflector;
    _typeOrmEmployeeRepository;
    _mikroOrmEmployeeRepository;
    constructor(cacheManager, _reflector, _typeOrmEmployeeRepository, _mikroOrmEmployeeRepository) {
        this.cacheManager = cacheManager;
        this._reflector = _reflector;
        this._typeOrmEmployeeRepository = _typeOrmEmployeeRepository;
        this._mikroOrmEmployeeRepository = _mikroOrmEmployeeRepository;
    }
    /**
     * Checks if the user is authorized based on specified permissions.
     * @param context The execution context.
     * @returns A promise that resolves to a boolean indicating authorization status.
     */
    async canActivate(context) {
        console.log('OrganizationPermissionGuard canActivate called');
        // Retrieve permissions from metadata
        const targets = [context.getHandler(), context.getClass()];
        const permissions = (0, index_2.removeDuplicates)(this._reflector.getAllAndOverride(index_2.PERMISSIONS_METADATA, targets)) || [];
        // If no specific permissions are required, consider it authorized
        if ((0, index_2.isEmpty)(permissions)) {
            return true;
        }
        let isAuthorized = false;
        // Check user authorization
        const token = context_1.RequestContext.currentToken();
        const { id, role, employeeId } = (0, jsonwebtoken_1.verify)(token, index_1.environment.JWT_SECRET);
        // Check if super admin role is allowed from the .env file
        if (index_1.environment.allowSuperAdminRole && context_1.RequestContext.hasRoles([contracts_1.RolesEnum.SUPER_ADMIN])) {
            return true;
        }
        // Check permissions based on user role
        if (role === contracts_1.RolesEnum.EMPLOYEE) {
            const tenantId = context_1.RequestContext.currentTenantId();
            const cacheKey = `orgPermissions_${tenantId}_${employeeId}_${permissions.join('_')}`;
            console.log(`Guard: Checking Org Permissions for Employee ID: ${employeeId} from Cache with key ${cacheKey}`);
            const fromCache = await this.cacheManager.get(cacheKey);
            if (fromCache == null) {
                console.log('Organization Permissions NOT loaded from Cache with key:', cacheKey);
                // Check if user has the required permissions
                isAuthorized = await this.checkOrganizationPermission(tenantId, employeeId, permissions);
                const ttl = 5 * 60 * 1000; // 5 minutes caching period for Organization Permissions
                await this.cacheManager.set(cacheKey, isAuthorized, ttl);
            }
            else {
                isAuthorized = fromCache;
                console.log(`Organization Permissions loaded from Cache with key: ${cacheKey}. Value: ${isAuthorized}`);
            }
        }
        else {
            // For non-employee roles, consider it authorized
            // TODO: why!? This should be handled differently I think...
            // If it's not Employee, but say Viewer, it should still check the permissions...
            isAuthorized = true;
        }
        if (!isAuthorized) {
            // Log unauthorized access attempts
            console.log(`Unauthorized access blocked: User ID: ${id}, Role: ${role}, Employee ID: ${employeeId}, Permissions Checked: ${permissions.join(', ')}`);
        }
        else {
            console.log(`Access granted.  User ID: ${id}, Role: ${role}, Employee ID: ${employeeId}, Permissions Checked: ${permissions.join(', ')}`);
        }
        return isAuthorized;
    }
    /**
     * Checks if the employee has at least one specified permission in the associated organization.
     * @param employeeId - The ID of the employee to check permissions for.
     * @param permissions - An array of permission strings to check.
     * @returns A Promise that resolves to a boolean indicating if at least one permission is allowed in the organization.
     */
    async checkOrganizationPermission(tenantId, employeeId, permissions) {
        try {
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    try {
                        // Create a QueryBuilder for the Employee entity
                        const mikroOrmQueryBuilder = this._mikroOrmEmployeeRepository.createQueryBuilder('employee');
                        // Join with another table/entity, 'organization'
                        mikroOrmQueryBuilder.innerJoin(`${mikroOrmQueryBuilder.alias}.organization`, 'organization');
                        // Add a condition for the employee ID
                        mikroOrmQueryBuilder.where({ id: employeeId });
                        // Add a condition for the tenant ID
                        mikroOrmQueryBuilder.andWhere({ tenantId: tenantId });
                        // Directly add the OR conditions to the query if permissions array is not empty
                        if (permissions.length > 0) {
                            const orConditions = permissions.map((permission) => {
                                const field = `organization.${(0, camelcase_1.default)(permission)}`;
                                return { [field]: true };
                            });
                            // Use OR condition for each permission
                            mikroOrmQueryBuilder.andWhere({ $or: orConditions });
                        }
                        // Execute the query and get the count
                        const count = await mikroOrmQueryBuilder.getCount();
                        // Returns true if at least one record is found, false otherwise
                        return count > 0;
                    }
                    catch (error) {
                        console.log(`Error occurred while checking ${utils_1.MultiORMEnum.TypeORM} organization permission:`, error);
                        return false;
                    }
                case utils_1.MultiORMEnum.TypeORM:
                    try {
                        // Create a query builder for the 'employee' entity
                        const typeOrmQueryBuilder = this._typeOrmEmployeeRepository.createQueryBuilder('employee');
                        // (Optional) Inner join with another table/entity, for example, 'organization'
                        typeOrmQueryBuilder.innerJoin(`${typeOrmQueryBuilder.alias}.organization`, 'organization');
                        // Add a condition for the employee ID
                        typeOrmQueryBuilder.where(`${typeOrmQueryBuilder.alias}.id = :employeeId`, { employeeId });
                        // Add a condition for the tenant ID
                        typeOrmQueryBuilder.andWhere(`${typeOrmQueryBuilder.alias}.tenantId = :tenantId`, { tenantId });
                        // Use OR condition for each permission
                        typeOrmQueryBuilder.andWhere(new typeorm_1.Brackets((qb) => {
                            permissions.forEach((permission) => {
                                qb.orWhere(`organization.${(0, camelcase_1.default)(permission)} = true`);
                            });
                        }));
                        // Execute the query
                        const count = await typeOrmQueryBuilder.getCount(); // Execute the query and get the count
                        // Returns true if at least one permission is allowed in the organization, false otherwise
                        return count > 0;
                    }
                    catch (error) {
                        console.log(`Error occurred while checking ${utils_1.MultiORMEnum.TypeORM} organization permission:`, error);
                        return false;
                    }
                default:
                    break;
            }
        }
        catch (error) {
            // Handle any potential errors, log, and optionally rethrow or return a default value.
            console.error('Error occurred while checking organization permission:', error);
            return false;
        }
    }
};
exports.OrganizationPermissionGuard = OrganizationPermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, core_1.Reflector,
        repository_1.TypeOrmEmployeeRepository,
        repository_1.MikroOrmEmployeeRepository])
], OrganizationPermissionGuard);
//# sourceMappingURL=organization-permission.guard.js.map