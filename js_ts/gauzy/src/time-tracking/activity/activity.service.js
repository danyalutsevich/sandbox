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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crud_1 = require("./../../core/crud");
const activity_entity_1 = require("./activity.entity");
const context_1 = require("../../core/context");
const contracts_1 = require("../../../plugins/contracts");
const cqrs_1 = require("@nestjs/cqrs");
const bulk_activities_save_command_1 = require("./commands/bulk-activities-save.command");
const underscore_1 = require("underscore");
const index_1 = require("../../../plugins/common/dist/index");
const index_2 = require("../../../plugins/config/dist/index");
const database_helper_1 = require("./../../database/database.helper");
const internal_1 = require("./../../core/entities/internal");
const type_orm_activity_repository_1 = require("./repository/type-orm-activity.repository");
const mikro_orm_activity_repository_1 = require("./repository/mikro-orm-activity.repository");
const type_orm_employee_repository_1 = require("../../employee/repository/type-orm-employee.repository");
const mikro_orm_employee_repository_1 = require("../../employee/repository/mikro-orm-employee.repository");
const type_orm_organization_project_repository_1 = require("../../organization-project/repository/type-orm-organization-project.repository");
const mikro_orm_organization_project_repository_1 = require("../../organization-project/repository/mikro-orm-organization-project.repository");
const config = (0, index_2.getConfig)();
let ActivityService = exports.ActivityService = class ActivityService extends crud_1.TenantAwareCrudService {
    typeOrmEmployeeRepository;
    typeOrmOrganizationProjectRepository;
    commandBus;
    constructor(typeOrmActivityRepository, mikroOrmActivityRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository, commandBus) {
        super(typeOrmActivityRepository, mikroOrmActivityRepository);
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.typeOrmOrganizationProjectRepository = typeOrmOrganizationProjectRepository;
        this.commandBus = commandBus;
    }
    async getDailyActivities(request) {
        const query = this.filterQuery(request);
        query.select((0, database_helper_1.prepareSQLQuery)(`COUNT("${query.alias}"."id")`), `sessions`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`SUM("${query.alias}"."duration")`), `duration`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`), `employeeId`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."date"`), `date`);
        switch (config.dbConnectionOptions.type) {
            case index_2.DatabaseTypeEnum.sqlite:
            case index_2.DatabaseTypeEnum.betterSqlite3:
                query.addSelect(`time("${query.alias}"."time")`, `time`);
                break;
            case index_2.DatabaseTypeEnum.postgres:
                query.addSelect(`(to_char("${query.alias}"."time", 'HH24') || ':00')::time`, 'time');
                break;
            case index_2.DatabaseTypeEnum.mysql:
                query.addSelect((0, database_helper_1.prepareSQLQuery)(`CONCAT(DATE_FORMAT("${query.alias}"."time", '%H'), ':00')`), 'time');
                break;
            default:
                throw Error(`cannot format daily activities time due to unsupported database type: ${config.dbConnectionOptions.type}`);
        }
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title"`), `title`);
        query.groupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."date"`));
        switch (config.dbConnectionOptions.type) {
            case index_2.DatabaseTypeEnum.sqlite:
            case index_2.DatabaseTypeEnum.betterSqlite3:
                query.addGroupBy(`time("${query.alias}"."time")`);
                break;
            case index_2.DatabaseTypeEnum.postgres:
                query.addGroupBy(`(to_char("${query.alias}"."time", 'HH24') || ':00')::time`);
                break;
            case index_2.DatabaseTypeEnum.mysql:
                query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`CONCAT(DATE_FORMAT("${query.alias}"."time", '%H'), ':00')`));
                break;
            default:
                throw Error(`cannot group by daily activities time due to unsupported database type: ${config.dbConnectionOptions.type}`);
        }
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title"`));
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`));
        query.orderBy(`time`, 'ASC');
        query.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"duration"`), 'DESC');
        return await query.getRawMany();
    }
    async getDailyActivitiesReport(request) {
        const query = this.filterQuery(request);
        query.select((0, database_helper_1.prepareSQLQuery)(`COUNT("${query.alias}"."id")`), `sessions`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`SUM("${query.alias}"."duration")`), `duration`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`), `employeeId`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId"`), `projectId`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."date"`), `date`);
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title"`), `title`);
        query.groupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."date"`));
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title"`));
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`));
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId"`));
        query.orderBy((0, database_helper_1.prepareSQLQuery)(`"duration"`), 'DESC');
        query.limit(200);
        let activities = await query.getRawMany();
        const projectIds = (0, underscore_1.pluck)(activities, 'projectId');
        const employeeIds = (0, underscore_1.pluck)(activities, 'employeeId');
        let employeeById = {};
        if (employeeIds.length > 0) {
            const employees = await this.typeOrmEmployeeRepository.find({
                where: {
                    id: (0, typeorm_2.In)(employeeIds)
                },
                relations: ['user']
            });
            employeeById = (0, underscore_1.indexBy)(employees, 'id');
        }
        let projectById = {};
        if (projectIds.length > 0) {
            const projects = await this.typeOrmOrganizationProjectRepository.find({
                where: {
                    id: (0, typeorm_2.In)(projectIds)
                }
            });
            projectById = (0, underscore_1.indexBy)(projects, 'id');
        }
        activities = activities.map((activity) => {
            activity.employee = employeeById[activity.employeeId];
            activity.project = projectById[activity.projectId];
            return activity;
        });
        return activities;
    }
    async getActivities(request) {
        const query = this.filterQuery(request);
        if (context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            query.leftJoinAndSelect(`${query.alias}.employee`, 'activityEmployee');
            query.leftJoinAndSelect(`activityEmployee.user`, 'activityUser', (0, database_helper_1.prepareSQLQuery)('"employee"."userId" = activityUser.id'));
        }
        query.orderBy(`${query.alias}.duration`, 'DESC');
        return await query.getMany();
    }
    async bulkSave(input) {
        return await this.commandBus.execute(new bulk_activities_save_command_1.BulkActivitiesSaveCommand(input));
    }
    filterQuery(request) {
        const { organizationId, startDate, endDate } = request;
        const tenantId = context_1.RequestContext.currentTenantId();
        let employeeIds;
        if (context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            if (request.employeeIds) {
                employeeIds = request.employeeIds;
            }
        }
        else {
            const user = context_1.RequestContext.currentUser();
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmRepository.createQueryBuilder();
        if (request.limit > 0) {
            query.take(request.limit);
            query.skip((request.page || 0) * request.limit);
        }
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlot`, 'time_slot');
        query.innerJoin(`time_slot.timeLogs`, 'time_log');
        query.andWhere(new typeorm_2.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."organizationId" = :organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."organizationId" = :organizationId`), { organizationId });
        }));
        query.andWhere(new typeorm_2.Brackets((qb) => {
            const { titles, types } = request;
            if ((0, index_1.isNotEmpty)(types)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."type" IN (:...types)`), {
                    types
                });
            }
            if ((0, index_1.isNotEmpty)(titles)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title" IN (:...titles)`), {
                    titles
                });
            }
        }));
        query.andWhere(new typeorm_2.Brackets((qb) => {
            qb.andWhere((0, index_2.isSqlite)() || (0, index_2.isBetterSqlite3)()
                ? `datetime("${query.alias}"."date" || ' ' || "${query.alias}"."time") Between :startDate AND :endDate`
                : (0, index_2.isPostgres)()
                    ? `concat("${query.alias}"."date", ' ', "${query.alias}"."time")::timestamp Between :startDate AND :endDate`
                    : (0, index_2.isMySQL)()
                        ? (0, database_helper_1.prepareSQLQuery)(`concat("${query.alias}"."date", ' ', "${query.alias}"."time") Between :startDate AND :endDate`)
                        : '', {
                startDate,
                endDate
            });
        }));
        query.andWhere(new typeorm_2.Brackets((qb) => {
            const { projectIds = [] } = request;
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
            }
        }));
        query.andWhere(new typeorm_2.Brackets((qb) => {
            const { activityLevel, source, logType } = request;
            if ((0, index_1.isNotEmpty)(activityLevel)) {
                /**
                 * Activity Level should be 0-100%
                 * So, we have convert it into 10 minutes timeslot by multiply by 6
                 */
                const start = activityLevel.start * 6;
                const end = activityLevel.end * 6;
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."overall" BETWEEN :start AND :end`), {
                    start,
                    end
                });
            }
            if ((0, index_1.isNotEmpty)(source)) {
                if (source instanceof Array) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."source" IN (:...source)`), {
                        source
                    });
                }
                else {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."source" = :source`), {
                        source
                    });
                }
            }
            if ((0, index_1.isNotEmpty)(logType)) {
                if (logType instanceof Array) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."logType" IN (:...logType)`), {
                        logType
                    });
                }
                else {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."logType" = :logType`), {
                        logType
                    });
                }
            }
        }));
        return query;
    }
};
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.OrganizationProject)),
    __metadata("design:paramtypes", [type_orm_activity_repository_1.TypeOrmActivityRepository,
        mikro_orm_activity_repository_1.MikroOrmActivityRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        mikro_orm_employee_repository_1.MikroOrmEmployeeRepository,
        type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository,
        mikro_orm_organization_project_repository_1.MikroOrmOrganizationProjectRepository,
        cqrs_1.CommandBus])
], ActivityService);
//# sourceMappingURL=activity.service.js.map