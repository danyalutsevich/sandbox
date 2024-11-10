"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantAwareCrudService = void 0;
const common_1 = require("@nestjs/common");
const contracts_1 = require("../../../plugins/contracts");
const common_2 = require("../../../plugins/common");
const context_1 = require("../context");
const crud_service_1 = require("./crud.service");
/**
 * This abstract class adds tenantId to all query filters if a user is available in the current RequestContext
 * If a user is not available in RequestContext, then it behaves exactly the same as CrudService
 */
class TenantAwareCrudService extends crud_service_1.CrudService {
    constructor(typeOrmRepository, mikroOrmRepository) {
        super(typeOrmRepository, mikroOrmRepository);
    }
    /**
     * Define find conditions when retrieving data with employee by user.
     *
     * @returns The find conditions based on the current user's relationship with employees.
     */
    findConditionsWithEmployeeByUser() {
        const employeeId = context_1.RequestContext.currentEmployeeId();
        return (
        /**
         * If the employee has logged in, retrieve their own data unless
         * they have the permission to change the selected employee.
         */
        ((0, common_2.isNotEmpty)(employeeId)
            ? !context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE) &&
                this.typeOrmRepository.metadata?.hasColumnWithPropertyPath('employeeId')
                ? {
                    employee: {
                        id: employeeId
                    },
                    employeeId: employeeId
                }
                : {}
            : {}));
    }
    /**
     * Define find conditions when retrieving data with tenant by user.
     *
     * @param user - The user for whom the conditions are defined.
     * @returns The find conditions based on the user's relationship with the tenant and employees.
     */
    findConditionsWithTenantByUser(user) {
        return {
            ...(this.typeOrmRepository.metadata?.hasColumnWithPropertyPath('tenantId')
                ? {
                    tenant: {
                        id: user.tenantId
                    },
                    tenantId: user.tenantId
                }
                : {}),
            ...this.findConditionsWithEmployeeByUser()
        };
    }
    /**
     * Define find conditions when retrieving data with tenant.
     *
     * @param user - The user for whom the conditions are defined.
     * @param where - Additional find options.
     * @returns The find conditions based on the user's relationship with the tenant and additional options.
     */
    findConditionsWithTenant(user, where) {
        if (where && Array.isArray(where)) {
            const wheres = [];
            where.forEach((options) => {
                wheres.push({
                    ...options,
                    ...this.findConditionsWithTenantByUser(user)
                });
            });
            return wheres;
        }
        return (where
            ? {
                ...where,
                ...this.findConditionsWithTenantByUser(user)
            }
            : {
                ...this.findConditionsWithTenantByUser(user)
            });
    }
    /**
     * Define find one options when retrieving data with tenant.
     *
     * @param filter - Additional find options.
     * @returns The find one options based on the current user's relationship with the tenant and additional options.
     */
    findOneWithTenant(filter) {
        const user = context_1.RequestContext.currentUser();
        if (!user || !user.tenantId) {
            return filter;
        }
        if (!filter) {
            return {
                where: this.findConditionsWithTenantByUser(user)
            };
        }
        if (!filter.where) {
            return {
                ...filter,
                where: this.findConditionsWithTenantByUser(user)
            };
        }
        if (filter.where instanceof Object) {
            return {
                ...filter,
                where: this.findConditionsWithTenant(user, filter.where)
            };
        }
        return filter;
    }
    /**
     * Define find many options when retrieving data with tenant.
     *
     * @param filter - Additional find options.
     * @returns The find many options based on the current user's relationship with the tenant and additional options.
     */
    findManyWithTenant(filter) {
        const user = context_1.RequestContext.currentUser();
        if (!user || !user.tenantId) {
            return filter;
        }
        if (!filter) {
            return {
                where: this.findConditionsWithTenantByUser(user)
            };
        }
        if (!filter.where) {
            return {
                ...filter,
                where: this.findConditionsWithTenantByUser(user)
            };
        }
        if (filter.where instanceof Object) {
            return {
                ...filter,
                where: this.findConditionsWithTenant(user, filter.where)
            };
        }
        return filter;
    }
    /**
     * Counts entities that match given options.
     * Useful for pagination.
     *
     * @param options
     * @returns
     */
    async count(options) {
        return await super.count(this.findManyWithTenant(options));
    }
    async countFast() {
        return await super.count();
    }
    /**
     * Counts entities that match given options.
     * Useful for pagination.
     *
     * @param options
     * @returns
     */
    async countBy(options) {
        const user = context_1.RequestContext.currentUser();
        return await super.countBy({
            ...options,
            ...this.findConditionsWithTenantByUser(user)
        });
    }
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     *
     * @param filter
     * @returns
     */
    async findAll(filter) {
        return await super.findAll(this.findManyWithTenant(filter));
    }
    /**
     * Finds entities that match given find options.
     *
     * @param filter
     * @returns
     */
    async find(filter) {
        return await super.find(this.findManyWithTenant(filter));
    }
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * But includes pagination settings
     *
     * @param filter
     * @returns
     */
    async paginate(filter) {
        return await super.paginate(this.findManyWithTenant(filter));
    }
    /*
    |--------------------------------------------------------------------------
    | @FindOneOrFail
    |--------------------------------------------------------------------------
    */
    /**
     * Finds first entity by a given find options with current tenant.
     * If entity was not found in the database - rejects with error.
     *
     * @param id
     * @param options
     * @returns
     */
    async findOneOrFailByIdString(id, options) {
        return await super.findOneOrFailByIdString(id, this.findOneWithTenant(options));
    }
    /**
     * Finds first entity that matches given options with current tenant.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    async findOneOrFailByOptions(options) {
        return await super.findOneOrFailByOptions(this.findOneWithTenant(options));
    }
    /**
     * Finds first entity that matches given where condition with current tenant.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    async findOneOrFailByWhereOptions(options) {
        const user = context_1.RequestContext.currentUser();
        return await super.findOneOrFailByWhereOptions({
            ...options,
            ...this.findConditionsWithTenantByUser(user)
        });
    }
    /*
    |--------------------------------------------------------------------------
    | @FindOne
    |--------------------------------------------------------------------------
    */
    /**
     * Finds first entity by a given find options with current tenant.
     * If entity was not found in the database - returns null.
     *
     * @param id
     * @param options
     * @returns
     */
    async findOneByIdString(id, options) {
        return await super.findOneByIdString(id, this.findOneWithTenant(options));
    }
    /**
     * Finds first entity that matches given options with current tenant.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    async findOneByOptions(options) {
        return await super.findOneByOptions(this.findOneWithTenant(options));
    }
    /**
     * Finds first entity that matches given where condition with current tenant.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    async findOneByWhereOptions(options) {
        const user = context_1.RequestContext.currentUser();
        return await super.findOneByWhereOptions({
            ...options,
            ...this.findConditionsWithTenantByUser(user)
        });
    }
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that are present in entity schema.
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const employeeId = context_1.RequestContext.currentEmployeeId();
        return await super.create({
            ...entity,
            ...(this.typeOrmRepository.metadata?.hasColumnWithPropertyPath('tenantId')
                ? {
                    tenant: {
                        id: tenantId
                    },
                    tenantId
                }
                : {}),
            /**
             * If employee has login & create data for self
             */
            ...((0, common_2.isNotEmpty)(employeeId)
                ? !context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE) &&
                    this.typeOrmRepository.metadata?.hasColumnWithPropertyPath('employeeId')
                    ? {
                        employee: {
                            id: employeeId
                        },
                        employeeId: employeeId
                    }
                    : {}
                : {})
        });
    }
    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     *
     * @param entity
     * @returns
     */
    async save(entity) {
        const tenantId = context_1.RequestContext.currentTenantId();
        return await super.save({
            ...entity,
            ...(this.typeOrmRepository.metadata?.hasColumnWithPropertyPath('tenantId')
                ? {
                    tenant: {
                        id: tenantId
                    },
                    tenantId
                }
                : {})
        });
    }
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     *
     * @param id
     * @param partialEntity
     * @returns
     */
    async update(id, partialEntity) {
        if (typeof id === 'string') {
            await this.findOneByIdString(id);
        }
        else if (typeof id === 'object') {
            await this.findOneByWhereOptions(id);
        }
        return await super.update(id, partialEntity);
    }
    /**
     * DELETE source related to tenant
     *
     * @param criteria - A string ID or a set of conditions to identify which record to delete.
     * @param options - Additional options for querying, such as extra conditions or query parameters.
     * @returns {Promise<DeleteResult>} - The result of the delete operation.
     */
    async delete(criteria, options) {
        try {
            // Merge additional where conditions from options into criteria if needed
            let where = typeof criteria === 'string' ? { id: criteria } : { ...criteria };
            if (options?.where) {
                where = { ...where, ...options.where };
            }
            const user = context_1.RequestContext.currentUser();
            // Proceed with the delete operation using the merged criteria
            return await super.delete({
                ...where,
                ...this.findConditionsWithTenantByUser(user)
            });
        }
        catch (err) {
            console.error('Error during delete operation:', err);
            throw new common_1.NotFoundException(`The record was not found`, err);
        }
    }
    /**
     * Softly deletes entities by a given criteria.
     * This method sets a flag or timestamp indicating the entity is considered deleted.
     * It does not actually remove the entity from the database, allowing for recovery or audit purposes.
     *
     * @param criteria - Entity ID or complex query to identify which entity to soft-delete.
     * @param options - Additional options for the operation.
     * @returns {Promise<DeleteResult>} - Result indicating success or failure.
     */
    async softDelete(criteria, options) {
        try {
            let record;
            // If the criteria is a string, assume it's an ID and find the record by ID.
            if (typeof criteria === 'string') {
                record = await this.findOneByIdString(criteria, options);
            }
            else {
                // Otherwise, consider it a more complex query and find the record by those options.
                record = await this.findOneByWhereOptions(criteria);
            }
            // If no record is found, throw a NotFoundException.
            if (!record) {
                throw new common_1.NotFoundException(`The requested record was not found`);
            }
            // Proceed with the soft-delete operation from the superclass.
            return await super.softDelete(criteria);
        }
        catch (err) {
            // If any error occurs, rethrow it as a NotFoundException with additional context.
            throw new common_1.NotFoundException(`The record was not found or could not be soft-deleted`, err);
        }
    }
}
exports.TenantAwareCrudService = TenantAwareCrudService;
//# sourceMappingURL=tenant-aware-crud.service.js.map