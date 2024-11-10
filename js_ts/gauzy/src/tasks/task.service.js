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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const index_3 = require("../../plugins/config/dist/index");
const crud_1 = require("./../core/crud");
const context_1 = require("../core/context");
const database_helper_1 = require("./../database/database.helper");
const type_orm_task_repository_1 = require("./repository/type-orm-task.repository");
const mikro_orm_task_repository_1 = require("./repository/mikro-orm-task.repository");
let TaskService = exports.TaskService = class TaskService extends crud_1.TenantAwareCrudService {
    typeOrmTaskRepository;
    mikroOrmTaskRepository;
    constructor(typeOrmTaskRepository, mikroOrmTaskRepository) {
        super(typeOrmTaskRepository, mikroOrmTaskRepository);
        this.typeOrmTaskRepository = typeOrmTaskRepository;
        this.mikroOrmTaskRepository = mikroOrmTaskRepository;
    }
    /**
     *
     * @param id
     * @param relations
     * @returns
     */
    async findById(id, params) {
        const task = await this.findOneByIdString(id, params);
        if (params.includeRootEpic) {
            task.rootEpic = await this.findParentUntilEpic(task.id);
        }
        return task;
    }
    async findParentUntilEpic(issueId) {
        // Define the recursive SQL query
        const query = (0, database_helper_1.prepareSQLQuery)(`
			WITH RECURSIVE IssueHierarchy AS (SELECT *
				FROM task
				WHERE id = $1
			UNION ALL
				SELECT i.*
				FROM task i
						INNER JOIN IssueHierarchy ih ON i.id = ih."parentId")
			SELECT *
				FROM IssueHierarchy
				WHERE "issueType" = 'Epic'
			LIMIT 1;
		`);
        // Execute the raw SQL query with the issueId parameter
        const result = await this.typeOrmRepository.query(query, [issueId]);
        // Check if any epic was found and return it, or return null
        if (result.length > 0) {
            return result[0];
        }
        else {
            return null;
        }
    }
    /**
     * GET my tasks
     *
     * @param options
     * @returns
     */
    async getMyTasks(options) {
        return await this.getEmployeeTasks(options);
    }
    /**
     * Find employee tasks
     *
     * @param options
     * @returns
     */
    async getEmployeeTasks(options) {
        try {
            const { where } = options;
            const { status, title, prefix, organizationSprintId = null } = where;
            const { organizationId, projectId, members } = where;
            const likeOperator = (0, index_3.isPostgres)() ? 'ILIKE' : 'LIKE';
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.innerJoin(`${query.alias}.members`, 'members');
            /**
             * If find options
             */
            if ((0, index_2.isNotEmpty)(options)) {
                if ('skip' in options) {
                    query.setFindOptions({
                        skip: (options.take || 10) * (options.skip - 1),
                        take: options.take || 10
                    });
                }
                query.setFindOptions({
                    ...(options.relations ? { relations: options.relations } : {})
                });
            }
            query.andWhere((qb) => {
                const subQuery = qb.subQuery();
                subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_employee"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_employee'), (0, database_helper_1.prepareSQLQuery)('task_employee'));
                // If user have permission to change employee
                if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                    if ((0, index_2.isNotEmpty)(members) && (0, index_2.isNotEmpty)(members['id'])) {
                        const employeeId = members['id'];
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"task_employee"."employeeId" = :employeeId'), { employeeId });
                    }
                }
                else {
                    // If employee has login and don't have permission to change employee
                    const employeeId = context_1.RequestContext.currentEmployeeId();
                    if ((0, index_2.isNotEmpty)(employeeId)) {
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"task_employee"."employeeId" = :employeeId'), { employeeId });
                    }
                }
                return (0, database_helper_1.prepareSQLQuery)('"task_members"."taskId" IN ') + subQuery.distinct(true).getQuery();
            });
            query.andWhere(new typeorm_1.Brackets((qb) => {
                const tenantId = context_1.RequestContext.currentTenantId();
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            }));
            query.andWhere(new typeorm_1.Brackets((qb) => {
                if ((0, index_2.isNotEmpty)(projectId)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" = :projectId`), { projectId });
                }
                if ((0, index_2.isNotEmpty)(status)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."status" = :status`), {
                        status
                    });
                }
                if ((0, index_2.isNotEmpty)(title)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title" ${likeOperator} :title`), {
                        title: `%${title}%`
                    });
                }
                if ((0, index_2.isNotEmpty)(title)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."prefix" ${likeOperator} :prefix`), {
                        prefix: `%${prefix}%`
                    });
                }
                if ((0, index_2.isNotEmpty)(organizationSprintId) && !(0, class_validator_1.isUUID)(organizationSprintId)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationSprintId" IS NULL`));
                }
            }));
            console.log('query.getSql', query.getSql());
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * GET all tasks by employee
     *
     * @param employeeId
     * @param filter
     * @returns
     */
    async getAllTasksByEmployee(employeeId, options) {
        try {
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.leftJoin(`${query.alias}.members`, 'members');
            query.leftJoin(`${query.alias}.teams`, 'teams');
            /**
             * If additional options found
             */
            query.setFindOptions({
                ...((0, index_2.isNotEmpty)(options) &&
                    (0, index_2.isNotEmpty)(options.where) && {
                    where: options.where
                }),
                ...((0, index_2.isNotEmpty)(options) &&
                    (0, index_2.isNotEmpty)(options.relations) && {
                    relations: options.relations
                })
            });
            query.andWhere(new typeorm_1.Brackets((qb) => {
                const tenantId = context_1.RequestContext.currentTenantId();
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), {
                    tenantId
                });
            }));
            query.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((qb) => {
                    const subQuery = qb.subQuery();
                    subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_employee"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_employee'), (0, database_helper_1.prepareSQLQuery)('task_employee'));
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"task_employee"."employeeId" = :employeeId'), { employeeId });
                    return (0, database_helper_1.prepareSQLQuery)(`"task_members"."taskId" IN (${subQuery.distinct(true).getQuery()})`);
                });
                web.orWhere((qb) => {
                    const subQuery = qb.subQuery();
                    subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_team"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_team'), (0, database_helper_1.prepareSQLQuery)('task_team'));
                    subQuery.leftJoin('organization_team_employee', 'organization_team_employee', (0, database_helper_1.prepareSQLQuery)('"organization_team_employee"."organizationTeamId" = "task_team"."organizationTeamId"'));
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"organization_team_employee"."employeeId" = :employeeId'), { employeeId });
                    return (0, database_helper_1.prepareSQLQuery)(`"task_teams"."taskId" IN (${subQuery.distinct(true).getQuery()})`);
                });
            }));
            return await query.getMany();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * GET team tasks
     *
     * @param options
     * @returns
     */
    async findTeamTasks(options) {
        try {
            const { where } = options;
            const { status, teams = [], title, prefix, organizationSprintId = null } = where;
            const { organizationId, projectId, members } = where;
            const likeOperator = (0, index_3.isPostgres)() ? 'ILIKE' : 'LIKE';
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.leftJoin(`${query.alias}.teams`, 'teams');
            /**
             * If find options
             */
            if ((0, index_2.isNotEmpty)(options)) {
                if ('skip' in options) {
                    query.setFindOptions({
                        skip: (options.take || 10) * (options.skip - 1),
                        take: options.take || 10
                    });
                }
                query.setFindOptions({
                    ...(options.select ? { select: options.select } : {}),
                    ...(options.relations ? { relations: options.relations } : {}),
                    ...(options.order ? { order: options.order } : {})
                });
            }
            query.andWhere((qb) => {
                const subQuery = qb.subQuery();
                subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_team"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_team'), (0, database_helper_1.prepareSQLQuery)('task_team'));
                subQuery.leftJoin('organization_team_employee', 'organization_team_employee', (0, database_helper_1.prepareSQLQuery)('"organization_team_employee"."organizationTeamId" = "task_team"."organizationTeamId"'));
                // If user have permission to change employee
                if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                    if ((0, index_2.isNotEmpty)(members) && (0, index_2.isNotEmpty)(members['id'])) {
                        const employeeId = members['id'];
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"organization_team_employee"."employeeId" = :employeeId'), { employeeId });
                    }
                }
                else {
                    // If employee has login and don't have permission to change employee
                    const employeeId = context_1.RequestContext.currentEmployeeId();
                    if ((0, index_2.isNotEmpty)(employeeId)) {
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"organization_team_employee"."employeeId" = :employeeId'), { employeeId });
                    }
                }
                if ((0, index_2.isNotEmpty)(teams)) {
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."organizationTeamId" IN (:...teams)`), {
                        teams
                    });
                }
                return (0, database_helper_1.prepareSQLQuery)(`"task_teams"."taskId" IN `) + subQuery.distinct(true).getQuery();
            });
            query.andWhere(new typeorm_1.Brackets((qb) => {
                const tenantId = context_1.RequestContext.currentTenantId();
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            }));
            if ((0, index_2.isNotEmpty)(projectId) && (0, index_2.isNotEmpty)(teams)) {
                query.orWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" = :projectId`), { projectId });
            }
            query.andWhere(new typeorm_1.Brackets((qb) => {
                if ((0, index_2.isNotEmpty)(projectId) && (0, index_2.isEmpty)(teams)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" = :projectId`), { projectId });
                }
                if ((0, index_2.isNotEmpty)(status)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."status" = :status`), {
                        status
                    });
                }
                if ((0, index_2.isNotEmpty)(title)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title" ${likeOperator} :title`), {
                        title: `%${title}%`
                    });
                }
                if ((0, index_2.isNotEmpty)(title)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."prefix" ${likeOperator} :prefix`), {
                        prefix: `%${prefix}%`
                    });
                }
                if ((0, index_2.isNotEmpty)(organizationSprintId) && !(0, class_validator_1.isUUID)(organizationSprintId)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationSprintId" IS NULL`));
                }
            }));
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * GET tasks by pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        if ('where' in options) {
            const { where } = options;
            const likeOperator = (0, index_3.isPostgres)() ? 'ILIKE' : 'LIKE';
            if ('title' in where) {
                const { title } = where;
                options['where']['title'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${title}%'`);
            }
            if ('prefix' in where) {
                const { prefix } = where;
                options['where']['prefix'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${prefix}%'`);
            }
            if ('organizationSprintId' in where) {
                const { organizationSprintId } = where;
                if (!(0, class_validator_1.isUUID)(organizationSprintId)) {
                    options['where']['organizationSprintId'] = (0, typeorm_1.IsNull)();
                }
            }
            if ('teams' in where) {
                const { teams } = where;
                options.where.teams = {
                    id: (0, typeorm_1.In)(teams)
                };
            }
        }
        return await super.paginate(options);
    }
    /**
     * GET maximum task number by project filter
     *
     * @param options
     */
    async getMaxTaskNumberByProject(options) {
        try {
            // Extract necessary options
            const tenantId = context_1.RequestContext.currentTenantId() || options.tenantId;
            const { organizationId, projectId } = options;
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            // Build the query to get the maximum task number
            query.select((0, database_helper_1.prepareSQLQuery)(`COALESCE(MAX("${query.alias}"."number"), 0)`), 'maxTaskNumber');
            // Filter by organization and tenant
            query.andWhere(new typeorm_1.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), {
                    organizationId
                });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), {
                    tenantId
                });
            }));
            // Filter by project (if provided)
            if ((0, index_2.isNotEmpty)(projectId)) {
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" = :projectId`), {
                    projectId
                });
            }
            else {
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IS NULL`));
            }
            // Execute the query and get the maximum task number
            const { maxTaskNumber } = await query.getRawOne();
            return maxTaskNumber;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Unassign employee from team task
     * @param employeeId
     * @param organizationTeamId
     */
    async unassignEmployeeFromTeamTasks(employeeId, organizationTeamId) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.leftJoinAndSelect(`${query.alias}.members`, 'members');
            if (organizationTeamId) {
                query.leftJoinAndSelect(`${query.alias}.teams`, 'teams', 'teams.id = :organizationTeamId', { organizationTeamId });
            }
            else {
                query.leftJoinAndSelect(`${query.alias}.teams`, 'teams');
            }
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            query.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((qb) => {
                    const subQuery = qb.subQuery();
                    subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_employee"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_employee'), (0, database_helper_1.prepareSQLQuery)('task_employee'));
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"task_employee"."employeeId" = :employeeId'), { employeeId });
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"task_employee"."tenantId" = :tenantId`), { tenantId });
                    return (0, database_helper_1.prepareSQLQuery)('"task_members"."taskId" IN ') + subQuery.distinct(true).getQuery();
                });
                web.orWhere((qb) => {
                    const subQuery = qb.subQuery();
                    subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_team"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_team'), (0, database_helper_1.prepareSQLQuery)('task_team'));
                    subQuery.leftJoin('organization_team_employee', 'ote', (0, database_helper_1.prepareSQLQuery)('"ote"."organizationTeamId" = "task_team"."organizationTeamId"'));
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"ote"."employeeId" = :employeeId'), { employeeId });
                    subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"ote"."tenantId" = :tenantId`), { tenantId });
                    return (0, database_helper_1.prepareSQLQuery)('"task_teams"."taskId" IN ') + subQuery.distinct(true).getQuery();
                });
            }));
            // If unassigned for specific team
            if (organizationTeamId) {
                query.andWhere(new typeorm_1.Brackets((web) => {
                    web.andWhere((qb) => {
                        const subQuery = qb.subQuery();
                        subQuery.select((0, database_helper_1.prepareSQLQuery)('"task_team"."taskId"')).from((0, database_helper_1.prepareSQLQuery)('task_team'), (0, database_helper_1.prepareSQLQuery)('task_team'));
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"task_teams"."organizationTeamId" = :organizationTeamId'), { employeeId });
                        subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"task_teams"."tenantId" = :tenantId'), { tenantId });
                        return (0, database_helper_1.prepareSQLQuery)('"task_teams"."taskId" IN ') + subQuery.distinct(true).getQuery();
                    });
                }));
            }
            // Find all assigned tasks of employee
            const tasks = await query.getMany();
            // Unassign member from All the Team Tasks
            tasks.forEach((task) => {
                if (task.teams.length) {
                    task.members = task.members.filter((member) => member.id !== employeeId);
                }
            });
            // Save updated entities to DB
            await this.typeOrmRepository.save(tasks);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_task_repository_1.TypeOrmTaskRepository,
        mikro_orm_task_repository_1.MikroOrmTaskRepository])
], TaskService);
//# sourceMappingURL=task.service.js.map