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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const context_1 = require("../core/context");
const crud_1 = require("./../core/crud");
const utils_1 = require("./../core/utils");
const database_helper_1 = require("./../database/database.helper");
const repository_1 = require("./repository");
let EmployeeService = exports.EmployeeService = class EmployeeService extends crud_1.TenantAwareCrudService {
    typeOrmEmployeeRepository;
    mikroOrmEmployeeRepository;
    constructor(typeOrmEmployeeRepository, mikroOrmEmployeeRepository) {
        super(typeOrmEmployeeRepository, mikroOrmEmployeeRepository);
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.mikroOrmEmployeeRepository = mikroOrmEmployeeRepository;
    }
    /**
     * Finds employees based on an array of user IDs.
     * @param userIds An array of user IDs.
     * @returns A promise resolving to an array of employees.
     */
    async findEmployeesByUserIds(userIds) {
        try {
            // Get the tenant ID from the current request context
            const tenantId = context_1.RequestContext.currentTenantId();
            // Construct the base where clause for querying employees by user IDs
            const whereClause = {
                userId: (0, typeorm_1.In)(userIds),
                isActive: true,
                isArchived: false,
                ...(tenantId && { tenantId }) // Include tenant ID if available
            };
            // Execute the query based on the ORM type
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM: {
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({
                        where: whereClause
                    });
                    const employees = await this.mikroOrmRepository.find(where, mikroOptions);
                    return employees.map((entity) => this.serialize(entity));
                }
                case utils_1.MultiORMEnum.TypeORM: {
                    return await this.typeOrmRepository.find({ where: whereClause });
                }
                default:
                    throw new Error(`Method not implemented for ORM type: ${this.ormType}`);
            }
        }
        catch (error) {
            console.error(`Error finding employees by user IDs: ${error.message}`);
            return []; // Return an empty array if an error occurs
        }
    }
    /**
     * Finds the employeeId associated with a given userId.
     *
     * @param userId The ID of the user.
     * @returns The employeeId or null if not found or in case of an error.
     */
    async findEmployeeIdByUserId(userId) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            // Construct the where clause based on whether tenantId is available
            const whereClause = {
                userId,
                isActive: true,
                isArchived: false,
                ...(tenantId && { tenantId }) // Include tenantId if available
            };
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM: {
                    const employee = await this.mikroOrmRepository.findOne(whereClause);
                    return employee ? employee.id : null;
                }
                case utils_1.MultiORMEnum.TypeORM: {
                    const employee = await this.typeOrmRepository.findOne({ where: whereClause });
                    return employee ? employee.id : null;
                }
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        }
        catch (error) {
            console.error(`Error finding employee by userId: ${error.message}`);
            return null;
        }
    }
    /**
     * Finds an employee by user ID.
     *
     * @param userId The ID of the user to find.
     * @returns A Promise resolving to the employee if found, otherwise null.
     */
    async findOneByUserId(userId, options) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            // Construct the where clause based on whether tenantId is available
            const whereClause = {
                userId,
                isActive: true,
                isArchived: false,
                ...(tenantId && { tenantId }) // Include tenantId if available
            };
            const queryOptions = options ? { ...options } : {};
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    const item = await this.mikroOrmRepository.findOne(whereClause, mikroOptions);
                    return this.serialize(item);
                case utils_1.MultiORMEnum.TypeORM:
                    return this.typeOrmRepository.findOne({
                        where: whereClause,
                        ...queryOptions
                    });
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        }
        catch (error) {
            console.error(`Error finding employee by userId: ${error.message}`);
            return null;
        }
    }
    /**
     * Retrieves all active employees with their associated user and organization details.
     * @returns A Promise that resolves to an array of active employees.
     */
    async findAllActive() {
        try {
            return await super.find({
                where: { isActive: true, isArchived: false },
                relations: { user: true, organization: true }
            });
        }
        catch (error) {
            // Handle any potential errors, log, and optionally rethrow or return a default value.
            console.error('Error occurred while fetching active employees:', error);
            return [];
        }
    }
    /**
     * Find the employees working in the organization for a particular date range.
     * An employee is considered to be 'working' if:
     * 1. The startedWorkOn date is (not null and) less than the last day forMonth
     * 2. The endWork date is either null or greater than the first day forMonth
     * @param organizationId
     * @param forRange
     * @param withUser
     * @returns
     */
    async findWorkingEmployees(organizationId, forRange, withUser = false) {
        try {
            const query = this.typeOrmEmployeeRepository.createQueryBuilder(this.tableName);
            query.innerJoin(`${query.alias}.user`, 'user');
            query.innerJoin(`user.organizations`, 'organizations');
            query.setFindOptions({
                /**
                 * Load selected table properties/fields for self & relational select.
                 */
                select: {
                    id: true,
                    isActive: true,
                    short_description: true,
                    description: true,
                    averageIncome: true,
                    averageExpenses: true,
                    averageBonus: true,
                    startedWorkOn: true,
                    isTrackingEnabled: true,
                    billRateCurrency: true,
                    billRateValue: true,
                    minimumBillingRate: true,
                    userId: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        imageUrl: true,
                        timeZone: true,
                        timeFormat: true
                    }
                },
                relations: {
                    ...(withUser ? { user: true } : {})
                }
            });
            // Set up the where clause using the provided filter function
            query.where((qb) => {
                this.getFilterQuery(qb, organizationId, forRange);
            });
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            console.log('Error while getting working employees: %s', error);
        }
    }
    /**
     * Find the counts of employees working in the organization for a particular date range.
     * An employee is considered to be 'working' if:
     * 1. The startedWorkOn date is (not null and) less than the last day forMonth
     * 2. The endWork date is either null or greater than the first day forMonth
     * @param organizationId
     * @param forRange
     * @returns
     */
    async findWorkingEmployeesCount(organizationId, forRange) {
        try {
            const query = this.typeOrmEmployeeRepository.createQueryBuilder(this.tableName);
            query.innerJoin(`${query.alias}.user`, 'user');
            query.innerJoin(`user.organizations`, 'organizations');
            // Set up the where clause using the provided filter function
            query.where((qb) => {
                this.getFilterQuery(qb, organizationId, forRange);
            });
            const total = await query.getCount();
            return { total };
        }
        catch (error) {
            console.log('Error while getting working employee counts: %s', error);
        }
    }
    /**
     * Adds a filter to the TypeORM SelectQueryBuilder for the Employee entity based on specified conditions.
     *
     * @param qb - The TypeORM SelectQueryBuilder for the Employee entity.
     * @param organizationId - The organization ID to filter by.
     * @param forRange - An object representing a date range (IDateRangePicker) or any other type.
     */
    getFilterQuery(qb, organizationId, forRange) {
        // Retrieve the current tenant ID from the RequestContext
        const tenantId = context_1.RequestContext.currentTenantId();
        // Apply filter conditions using TypeORM SelectQueryBuilder
        qb.andWhere(new typeorm_1.Brackets((web) => {
            // Filter by tenant ID, organization ID, isActive, and isArchived
            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."isActive" = :isActive`), { isActive: true });
            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."isArchived" = :isArchived`), { isArchived: false });
            // Additional conditions for user isActive and isArchived
            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"user"."isActive" = :isActive`), { isActive: true });
            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"user"."isArchived" = :isArchived`), { isArchived: false });
        }));
        // Check for date range conditions
        if ((0, index_2.isNotEmpty)(forRange)) {
            if (forRange.startDate && forRange.endDate) {
                const { start: startDate, end: endDate } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(forRange.startDate), moment_1.default.utc(forRange.endDate));
                // Filter by startedWorkOn condition
                qb.andWhere(new typeorm_1.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedWorkOn" <= :startedWorkOn`), {
                        startedWorkOn: endDate
                    });
                }));
                // Filter by endWork condition (NULL or >= startDate)
                qb.andWhere(new typeorm_1.Brackets((web) => {
                    web.where((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."endWork" IS NULL`));
                    web.orWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."endWork" >= :endWork`), {
                        endWork: startDate
                    });
                }));
            }
        }
        // Check for permission CHANGE_SELECTED_EMPLOYEE
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            // Filter by current employee ID if the permission is not present
            const employeeId = context_1.RequestContext.currentEmployeeId();
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."id" = :employeeId`), { employeeId });
        }
    }
    /**
     * Get all employees using pagination
     *
     * @param options Pagination options
     * @returns Promise containing paginated employees and total count
     */
    async pagination(options) {
        try {
            // Retrieve the current tenant ID from the RequestContext
            const tenantId = context_1.RequestContext.currentTenantId();
            // Create a query builder for the Employee entity
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            // Tables joins with relations
            query.leftJoin(`${query.alias}.user`, 'user');
            query.leftJoin(`${query.alias}.tags`, 'tags');
            // Set pagination options and selected table properties/fields
            query.setFindOptions({
                skip: options && options.skip ? options.take * (options.skip - 1) : 0,
                take: options && options.take ? options.take : 10,
                select: {
                    // Selected fields for the Employee entity
                    id: true,
                    short_description: true,
                    description: true,
                    averageIncome: true,
                    averageExpenses: true,
                    averageBonus: true,
                    startedWorkOn: true,
                    endWork: true,
                    isTrackingEnabled: true,
                    deletedAt: true,
                    allowScreenshotCapture: true,
                    isActive: true,
                    isArchived: true
                },
                ...(options && options.relations ? { relations: options.relations } : {}),
                ...(options && 'withDeleted' in options ? { withDeleted: options.withDeleted } : {}) // Include soft-deleted parent entities
            });
            // Build WHERE clause using QueryBuilder
            query.where((qb) => {
                const { where } = options;
                // Apply conditions related to the current tenant and organization ID
                qb.andWhere(new typeorm_1.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                    if ((0, index_2.isNotEmpty)(where?.organizationId)) {
                        const organizationId = where.organizationId;
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
                    }
                }));
                // Additional conditions based on the provided 'where' object
                if ((0, index_2.isNotEmpty)(where)) {
                    // Apply conditions for specific fields in the Employee entity
                    qb.andWhere(new typeorm_1.Brackets((web) => {
                        const fields = ['isActive', 'isArchived', 'isTrackingEnabled', 'allowScreenshotCapture'];
                        fields.forEach((key) => {
                            if (key in where) {
                                web.andWhere((0, database_helper_1.prepareSQLQuery)(`${qb.alias}.${key} = :${key}`), { [key]: where[key] });
                            }
                        });
                    }));
                    // Apply conditions related to tags
                    qb.andWhere(new typeorm_1.Brackets((web) => {
                        if ((0, index_2.isNotEmpty)(where.tags)) {
                            web.andWhere((0, database_helper_1.prepareSQLQuery)('tags.id IN (:...tags)'), { tags: where.tags });
                        }
                    }));
                    // Apply conditions related to the user property in the 'where' object
                    qb.andWhere(new typeorm_1.Brackets((web) => {
                        const { user } = where;
                        if ((0, index_2.isNotEmpty)(user)) {
                            if ((0, index_2.isNotEmpty)(user.name)) {
                                const keywords = user.name.split(' ');
                                keywords.forEach((keyword, index) => {
                                    web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."firstName") like LOWER(:first_name_${index})`), {
                                        [`first_name_${index}`]: `%${keyword}%`
                                    });
                                    web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."lastName") like LOWER(:last_name_${index})`), {
                                        [`last_name_${index}`]: `%${keyword}%`
                                    });
                                });
                            }
                            if ((0, index_2.isNotEmpty)(user.email)) {
                                const keywords = user.email.split(' ');
                                keywords.forEach((keyword, index) => {
                                    web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."email") like LOWER(:email_${index})`), {
                                        [`email_${index}`]: `%${keyword}%`
                                    });
                                });
                            }
                        }
                    }));
                }
            });
            // Execute the query and retrieve paginated items and total count
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Softly delete an employee by ID, with organization and tenant constraints.
     *
     * @param employeeId - ID of the employee to delete.
     * @param options - Contains organizationId and possibly other per-tenant information.
     * @returns - UpdateResult or DeleteResult depending on the ORM type.
     */
    async softRemovedById(employeeId, options) {
        try {
            const { organizationId } = options;
            // Obtain tenant ID from the current request context
            const tenantId = context_1.RequestContext.currentTenantId() || options.tenantId;
            // Perform the soft delete operation
            return await super.softRemove(employeeId, {
                where: { organizationId, tenantId },
                relations: { user: true, teams: true }
            });
        }
        catch (error) {
            console.error('Error during soft delete for employee', error);
            throw new common_1.BadRequestException(error.message || 'Soft delete failed');
        }
    }
    /**
     * Restores a soft-deleted employee by ID.
     *
     * This method restores an employee who was previously soft-deleted. It uses the organization ID
     * and tenant ID to ensure that the correct employee is restored.
     *
     * @param employeeId The ID of the employee to restore.
     * @param options Additional context parameters, including organization ID and tenant ID.
     * @returns The restored Employee entity.
     * @throws BadRequestException if the employee cannot be restored or if an error occurs.
     */
    async softRecoverById(employeeId, options) {
        try {
            const { organizationId } = options;
            // Obtain the tenant ID from the current request context or the provided options
            const tenantId = context_1.RequestContext.currentTenantId() || options.tenantId;
            // Perform the soft recovery operation using the ID, organization ID, and tenant ID
            return await super.softRecover(employeeId, {
                where: { organizationId, tenantId },
                relations: { user: true, teams: true },
                withDeleted: true
            });
        }
        catch (error) {
            console.error('Error during soft recovery operation for employee:', error);
            // Throw a BadRequestException if any error occurs during soft recovery
            throw new common_1.BadRequestException(error.message || 'Failed to recover soft-deleted employee');
        }
    }
};
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmEmployeeRepository,
        repository_1.MikroOrmEmployeeRepository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map