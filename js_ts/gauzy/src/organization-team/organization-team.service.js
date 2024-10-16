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
exports.OrganizationTeamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const internal_1 = require("../core/entities/internal");
const utils_1 = require("../core/utils");
const crud_1 = require("../core/crud");
const context_1 = require("../core/context");
const role_service_1 = require("../role/role.service");
const user_service_1 = require("./../user/user.service");
const organization_team_employee_service_1 = require("../organization-team-employee/organization-team-employee.service");
const task_service_1 = require("./../tasks/task.service");
const database_helper_1 = require("./../database/database.helper");
const repository_1 = require("../employee/repository");
const employee_service_1 = require("./../employee/employee.service");
const timer_service_1 = require("../time-tracking/timer/timer.service");
const statistic_1 = require("../time-tracking/statistic");
const repository_2 = require("./repository");
const mikro_orm_organization_team_employee_repository_1 = require("../organization-team-employee/repository/mikro-orm-organization-team-employee.repository");
let OrganizationTeamService = exports.OrganizationTeamService = class OrganizationTeamService extends crud_1.TenantAwareCrudService {
    typeOrmOrganizationTeamRepository;
    mikroOrmOrganizationTeamRepository;
    mikroOrmOrganizationTeamEmployeeRepository;
    typeOrmEmployeeRepository;
    statisticService;
    timerService;
    roleService;
    organizationTeamEmployeeService;
    userService;
    employeeService;
    taskService;
    constructor(typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository, mikroOrmOrganizationTeamEmployeeRepository, typeOrmEmployeeRepository, statisticService, timerService, roleService, organizationTeamEmployeeService, userService, employeeService, taskService) {
        super(typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository);
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
        this.mikroOrmOrganizationTeamRepository = mikroOrmOrganizationTeamRepository;
        this.mikroOrmOrganizationTeamEmployeeRepository = mikroOrmOrganizationTeamEmployeeRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.statisticService = statisticService;
        this.timerService = timerService;
        this.roleService = roleService;
        this.organizationTeamEmployeeService = organizationTeamEmployeeService;
        this.userService = userService;
        this.employeeService = employeeService;
        this.taskService = taskService;
    }
    /**
     * Execute the GetOrganizationTeamStatisticQuery.
     *
     * @param input - The input query for getting organization team statistics.
     * @returns The organization team with optional statistics.
     */
    async getOrganizationTeamStatistic(input) {
        try {
            const { organizationTeamId, query } = input;
            const { withLastWorkedTask } = query;
            /**
             * Find the organization team by ID with optional relations.
             */
            const options = query['relations'] ? { relations: query['relations'] } : {};
            const organizationTeam = await this.findOneByIdString(organizationTeamId, options);
            /**
             * If the organization team has 'members', sync last worked tasks based on the query.
             */
            if ('members' in organizationTeam && withLastWorkedTask) {
                organizationTeam['members'] = await this.syncLastWorkedTask(organizationTeamId, organizationTeam['members'], query);
            }
            return organizationTeam;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Synchronize last worked task information for members of an organization team.
     *
     * @param members - Array of organization team members.
     * @param input - Input parameters including date range and statistics options.
     * @returns A promise resolving to an array of organization team members with updated statistics.
     */
    async syncLastWorkedTask(organizationTeamId, members, input) {
        try {
            const { organizationId, startDate, endDate, withLastWorkedTask, source } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            const employeeIds = members.map(({ employeeId }) => employeeId);
            // Retrieves timer statistics with optional task relation.
            const statistics = await this.timerService.getTimerWorkedStatus({
                source,
                employeeIds,
                organizationId,
                tenantId,
                organizationTeamId,
                ...((0, index_2.parseToBoolean)(withLastWorkedTask) ? { relations: ['task'] } : {})
            });
            //
            const memberPromises = members.map(async (member) => {
                const { employeeId } = member;
                //
                const timerWorkedStatus = statistics.find((statistic) => statistic.lastLog.employeeId === employeeId);
                //
                const [totalWorkedTasks, totalTodayTasks] = await Promise.all([
                    this.statisticService.getTasks({
                        organizationId,
                        tenantId,
                        organizationTeamId,
                        employeeIds: [employeeId]
                    }),
                    this.statisticService.getTasks({
                        organizationId,
                        tenantId,
                        organizationTeamId,
                        employeeIds: [employeeId],
                        startDate,
                        endDate
                    })
                ]);
                return {
                    ...member,
                    lastWorkedTask: (0, index_2.parseToBoolean)(withLastWorkedTask) ? timerWorkedStatus?.lastLog?.task : null,
                    running: timerWorkedStatus?.running,
                    duration: timerWorkedStatus?.duration,
                    timerStatus: timerWorkedStatus?.timerStatus,
                    totalWorkedTasks,
                    totalTodayTasks
                };
            });
            return await Promise.all(memberPromises);
        }
        catch (error) {
            console.error('Error while retrieving team members last worked task', error);
            return []; // or handle the error in an appropriate way
        }
    }
    /**
     * Retrieves a collection of employees based on specified criteria.
     * @param memberIds - Array of member IDs to include in the query.
     * @param managerIds - Array of manager IDs to include in the query.
     * @param organizationId - The organization ID for filtering.
     * @param tenantId - The tenant ID for filtering.
     * @returns A Promise resolving to an array of Employee entities with associated user information.
     */
    async retrieveEmployees(memberIds, managerIds, organizationId, tenantId) {
        try {
            // Filter out falsy values (e.g., null or undefined) from the union of memberIds and managerIds
            const filteredIds = [...memberIds, ...managerIds].filter(Boolean);
            // Retrieve employees based on specified criteria
            const employees = await this.typeOrmEmployeeRepository.findBy({
                id: (0, typeorm_1.In)(filteredIds),
                organizationId,
                tenantId // Filtering by tenantId
            });
            return employees;
        }
        catch (error) {
            // Handle any potential errors during the retrieval process
            throw new Error(`Failed to retrieve employees: ${error}`);
        }
    }
    /**
     * Creates an organization team based on the provided input.
     * @param input - Input data for creating the organization team.
     * @returns A Promise resolving to the created organization team.
     * @throws BadRequestException if there is an error in the creation process.
     */
    async create(input) {
        const { tags = [], memberIds = [], managerIds = [], projects = [] } = input;
        const { name, organizationId, prefix, profile_link, logo, imageId } = input;
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const employeeId = context_1.RequestContext.currentEmployeeId();
            const currentRoleId = context_1.RequestContext.currentRoleId();
            // If, employee create teams, default add as a manager
            try {
                // Check if the current role is EMPLOYEE
                await this.roleService.findOneByIdString(currentRoleId, {
                    where: { name: index_1.RolesEnum.EMPLOYEE }
                });
                // Check if the employeeId is not already included in the managerIds array
                if (!managerIds.includes(employeeId)) {
                    // If not included, add the employeeId to the managerIds array
                    managerIds.push(employeeId);
                }
            }
            catch (error) { }
            // Retrieves a collection of employees based on specified criteria.
            const employees = await this.retrieveEmployees(memberIds, managerIds, organizationId, tenantId);
            // Find the manager role
            const managerRole = await this.roleService.findOneByWhereOptions({ name: index_1.RolesEnum.MANAGER });
            // Create a Set for faster membership checks
            const managerIdsSet = new Set(managerIds);
            // Use destructuring to directly extract 'id' from 'employee'
            const members = employees.map(({ id: employeeId }) => new internal_1.OrganizationTeamEmployee({
                employee: { id: employeeId },
                organization: { id: organizationId },
                tenant: { id: tenantId },
                role: managerIdsSet.has(employeeId) ? managerRole : null
            }));
            // Create the organization team with the prepared members
            return await super.create({
                organization: { id: organizationId },
                tenant: { id: tenantId },
                tags,
                name,
                prefix,
                members,
                profile_link,
                public: input.public,
                logo,
                imageId,
                projects
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create a team: ${error}`);
        }
    }
    /**
     * Update an organization team.
     *
     * @param id - The ID of the organization team to be updated.
     * @param input - The updated information for the organization team.
     * @returns A Promise resolving to the updated organization team.
     * @throws ForbiddenException if the user lacks permission or if certain conditions are not met.
     * @throws BadRequestException if there's an error during the update process.
     */
    async update(id, input) {
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const { managerIds, memberIds, organizationId } = input;
        let organizationTeam = await super.findOneByIdString(id, {
            where: { organizationId, tenantId }
        });
        // Check permission for CHANGE_SELECTED_EMPLOYEE
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            try {
                const employeeId = context_1.RequestContext.currentEmployeeId();
                // If employee ID is present, restrict update to manager role
                if (employeeId) {
                    organizationTeam = await super.findOneByIdString(id, {
                        where: {
                            organizationId,
                            tenantId,
                            members: {
                                employeeId,
                                tenantId,
                                organizationId,
                                role: { name: index_1.RolesEnum.MANAGER }
                            }
                        }
                    });
                }
            }
            catch (error) {
                throw new common_1.ForbiddenException();
            }
        }
        try {
            if ((0, index_2.isNotEmpty)(memberIds) || (0, index_2.isNotEmpty)(managerIds)) {
                // Find the manager role
                const role = await this.roleService.findOneByWhereOptions({
                    name: index_1.RolesEnum.MANAGER
                });
                // Retrieves a collection of employees based on specified criteria.
                const employees = await this.retrieveEmployees(memberIds, managerIds, organizationId, tenantId);
                // Update nested entity
                await this.organizationTeamEmployeeService.updateOrganizationTeam(id, organizationId, employees, role, managerIds, memberIds);
            }
            const { id: organizationTeamId } = organizationTeam;
            // Update the organization team with the prepared members
            return await super.create({
                ...input,
                organizationId,
                tenantId,
                id: organizationTeamId
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Find teams associated with the current user.
     *
     * @param options - Pagination options.
     * @returns A Promise resolving to the paginated list of teams.
     * @throws UnauthorizedException if an unauthorized user attempts to access this information.
     */
    async findMyTeams(options) {
        try {
            return await this.findAll(options);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(`Failed to find user's teams: ${error.message}`);
        }
    }
    /**
     * GET organization teams pagination by params
     *
     * @param filter
     * @returns
     */
    async pagination(options) {
        if ('where' in options) {
            const { where } = options;
            if ('name' in where) {
                options['where']['name'] = (0, typeorm_1.ILike)(`%${where.name}%`);
            }
            if ('tags' in where) {
                options['where']['tags'] = {
                    id: (0, typeorm_1.In)(where.tags)
                };
            }
        }
        return await this.findAll(options);
    }
    /**
     * Retrieves a paginated list of organization teams based on specified options.
     * @param options - Pagination and filtering options.
     * @returns A Promise resolving to an object containing paginated organization teams.
     */
    async findAll(options) {
        // Retrieve tenantId from RequestContext or options
        const tenantId = context_1.RequestContext.currentTenantId() || options?.where?.tenantId;
        // Initialize variables to store the retrieved items and total count.
        let items; // Array to store retrieved items
        let total; // Variable to store total count of items
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                /**
                 * Fetches distinct organization team IDs for a given employee.
                 * Filters based on employee ID, tenant ID, and optionally organization ID.
                 *
                 * @param employeeId - The ID of the employee to filter the teams by.
                 * @returns A Promise that resolves to an array of unique organization team IDs.
                 */
                const fetchDistinctOrgTeamIdsForEmployee = async (employeeId) => {
                    const knex = this.mikroOrmOrganizationTeamEmployeeRepository.getKnex();
                    // Construct your SQL query using knex
                    let sqlQuery = knex('organization_team_employee').select(knex.raw(`
							DISTINCT ON ("organization_team_employee"."organizationTeamId")
							"organization_team_employee"."organizationTeamId"
						`));
                    // Builds an SQL query with specific where clauses.
                    sqlQuery.andWhere({ tenantId });
                    sqlQuery.andWhere({ employeeId });
                    sqlQuery.andWhere({ isActive: true });
                    sqlQuery.andWhere({ isArchived: false });
                    // Apply the organization filter if available
                    if (options?.where?.organizationId) {
                        const { organizationId } = options.where;
                        sqlQuery.andWhere({ organizationId });
                    }
                    // Execute the raw SQL query and get the results
                    const rawResults = (await knex.raw(sqlQuery.toString())).rows || [];
                    const organizationTeamIds = rawResults.map((entry) => entry.organizationTeamId);
                    // Convert to string for the subquery
                    return organizationTeamIds || [];
                };
                // If admin has login and doesn't have permission to change employee
                if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                    const members = options?.where?.members;
                    if ('members' in options?.where) {
                        delete options.where['members'];
                    }
                    if ((0, index_2.isNotEmpty)(members) && (0, index_2.isNotEmpty)(members['employeeId'])) {
                        const employeeId = members['employeeId'];
                        // Fetches distinct organization team IDs for a given employee.
                        const organizationTeamIds = await fetchDistinctOrgTeamIdsForEmployee(employeeId);
                        options.where.id = (0, typeorm_1.In)(organizationTeamIds);
                    }
                }
                else {
                    // If employee has login and doesn't have permission to change employee
                    const employeeId = context_1.RequestContext.currentEmployeeId();
                    // Fetches distinct organization team IDs for a given employee.
                    const organizationTeamIds = await fetchDistinctOrgTeamIdsForEmployee(employeeId);
                    options.where.id = (0, typeorm_1.In)(organizationTeamIds);
                }
                // Converts TypeORM find options to a format compatible with MikroORM for a given entity.
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                // Retrieve the items and total count
                const [entities, totalEntities] = await this.mikroOrmOrganizationTeamRepository.findAndCount((0, utils_1.enhanceWhereWithTenantId)(tenantId, where), // Add a condition for the tenant ID
                mikroOptions);
                // Optionally serialize the items
                items = entities.map((item) => this.serialize(item));
                total = totalEntities;
                break;
            case utils_1.MultiORMEnum.TypeORM:
                // Create a query builder for the OrganizationTeam entity
                const typeOrmQueryBuilder = this.typeOrmRepository.createQueryBuilder(this.tableName);
                /**
                 * Generates a subquery for selecting organization team IDs based on specified conditions.
                 * @param cb - The SelectQueryBuilder instance for constructing the subquery.
                 * @param employeeId - The employee ID for filtering the teams.
                 * @returns A SQL condition string to be used in the main query's WHERE clause.
                 */
                const subQueryBuilder = (cb, employeeId) => {
                    const subQuery = cb.subQuery().select((0, database_helper_1.prepareSQLQuery)('"team"."organizationTeamId"'));
                    subQuery.from('organization_team_employee', 'team');
                    // Apply the tenant filter
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."tenantId" = :tenantId`), { tenantId });
                    // Apply the organization filter if available
                    if (options?.where?.organizationId) {
                        const { organizationId } = options.where;
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."organizationId" = :organizationId`), {
                            organizationId
                        });
                    }
                    // Additional conditions
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."isActive" = :isActive`), { isActive: true });
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."isArchived" = :isArchived`), { isArchived: false });
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."employeeId" = :employeeId`), { employeeId });
                    return (0, database_helper_1.prepareSQLQuery)(`"organization_team"."id" IN ${subQuery.distinct(true).getQuery()}`);
                };
                // If admin has login and doesn't have permission to change employee
                if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                    const members = options?.where?.members;
                    if ('members' in options?.where) {
                        delete options.where['members'];
                    }
                    if ((0, index_2.isNotEmpty)(members) && (0, index_2.isNotEmpty)(members['employeeId'])) {
                        const employeeId = members['employeeId'];
                        // Sub query to get only employee assigned teams
                        typeOrmQueryBuilder.andWhere((cb) => subQueryBuilder(cb, employeeId));
                    }
                }
                else {
                    // If employee has login and doesn't have permission to change employee
                    const employeeId = context_1.RequestContext.currentEmployeeId();
                    // Sub query to get only employee assigned teams
                    typeOrmQueryBuilder.andWhere((cb) => subQueryBuilder(cb, employeeId));
                }
                // Set query options
                if ((0, index_2.isNotEmpty)(options)) {
                    typeOrmQueryBuilder.setFindOptions({
                        ...(options.skip ? { skip: options.take * (options.skip - 1) } : {}),
                        ...(options.take ? { take: options.take } : {}),
                        ...(options.select ? { select: options.select } : {}),
                        ...(options.relations ? { relations: options.relations } : {}),
                        ...(options.where ? { where: options.where } : {}),
                        ...(options.order ? { order: options.order } : {})
                    });
                }
                // Apply the tenant filter
                typeOrmQueryBuilder.andWhere((0, database_helper_1.prepareSQLQuery)(`"${typeOrmQueryBuilder.alias}"."tenantId" = :tenantId`), { tenantId });
                // Retrieve the items and total count
                [items, total] = await typeOrmQueryBuilder.getManyAndCount();
                // Return paginated result
                return { items, total };
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        return { items, total };
    }
    /**
     * Delete an organization team.
     *
     * @param teamId - The ID of the organization team to be deleted.
     * @param options - Additional options for the deletion, such as organizationId.
     * @returns A Promise resolving to the result of the deletion operation.
     * @throws ForbiddenException if the current context lacks the necessary permission.
     */
    async deleteTeam(teamId, options) {
        try {
            const { organizationId } = options;
            const tenantId = context_1.RequestContext.currentTenantId() || options.tenantId;
            const team = await this.findOneByIdString(teamId, {
                where: {
                    tenantId,
                    organizationId,
                    ...(!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)
                        ? {
                            members: {
                                employeeId: context_1.RequestContext.currentEmployeeId(),
                                role: {
                                    name: index_1.RolesEnum.MANAGER
                                }
                            }
                        }
                        : {})
                }
            });
            // Check if the team was found before attempting deletion
            if (team) {
                return await this.typeOrmRepository.remove(team);
            }
            else {
                // You might want to handle the case where the team was not found differently
                throw new common_1.NotFoundException(`Organization team with ID ${teamId} not found.`);
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * Checks if a user is a member of any teams and performs necessary actions.
     *
     * @param userId - The ID of the user to check.
     * @returns A Promise resolving to the result of the operation.
     * @throws ForbiddenException if the current context lacks the necessary permission or if the user is not found or not associated with an employee.
     */
    async existTeamsAsMember(userId) {
        const currentUserId = context_1.RequestContext.currentUserId();
        // If user don't have enough permission (CHANGE_SELECTED_EMPLOYEE).
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            // If user try to delete someone other user account, just denied the request.
            if (currentUserId != userId) {
                throw new common_1.ForbiddenException('You can not removed account for other members!');
            }
        }
        const user = await this.userService.findOneByIdString(userId);
        if (!user) {
            throw new common_1.ForbiddenException('User not found!');
        }
        const employee = await this.employeeService.findOneByOptions({
            where: {
                userId: user.id
            }
        });
        if (!employee) {
            throw new common_1.ForbiddenException('User is not associated with an employee!');
        }
        try {
            // Check if the user is only a manager (has no specific role)
            await this.organizationTeamEmployeeService.findOneByOptions({
                where: {
                    employeeId: employee.id,
                    roleId: (0, typeorm_1.IsNull)()
                }
            });
            // Unassign this user from all tasks in a team
            await this.taskService.unassignEmployeeFromTeamTasks(employee.id, undefined);
            // Delete the team employee record
            return await this.organizationTeamEmployeeService.delete({
                employeeId: employee.id,
                roleId: (0, typeorm_1.IsNull)()
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException('You are not able to removed account where you are only the manager!');
        }
    }
};
exports.OrganizationTeamService = OrganizationTeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.TypeOrmOrganizationTeamRepository,
        repository_2.MikroOrmOrganizationTeamRepository,
        mikro_orm_organization_team_employee_repository_1.MikroOrmOrganizationTeamEmployeeRepository,
        repository_1.TypeOrmEmployeeRepository,
        statistic_1.StatisticService,
        timer_service_1.TimerService,
        role_service_1.RoleService,
        organization_team_employee_service_1.OrganizationTeamEmployeeService,
        user_service_1.UserService,
        employee_service_1.EmployeeService,
        task_service_1.TaskService])
], OrganizationTeamService);
//# sourceMappingURL=organization-team.service.js.map