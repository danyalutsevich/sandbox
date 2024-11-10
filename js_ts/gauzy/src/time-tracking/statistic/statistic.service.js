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
exports.StatisticService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const moment_1 = __importDefault(require("moment"));
const chalk_1 = __importDefault(require("chalk"));
const contracts_1 = require("../../../plugins/contracts");
const index_1 = require("../../../plugins/common/dist/index");
const index_2 = require("../../../plugins/config/dist/index");
const statistic_helper_1 = require("./statistic.helper");
const database_helper_1 = require("./../../database/database.helper");
const context_1 = require("../../core/context");
const utils_1 = require("./../../core/utils");
const type_orm_time_slot_repository_1 = require("../../time-tracking/time-slot/repository/type-orm-time-slot.repository");
const type_orm_employee_repository_1 = require("../../employee/repository/type-orm-employee.repository");
const repository_1 = require("../activity/repository");
const repository_2 = require("../time-log/repository");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
let StatisticService = exports.StatisticService = class StatisticService {
    typeOrmTimeSlotRepository;
    typeOrmEmployeeRepository;
    typeOrmActivityRepository;
    typeOrmTimeLogRepository;
    mikroOrmTimeLogRepository;
    configService;
    ormType = ormType;
    constructor(typeOrmTimeSlotRepository, typeOrmEmployeeRepository, typeOrmActivityRepository, typeOrmTimeLogRepository, mikroOrmTimeLogRepository, configService) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.typeOrmActivityRepository = typeOrmActivityRepository;
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.mikroOrmTimeLogRepository = mikroOrmTimeLogRepository;
        this.configService = configService;
    }
    /**
     * GET Time Tracking Dashboard Counts Statistics
     *
     * @param request
     * @returns
     */
    async getCounts(request) {
        const { organizationId, startDate, endDate, todayStart, todayEnd } = request;
        let { employeeIds = [], projectIds = [], teamIds = [] } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        /**
         * Set employeeIds based on user conditions and permissions
         */
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        /**
         * GET statistics counts
         */
        const employeesCount = await this.getEmployeeWorkedCounts({
            ...request,
            employeeIds
        });
        const projectsCount = await this.getProjectWorkedCounts({
            ...request,
            employeeIds
        });
        // Retrieves the database type from the configuration service.
        const dbType = this.configService.dbConnectionOptions.type;
        /*
         * Get average activity and total duration of the work for the week.
         */
        let weekActivities = {
            overall: 0,
            duration: 0
        };
        const weekQuery = this.typeOrmTimeSlotRepository.createQueryBuilder();
        weekQuery
            .innerJoin(`${weekQuery.alias}.timeLogs`, 'timeLogs')
            .select((0, statistic_helper_1.getDurationQueryString)(dbType, 'timeLogs', weekQuery.alias), `week_duration`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${weekQuery.alias}"."overall"), 0)`), `overall`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${weekQuery.alias}"."duration"), 0)`), `duration`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`COUNT("${weekQuery.alias}"."id")`), `time_slot_count`);
        weekQuery
            .andWhere(`${weekQuery.alias}.tenantId = :tenantId`, { tenantId })
            .andWhere(`${weekQuery.alias}.organizationId = :organizationId`, { organizationId })
            .andWhere(`timeLogs.tenantId = :tenantId`, { tenantId })
            .andWhere(`timeLogs.organizationId = :organizationId`, { organizationId });
        weekQuery
            .andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekQuery.alias}"."startedAt" BETWEEN :startDate AND :endDate`), { startDate: start, endDate: end })
            .andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :startDate AND :endDate`), { startDate: start, endDate: end });
        if ((0, index_1.isNotEmpty)(employeeIds)) {
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekQuery.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN (:...employeeIds)`), { employeeIds });
        }
        if ((0, index_1.isNotEmpty)(projectIds)) {
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), { projectIds });
        }
        if ((0, index_1.isNotEmpty)(request.activityLevel)) {
            /**
             * Activity Level should be 0-100%
             * So, we have convert it into 10 minutes TimeSlot by multiply by 6
             */
            const { activityLevel } = request;
            const startLevel = activityLevel.start * 6;
            const endLevel = activityLevel.end * 6;
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekQuery.alias}"."overall" BETWEEN :startLevel AND :endLevel`), { startLevel, endLevel });
        }
        if ((0, index_1.isNotEmpty)(request.logType)) {
            const { logType } = request;
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."logType" IN (:...logType)`), { logType });
        }
        if ((0, index_1.isNotEmpty)(request.source)) {
            const { source } = request;
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."source" IN (:...source)`), { source });
        }
        if ((0, index_1.isNotEmpty)(teamIds)) {
            weekQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
        }
        weekQuery.groupBy((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."id"`));
        const weekTimeStatistics = await weekQuery.getRawMany();
        const weekDuration = (0, underscore_1.reduce)((0, underscore_1.pluck)(weekTimeStatistics, 'week_duration'), index_1.ArraySum, 0);
        const weekPercentage = ((0, underscore_1.reduce)((0, underscore_1.pluck)(weekTimeStatistics, 'overall'), index_1.ArraySum, 0) * 100) / (0, underscore_1.reduce)((0, underscore_1.pluck)(weekTimeStatistics, 'duration'), index_1.ArraySum, 0);
        weekActivities['duration'] = weekDuration;
        weekActivities['overall'] = weekPercentage;
        /*
         * Get average activity and total duration of the work for today.
         */
        let todayActivities = {
            overall: 0,
            duration: 0
        };
        const { start: startToday, end: endToday } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(todayStart || (0, moment_1.default)().startOf('day')), moment_1.default.utc(todayEnd || (0, moment_1.default)().endOf('day')));
        const todayQuery = this.typeOrmTimeSlotRepository.createQueryBuilder();
        todayQuery
            .innerJoin(`${todayQuery.alias}.timeLogs`, 'timeLogs')
            .select((0, statistic_helper_1.getDurationQueryString)(dbType, 'timeLogs', todayQuery.alias), `today_duration`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${todayQuery.alias}"."overall"), 0)`), `overall`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${todayQuery.alias}"."duration"), 0)`), `duration`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`COUNT("${todayQuery.alias}"."id")`), `time_slot_count`);
        todayQuery
            .andWhere(`${todayQuery.alias}.tenantId = :tenantId`, { tenantId })
            .andWhere(`${todayQuery.alias}.organizationId = :organizationId`, { organizationId })
            .andWhere(`timeLogs.tenantId = :tenantId`, { tenantId })
            .andWhere(`timeLogs.organizationId = :organizationId`, { organizationId });
        todayQuery
            .andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :startDate AND :endDate`), { startDate: startToday, endDate: endToday })
            .andWhere((0, database_helper_1.prepareSQLQuery)(`"${todayQuery.alias}"."startedAt" BETWEEN :startDate AND :endDate`), { startDate: startToday, endDate: endToday });
        if ((0, index_1.isNotEmpty)(employeeIds)) {
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN (:...employeeIds)`), { employeeIds });
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${todayQuery.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
        }
        if ((0, index_1.isNotEmpty)(projectIds)) {
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), { projectIds });
        }
        if ((0, index_1.isNotEmpty)(request.activityLevel)) {
            /**
             * Activity Level should be 0-100%
             * So, we have convert it into 10 minutes TimeSlot by multiply by 6
             */
            const { activityLevel } = request;
            const startLevel = activityLevel.start * 6;
            const endLevel = activityLevel.end * 6;
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${todayQuery.alias}"."overall" BETWEEN :startLevel AND :endLevel`), { startLevel, endLevel });
        }
        if ((0, index_1.isNotEmpty)(request.logType)) {
            const { logType } = request;
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."logType" IN (:...logType)`), { logType });
        }
        if ((0, index_1.isNotEmpty)(request.source)) {
            const { source } = request;
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."source" IN (:...source)`), { source });
        }
        if ((0, index_1.isNotEmpty)(teamIds)) {
            todayQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
        }
        todayQuery.groupBy((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."id"`));
        const todayTimeStatistics = await todayQuery.getRawMany();
        const todayDuration = (0, underscore_1.reduce)((0, underscore_1.pluck)(todayTimeStatistics, 'today_duration'), index_1.ArraySum, 0);
        const todayPercentage = ((0, underscore_1.reduce)((0, underscore_1.pluck)(todayTimeStatistics, 'overall'), index_1.ArraySum, 0) * 100) / (0, underscore_1.reduce)((0, underscore_1.pluck)(todayTimeStatistics, 'duration'), index_1.ArraySum, 0);
        todayActivities['duration'] = todayDuration;
        todayActivities['overall'] = todayPercentage;
        return {
            employeesCount,
            projectsCount,
            weekActivities: parseFloat(parseFloat(weekActivities.overall + '').toFixed(2)),
            weekDuration: weekActivities.duration,
            todayActivities: parseFloat(parseFloat(todayActivities.overall + '').toFixed(2)),
            todayDuration: todayActivities.duration
        };
    }
    /**
     * GET Time Tracking Dashboard Worked Members Statistics
     *
     * @param request
     * @returns
     */
    /**
     * GET Time Tracking Dashboard Worked Members Statistics
     *
     * @param request
     * @returns
     */
    async getMembers(request) {
        const { organizationId, startDate, endDate, todayStart, todayEnd } = request;
        let { employeeIds = [], projectIds = [], teamIds = [] } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start: weeklyStart, end: weeklyEnd } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Retrieves the database type from the configuration service.
        const dbType = this.configService.dbConnectionOptions.type;
        /**
         * Set employeeIds based on user conditions and permissions
         */
        if (user.employeeId || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmEmployeeRepository.createQueryBuilder();
        let employees = await query
            .select((0, database_helper_1.prepareSQLQuery)(`"${query.alias}".id`))
            // Builds a SELECT statement for the "user_name" column based on the database type.
            .addSelect((0, database_helper_1.prepareSQLQuery)(`${(0, statistic_helper_1.concateUserNameExpression)(dbType)}`), 'user_name')
            .addSelect((0, database_helper_1.prepareSQLQuery)(`"user"."imageUrl"`), 'user_image_url')
            .addSelect((0, statistic_helper_1.getTotalDurationQueryString)(dbType, 'timeLogs'), `duration`)
            .innerJoin(`${query.alias}.user`, 'user')
            .innerJoin(`${query.alias}.timeLogs`, 'timeLogs')
            .innerJoin(`timeLogs.timeSlots`, 'time_slot')
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :weeklyStart AND :weeklyEnd`), {
                weeklyStart,
                weeklyEnd
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :weeklyStart AND :weeklyEnd`), {
                weeklyStart,
                weeklyEnd
            });
            /**
             * If Employee Selected
             */
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id" IN(:...employeeIds)`), { employeeIds });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN(:...employeeIds)`), { employeeIds });
            }
            /**
             * If Project Selected
             */
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), { projectIds });
            }
            if ((0, index_1.isNotEmpty)(teamIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
            }
        }))
            .addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id"`))
            .addGroupBy((0, database_helper_1.prepareSQLQuery)(`"user"."id"`))
            .orderBy('duration', 'DESC')
            .getRawMany();
        if (employees.length > 0) {
            const employeeIds = (0, underscore_1.pluck)(employees, 'id');
            /**
             * Weekly Member Activity
             */
            const weekTimeQuery = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
            weekTimeQuery
                .select((0, statistic_helper_1.getDurationQueryString)(dbType, 'timeLogs', weekTimeQuery.alias), `week_duration`)
                .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${weekTimeQuery.alias}"."overall"), 0)`), `overall`)
                .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${weekTimeQuery.alias}"."duration"), 0)`), `duration`)
                .addSelect((0, database_helper_1.prepareSQLQuery)(`COUNT("${weekTimeQuery.alias}"."id")`), `time_slot_count`)
                .addSelect(`${weekTimeQuery.alias}.employeeId`, 'employeeId')
                .innerJoin(`${weekTimeQuery.alias}.timeLogs`, 'timeLogs')
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekTimeQuery.alias}"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekTimeQuery.alias}"."organizationId" = :organizationId`), {
                    organizationId
                });
            }))
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" = :organizationId`), { organizationId });
            }))
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :weeklyStart AND :weeklyEnd`), {
                    weeklyStart,
                    weeklyEnd
                });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekTimeQuery.alias}"."startedAt" BETWEEN :weeklyStart AND :weeklyEnd`), {
                    weeklyStart,
                    weeklyEnd
                });
                /**
                 * If Employee Selected
                 */
                if ((0, index_1.isNotEmpty)(employeeIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekTimeQuery.alias}"."employeeId" IN(:...employeeIds)`), {
                        employeeIds
                    });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN(:...employeeIds)`), {
                        employeeIds
                    });
                }
                /**
                 * If Project Selected
                 */
                if ((0, index_1.isNotEmpty)(projectIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN(:...projectIds)`), {
                        projectIds
                    });
                }
                if ((0, index_1.isNotEmpty)(teamIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
                }
            }))
                .groupBy(`timeLogs.id`)
                .addGroupBy(`${weekTimeQuery.alias}.employeeId`);
            let weekTimeSlots = await weekTimeQuery.getRawMany();
            weekTimeSlots = (0, underscore_1.mapObject)((0, underscore_1.groupBy)(weekTimeSlots, 'employeeId'), (values, employeeId) => {
                const weekDuration = (0, underscore_1.reduce)((0, underscore_1.pluck)(values, 'week_duration'), index_1.ArraySum, 0);
                const weekPercentage = ((0, underscore_1.reduce)((0, underscore_1.pluck)(values, 'overall'), index_1.ArraySum, 0) * 100) /
                    (0, underscore_1.reduce)((0, underscore_1.pluck)(values, 'duration'), index_1.ArraySum, 0);
                return {
                    employeeId,
                    duration: weekDuration,
                    overall: weekPercentage
                };
            });
            weekTimeSlots = (0, underscore_1.chain)(weekTimeSlots)
                .map((weekTimeSlot) => {
                if (weekTimeSlot && weekTimeSlot.overall) {
                    weekTimeSlot.overall = parseFloat(weekTimeSlot.overall).toFixed(1);
                }
                return weekTimeSlot;
            })
                .indexBy('employeeId')
                .value();
            /**
             * Daily Member Activity
             */
            let dayTimeQuery = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
            dayTimeQuery
                .select((0, statistic_helper_1.getDurationQueryString)(dbType, 'timeLogs', dayTimeQuery.alias), `today_duration`)
                .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${dayTimeQuery.alias}"."overall"), 0)`), `overall`)
                .addSelect((0, database_helper_1.prepareSQLQuery)(`COALESCE(SUM("${dayTimeQuery.alias}"."duration"), 0)`), `duration`)
                .addSelect((0, database_helper_1.prepareSQLQuery)(`COUNT("${dayTimeQuery.alias}"."id")`), `time_slot_count`)
                .addSelect(`${dayTimeQuery.alias}.employeeId`, 'employeeId')
                .innerJoin(`${dayTimeQuery.alias}.timeLogs`, 'timeLogs')
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${dayTimeQuery.alias}"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${dayTimeQuery.alias}"."organizationId" = :organizationId`), {
                    organizationId
                });
            }))
                .andWhere(new typeorm_1.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" = :organizationId`), { organizationId });
            }))
                .andWhere(new typeorm_1.Brackets((qb) => {
                const { start: startToday, end: endToday } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(todayStart || (0, moment_1.default)().startOf('day')), moment_1.default.utc(todayEnd || (0, moment_1.default)().endOf('day')));
                qb.where((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :startToday AND :endToday`), {
                    startToday,
                    endToday
                });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${dayTimeQuery.alias}"."startedAt" BETWEEN :startToday AND :endToday`), {
                    startToday,
                    endToday
                });
                /**
                 * If Employee Selected
                 */
                if ((0, index_1.isNotEmpty)(employeeIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${dayTimeQuery.alias}"."employeeId" IN(:...employeeIds)`), { employeeIds });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN(:...employeeIds)`), { employeeIds });
                }
                /**
                 * If Project Selected
                 */
                if ((0, index_1.isNotEmpty)(projectIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN(:...projectIds)`), { projectIds });
                }
                if ((0, index_1.isNotEmpty)(teamIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
                }
            }))
                .groupBy(`timeLogs.id`)
                .addGroupBy(`${dayTimeQuery.alias}.employeeId`);
            let dayTimeSlots = await dayTimeQuery.getRawMany();
            dayTimeSlots = (0, underscore_1.mapObject)((0, underscore_1.groupBy)(dayTimeSlots, 'employeeId'), (values, employeeId) => {
                const todayDuration = (0, underscore_1.reduce)((0, underscore_1.pluck)(values, 'today_duration'), index_1.ArraySum, 0);
                const todayPercentage = ((0, underscore_1.reduce)((0, underscore_1.pluck)(values, 'overall'), index_1.ArraySum, 0) * 100) /
                    (0, underscore_1.reduce)((0, underscore_1.pluck)(values, 'duration'), index_1.ArraySum, 0);
                return {
                    employeeId,
                    duration: todayDuration,
                    overall: todayPercentage
                };
            });
            dayTimeSlots = (0, underscore_1.chain)(dayTimeSlots)
                .map((dayTimeSlot) => {
                if (dayTimeSlot && dayTimeSlot.overall) {
                    dayTimeSlot.overall = parseFloat(dayTimeSlot.overall).toFixed(1);
                }
                return dayTimeSlot;
            })
                .indexBy('employeeId')
                .value();
            for (let index = 0; index < employees.length; index++) {
                const member = employees[index];
                member.weekTime = weekTimeSlots[member.id];
                member.todayTime = dayTimeSlots[member.id];
                member.user = {
                    name: member.user_name,
                    imageUrl: member.user_image_url
                };
                delete member.user_name;
                delete member.user_image_url;
                const weekHoursQuery = this.typeOrmEmployeeRepository.createQueryBuilder();
                weekHoursQuery
                    .innerJoin(`${weekHoursQuery.alias}.timeLogs`, 'timeLogs')
                    .innerJoin(`timeLogs.timeSlots`, 'time_slot')
                    .select((0, statistic_helper_1.getTotalDurationQueryString)(dbType, 'timeLogs'), `duration`)
                    .addSelect(
                // -- why we minus 1 if MySQL is selected, Sunday DOW in postgres is 0, in MySQL is 1
                // -- in case no database type is selected we return "0" as the DOW
                (0, index_2.isSqlite)() || (0, index_2.isBetterSqlite3)()
                    ? `(strftime('%w', timeLogs.startedAt))`
                    : (0, index_2.isPostgres)()
                        ? 'EXTRACT(DOW FROM "timeLogs"."startedAt")'
                        : (0, index_2.isMySQL)()
                            ? (0, database_helper_1.prepareSQLQuery)('DayOfWeek("timeLogs"."startedAt") - 1')
                            : '0', 'day')
                    .andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekHoursQuery.alias}"."id" = :memberId`), { memberId: member.id })
                    .andWhere(new typeorm_1.Brackets((qb) => {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekHoursQuery.alias}"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${weekHoursQuery.alias}"."organizationId" = :organizationId`), {
                        organizationId
                    });
                }))
                    .andWhere(new typeorm_1.Brackets((qb) => {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" = :organizationId`), { organizationId });
                }))
                    .andWhere(new typeorm_1.Brackets((qb) => {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :weeklyStart AND :weeklyEnd`), {
                        weeklyStart,
                        weeklyEnd
                    });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :weeklyStart AND :weeklyEnd`), {
                        weeklyStart,
                        weeklyEnd
                    });
                }))
                    .andWhere(new typeorm_1.Brackets((qb) => {
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN (:...employeeIds)`), { employeeIds });
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), { projectIds });
                    }
                    if ((0, index_1.isNotEmpty)(teamIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
                    }
                }))
                    .addGroupBy((0, index_2.isSqlite)() || (0, index_2.isBetterSqlite3)()
                    ? `(strftime('%w', timeLogs.startedAt))`
                    : (0, index_2.isPostgres)()
                        ? 'EXTRACT(DOW FROM "timeLogs"."startedAt")'
                        : (0, index_2.isMySQL)()
                            ? (0, database_helper_1.prepareSQLQuery)('DayOfWeek("timeLogs"."startedAt") - 1')
                            : '0');
                member.weekHours = await weekHoursQuery.getRawMany();
            }
        }
        return employees;
    }
    /**
     * GET Time Tracking Dashboard Projects Statistics
     *
     * @param request
     * @returns
     */
    async getProjects(request) {
        const { organizationId, startDate, endDate } = request;
        let { employeeIds = [], projectIds = [], teamIds = [] } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Retrieves the database type from the configuration service.
        const dbType = this.configService.dbConnectionOptions.type;
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        /**
         * Set employeeIds based on user conditions and permissions
         */
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
        let queryString;
        switch (dbType) {
            case index_2.DatabaseTypeEnum.sqlite:
            case index_2.DatabaseTypeEnum.betterSqlite3:
                queryString = `COALESCE(ROUND(SUM((julianday(COALESCE("${query.alias}"."stoppedAt", datetime('now'))) - julianday("${query.alias}"."startedAt")) * 86400) / COUNT("time_slot"."id")), 0)`;
                break;
            case index_2.DatabaseTypeEnum.postgres:
                queryString = `COALESCE(ROUND(SUM(extract(epoch from (COALESCE("${query.alias}"."stoppedAt", NOW()) - "${query.alias}"."startedAt"))) / COUNT("time_slot"."id")), 0)`;
                break;
            case index_2.DatabaseTypeEnum.mysql:
                queryString = (0, database_helper_1.prepareSQLQuery)(`COALESCE(ROUND(SUM(TIMESTAMPDIFF(SECOND, "${query.alias}"."startedAt", COALESCE("${query.alias}"."stoppedAt", NOW()))) / COUNT("time_slot"."id")), 0)`);
                break;
            default:
                throw Error(`cannot create statistic query due to unsupported database type: ${dbType}`);
        }
        query
            .select((0, database_helper_1.prepareSQLQuery)(`"project"."name"`), 'name')
            .addSelect((0, database_helper_1.prepareSQLQuery)(`"project"."id"`), 'projectId')
            .addSelect(queryString, `duration`)
            .innerJoin(`${query.alias}.project`, 'project')
            .innerJoin(`${query.alias}.timeSlots`, 'time_slot')
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" BETWEEN :start AND :end`), {
                start,
                end
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :start AND :end`), {
                start,
                end
            });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"project"."id" IN (:...projectIds)`), {
                    projectIds
                });
            }
            if ((0, index_1.isNotEmpty)(teamIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationTeamId" IN (:...teamIds)`), { teamIds });
            }
        }))
            .groupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id"`))
            .addGroupBy((0, database_helper_1.prepareSQLQuery)(`"project"."id"`))
            .orderBy('duration', 'DESC');
        let statistics = await query.getRawMany();
        let projects = (0, underscore_1.chain)(statistics)
            .groupBy('projectId')
            .map((projects, projectId) => {
            const [project] = projects;
            return {
                name: project.name,
                id: projectId,
                duration: (0, underscore_1.reduce)((0, underscore_1.pluck)(projects, 'duration'), index_1.ArraySum, 0)
            };
        })
            .value()
            .splice(0, 5);
        const totalDurationQuery = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
        let totalDurationQueryString;
        switch (dbType) {
            case index_2.DatabaseTypeEnum.sqlite:
            case index_2.DatabaseTypeEnum.betterSqlite3:
                totalDurationQueryString = `COALESCE(ROUND(SUM((julianday(COALESCE("${totalDurationQuery.alias}"."stoppedAt", datetime('now'))) - julianday("${totalDurationQuery.alias}"."startedAt")) * 86400)), 0)`;
                break;
            case index_2.DatabaseTypeEnum.postgres:
                totalDurationQueryString = `COALESCE(ROUND(SUM(extract(epoch from (COALESCE("${totalDurationQuery.alias}"."stoppedAt", NOW()) - "${totalDurationQuery.alias}"."startedAt")))), 0)`;
                break;
            case index_2.DatabaseTypeEnum.mysql:
                totalDurationQueryString = (0, database_helper_1.prepareSQLQuery)(`COALESCE(ROUND(SUM(TIMESTAMPDIFF(SECOND, "${totalDurationQuery.alias}"."startedAt", COALESCE("${totalDurationQuery.alias}"."stoppedAt", NOW())))), 0)`);
                break;
            default:
                throw Error(`cannot create statistic query due to unsupported database type: ${dbType}`);
        }
        totalDurationQuery
            .select(totalDurationQueryString, `duration`)
            .innerJoin(`${totalDurationQuery.alias}.project`, 'project')
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."startedAt" BETWEEN :start AND :end`), {
                start,
                end
            });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."organizationId" = :organizationId`), {
                organizationId
            });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"project"."id" IN (:...projectIds)`), {
                    projectIds
                });
            }
            if ((0, index_1.isNotEmpty)(teamIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."organizationTeamId" IN (:...teamIds)`), { teamIds });
            }
        }));
        const totalDuration = await totalDurationQuery.getRawOne();
        projects = projects.map((project) => {
            project.durationPercentage = parseFloat(parseFloat((project.duration * 100) / totalDuration.duration + '').toFixed(2));
            return project;
        });
        return projects || [];
    }
    /**
     * GET Time Tracking Dashboard Tasks Statistics
     *
     * @param request
     * @returns
     */
    async getTasks(request) {
        const { organizationId, startDate, endDate, take, onlyMe = false, organizationTeamId } = request;
        const { projectIds = [], taskIds = [], teamIds = [], defaultRange, unitOfTime } = request;
        let { employeeIds = [], todayEnd, todayStart } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        let start;
        let end;
        if (startDate && endDate) {
            const range = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate), moment_1.default.utc(endDate));
            start = range.start;
            end = range.end;
        }
        else if (defaultRange) {
            const unit = unitOfTime || 'week';
            const range = (0, utils_1.getDateRangeFormat)((0, moment_1.default)().startOf(unit).utc(), (0, moment_1.default)().endOf(unit).utc());
            start = range.start;
            end = range.end;
        }
        /*
         *  Get employees id of the organization or get current employee id
         */
        if (user && user.employeeId && (onlyMe || !context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE))) {
            if ((0, index_1.isNotEmpty)(organizationTeamId) || context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.ORG_MEMBER_LAST_LOG_VIEW)) {
                employeeIds = [...employeeIds];
            }
            else {
                employeeIds = [user.employeeId];
            }
        }
        if (todayStart && todayEnd) {
            const range = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(todayStart), moment_1.default.utc(todayEnd));
            todayStart = range.start;
            todayEnd = range.end;
        }
        else if (defaultRange) {
            const unit = unitOfTime || 'day';
            const range = (0, utils_1.getDateRangeFormat)((0, moment_1.default)().startOf(unit).utc(), (0, moment_1.default)().endOf(unit).utc());
            todayStart = range.start;
            todayEnd = range.end;
        }
        // Retrieves the database type from the configuration service.
        const dbType = this.configService.dbConnectionOptions.type;
        let todayStatistics = [];
        /**
         * Get Today's Task Statistics
         */
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                {
                    // Start building the MikroORM query
                    const qb = this.mikroOrmTimeLogRepository.createQueryBuilder('time_log');
                    const knex = this.mikroOrmTimeLogRepository.getKnex();
                    // Add the raw SQL snippet to the select
                    const raw = (0, statistic_helper_1.getDurationQueryString)(dbType, qb.alias, 'time_slot');
                    // Constructs SQL query to fetch task title, ID, last updated timestamp, and today's duration.
                    let sq = knex(qb.alias).select([
                        `task.title AS title`,
                        `task.id AS taskId`,
                        `${qb.alias}.updatedAt AS updatedAt`,
                        knex.raw(`${raw} AS today_duration`),
                    ]);
                    // Add join clauses
                    sq.innerJoin('task', `${qb.alias}.taskId`, 'task.id');
                    sq.innerJoin('time_slot_time_logs', `${qb.alias}.id`, 'time_slot_time_logs.timeLogId');
                    sq.innerJoin('time_slot', 'time_slot_time_logs.timeSlotId', 'time_slot.id');
                    // Add where clauses
                    sq.andWhere({
                        [`${qb.alias}.tenantId`]: tenantId,
                        [`${qb.alias}.organizationId`]: organizationId,
                        [`time_slot.tenantId`]: tenantId,
                        [`time_slot.organizationId`]: organizationId
                    });
                    if (todayStart && todayEnd) {
                        sq.whereBetween(`${qb.alias}.startedAt`, [todayStart, todayEnd]);
                        sq.whereBetween(`time_slot.startedAt`, [todayStart, todayEnd]);
                    }
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        sq.whereIn(`${qb.alias}.employeeId`, employeeIds);
                        sq.whereIn(`time_slot.employeeId`, employeeIds);
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        sq.whereIn(`${qb.alias}.projectId`, projectIds);
                    }
                    if ((0, index_1.isNotEmpty)(taskIds)) {
                        sq.whereIn(`${qb.alias}.taskId`, taskIds);
                    }
                    if ((0, index_1.isNotEmpty)(organizationTeamId) || (0, index_1.isNotEmpty)(teamIds)) {
                        sq.andWhere(function () {
                            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                                this.orWhere(`${qb.alias}.organizationTeamId`, '=', organizationTeamId);
                            }
                            if ((0, index_1.isNotEmpty)(teamIds)) {
                                this.orWhereIn(`${qb.alias}.organizationTeamId`, teamIds);
                            }
                        });
                    }
                    sq.groupBy([`${qb.alias}.id`, 'task.id']); // Apply multiple group by clauses in a single statement
                    sq.orderBy(`${qb.alias}.updatedAt`, 'desc'); // Apply order by clause
                    console.log(chalk_1.default.green(sq.toString() + ' || Get Today Statistics Query MikroORM!'));
                    // Execute the raw SQL query and get the results
                    todayStatistics = (await knex.raw(sq.toString())).rows || [];
                }
                break;
            case utils_1.MultiORMEnum.TypeORM:
                {
                    const qb = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
                    qb.select((0, database_helper_1.prepareSQLQuery)(`"task"."title"`), 'title');
                    qb.addSelect((0, database_helper_1.prepareSQLQuery)(`"task"."id"`), 'taskId');
                    qb.addSelect((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."updatedAt"`), 'updatedAt');
                    qb.addSelect((0, statistic_helper_1.getDurationQueryString)(dbType, qb.alias, 'time_slot'), `today_duration`);
                    // Add join clauses
                    qb.innerJoin(`${qb.alias}.task`, 'task');
                    qb.innerJoin(`${qb.alias}.timeSlots`, 'time_slot');
                    // Combine tenant and organization ID conditions
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId AND "${qb.alias}"."organizationId" = :organizationId`), { tenantId, organizationId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."tenantId" = :tenantId AND "time_slot"."organizationId" = :organizationId`), { tenantId, organizationId });
                    // Add conditions based on today's start and end time
                    if (todayStart && todayEnd) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" BETWEEN :todayStart AND :todayEnd`), { todayStart, todayEnd });
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :todayStart AND :todayEnd`), { todayStart, todayEnd });
                    }
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."employeeId" IN (:...employeeIds)`), { employeeIds });
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."projectId" IN (:...projectIds)`), { projectIds });
                    }
                    if ((0, index_1.isNotEmpty)(taskIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."taskId" IN (:...taskIds)`), { taskIds });
                    }
                    if ((0, index_1.isNotEmpty)(organizationTeamId) || (0, index_1.isNotEmpty)(teamIds)) {
                        qb.andWhere(new typeorm_1.Brackets(web => {
                            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                                web.orWhere(`${qb.alias}.organizationTeamId = :organizationTeamId`, { organizationTeamId });
                            }
                            if ((0, index_1.isNotEmpty)(teamIds)) {
                                web.orWhere(`${qb.alias}.organizationTeamId IN (:...teamIds)`, { teamIds });
                            }
                        }));
                    }
                    qb.groupBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."id"`));
                    qb.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"task"."id"`));
                    qb.orderBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."updatedAt"`), 'DESC');
                    console.log(qb.getQuery(), ' || Get Today Statistics Query TypeORM');
                    // Execute the SQL query and get the results
                    todayStatistics = await qb.getRawMany();
                }
                break;
            default:
                throw new Error(`Cannot create statistic query due to unsupported database type: ${dbType}`);
        }
        let statistics = [];
        /**
         * Get Given Time Frame Task Statistics
         */
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                {
                    // Start building the MikroORM query
                    const qb = this.mikroOrmTimeLogRepository.createQueryBuilder('time_log');
                    const knex = this.mikroOrmTimeLogRepository.getKnex();
                    // Add the raw SQL snippet to the select
                    const raw = (0, statistic_helper_1.getDurationQueryString)(dbType, qb.alias, 'time_slot');
                    // Constructs SQL query to fetch task title, ID, last updated timestamp, and today's duration.
                    let sq = knex(qb.alias).select([
                        `task.title AS title`,
                        `task.id AS taskId`,
                        `${qb.alias}.updatedAt AS updatedAt`,
                        knex.raw(`${raw} AS duration`),
                    ]);
                    // Add join clauses
                    sq.innerJoin('task', `${qb.alias}.taskId`, 'task.id');
                    sq.innerJoin('time_slot_time_logs', `${qb.alias}.id`, 'time_slot_time_logs.timeLogId');
                    sq.innerJoin('time_slot', 'time_slot_time_logs.timeSlotId', 'time_slot.id');
                    // Add where clauses
                    sq.andWhere({
                        [`${qb.alias}.tenantId`]: tenantId,
                        [`${qb.alias}.organizationId`]: organizationId,
                        [`time_slot.tenantId`]: tenantId,
                        [`time_slot.organizationId`]: organizationId
                    });
                    if (start && end) {
                        sq.whereBetween(`${qb.alias}.startedAt`, [start, end]);
                        sq.whereBetween(`time_slot.startedAt`, [start, end]);
                    }
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        sq.whereIn(`${qb.alias}.employeeId`, employeeIds);
                        sq.whereIn(`time_slot.employeeId`, employeeIds);
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        sq.whereIn(`${qb.alias}.projectId`, projectIds);
                    }
                    if ((0, index_1.isNotEmpty)(taskIds)) {
                        sq.whereIn(`${qb.alias}.taskId`, taskIds);
                    }
                    if ((0, index_1.isNotEmpty)(organizationTeamId) || (0, index_1.isNotEmpty)(teamIds)) {
                        sq.andWhere(function () {
                            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                                this.orWhere(`${qb.alias}.organizationTeamId`, '=', organizationTeamId);
                            }
                            if ((0, index_1.isNotEmpty)(teamIds)) {
                                this.orWhereIn(`${qb.alias}.organizationTeamId`, teamIds);
                            }
                        });
                    }
                    sq.groupBy([`${qb.alias}.id`, 'task.id']); // Apply multiple group by clauses in a single statement
                    sq.orderBy(`${qb.alias}.updatedAt`, 'desc'); // Apply order by clause
                    console.log(chalk_1.default.green(sq.toString() + ' || Get Statistics Query MikroORM!'));
                    // Execute the raw SQL query and get the results
                    statistics = (await knex.raw(sq.toString())).rows || [];
                }
                break;
            case utils_1.MultiORMEnum.TypeORM:
                {
                    /**
                     * Get Time Range Statistics
                     */
                    const qb = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
                    qb.select((0, database_helper_1.prepareSQLQuery)(`"task"."title"`), 'title');
                    qb.addSelect((0, database_helper_1.prepareSQLQuery)(`"task"."id"`), 'taskId');
                    qb.addSelect((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."updatedAt"`), 'updatedAt');
                    qb.addSelect((0, statistic_helper_1.getDurationQueryString)(dbType, qb.alias, 'time_slot'), `duration`);
                    // Add join clauses
                    qb.innerJoin(`${qb.alias}.task`, 'task');
                    qb.innerJoin(`${qb.alias}.timeSlots`, 'time_slot');
                    // Add join clauses
                    // Combine tenant and organization ID conditions for qb.alias
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId AND "${qb.alias}"."organizationId" = :organizationId`), { tenantId, organizationId });
                    // Combine tenant and organization ID conditions for time_slot
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."tenantId" = :tenantId AND "time_slot"."organizationId" = :organizationId`), { tenantId, organizationId });
                    // Add conditions based on start and end time
                    if (start && end) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" BETWEEN :start AND :end`), { start, end });
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :start AND :end`), { start, end });
                    }
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" IN (:...employeeIds) AND "time_slot"."employeeId" IN (:...employeeIds)`), { employeeIds });
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."projectId" IN (:...projectIds)`), { projectIds });
                    }
                    if ((0, index_1.isNotEmpty)(taskIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."taskId" IN (:...taskIds)`), { taskIds });
                    }
                    if ((0, index_1.isNotEmpty)(organizationTeamId) || (0, index_1.isNotEmpty)(teamIds)) {
                        qb.andWhere(new typeorm_1.Brackets(web => {
                            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                                web.orWhere(`${qb.alias}.organizationTeamId = :organizationTeamId`, { organizationTeamId });
                            }
                            if ((0, index_1.isNotEmpty)(teamIds)) {
                                web.orWhere(`${qb.alias}.organizationTeamId IN (:...teamIds)`, { teamIds });
                            }
                        }));
                    }
                    qb.groupBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."id"`));
                    qb.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"task"."id"`));
                    qb.orderBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."updatedAt"`), 'DESC');
                    console.log(qb.getQueryAndParameters(), 'Get Statistics Query TypeORM');
                    // Execute the raw SQL query and get the results
                    statistics = await qb.getRawMany();
                }
                break;
            default:
                throw new Error(`Cannot create statistic query due to unsupported database type: ${dbType}`);
        }
        let totalDuration;
        /**
         * Get Total Task Statistics
         */
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                {
                    const qb = this.mikroOrmTimeLogRepository.createQueryBuilder('time_log');
                    const knex = this.mikroOrmTimeLogRepository.getKnex();
                    // Add the raw SQL snippet to the select
                    const raw = (0, statistic_helper_1.getTotalDurationQueryString)(dbType, qb.alias);
                    // Construct your SQL query using knex
                    let sq = knex(qb.alias).select([
                        knex.raw(`${raw} AS duration`)
                    ]);
                    // Add join clauses
                    sq.innerJoin('task', `${qb.alias}.taskId`, 'task.id');
                    sq.innerJoin('time_slot_time_logs', `${qb.alias}.id`, 'time_slot_time_logs.timeLogId');
                    sq.innerJoin('time_slot', 'time_slot_time_logs.timeSlotId', 'time_slot.id');
                    // Add where clauses
                    sq.andWhere({
                        [`${qb.alias}.tenantId`]: tenantId,
                        [`${qb.alias}.organizationId`]: organizationId
                    });
                    if (start && end) {
                        sq.whereBetween(`${qb.alias}.startedAt`, [start, end]);
                    }
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        sq.whereIn(`${qb.alias}.employeeId`, employeeIds);
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        sq.whereIn(`${qb.alias}.projectId`, projectIds);
                    }
                    if ((0, index_1.isNotEmpty)(organizationTeamId) || (0, index_1.isNotEmpty)(teamIds)) {
                        sq.andWhere(function () {
                            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                                this.orWhere(`${qb.alias}.organizationTeamId`, '=', organizationTeamId);
                            }
                            if ((0, index_1.isNotEmpty)(teamIds)) {
                                this.orWhereIn(`${qb.alias}.organizationTeamId`, teamIds);
                            }
                        });
                    }
                    console.log(chalk_1.default.green(sq.toString() + ' || Get Total Duration Query MikroORM!'));
                    // Execute the raw SQL query and get the results
                    [totalDuration] = (await knex.raw(sq.toString())).rows || [];
                }
                break;
            case utils_1.MultiORMEnum.TypeORM:
                {
                    const qb = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
                    qb.select((0, statistic_helper_1.getTotalDurationQueryString)(dbType, qb.alias), 'duration');
                    // Add join clauses
                    qb.innerJoin(`${qb.alias}.task`, 'task');
                    // Add where clauses
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
                    if (start && end) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" BETWEEN :start AND :end`), { start, end });
                    }
                    if ((0, index_1.isNotEmpty)(employeeIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
                    }
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."projectId" IN (:...projectIds)`), { projectIds });
                    }
                    if ((0, index_1.isNotEmpty)(organizationTeamId) || (0, index_1.isNotEmpty)(teamIds)) {
                        qb.andWhere(new typeorm_1.Brackets(web => {
                            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                                web.orWhere(`${qb.alias}.organizationTeamId = :organizationTeamId`, { organizationTeamId });
                            }
                            if ((0, index_1.isNotEmpty)(teamIds)) {
                                web.orWhere(`${qb.alias}.organizationTeamId IN (:...teamIds)`, { teamIds });
                            }
                        }));
                    }
                    console.log(qb.getQuery(), 'Get Total Duration Query TypeORM!');
                    // Execute the raw SQL query and get the results
                    totalDuration = await qb.getRawOne();
                }
                break;
            default:
                throw new Error(`Cannot create statistic query due to unsupported database type: ${dbType}`);
        }
        // ------------------------------------------------
        console.log('Find Statistics length: ', statistics.length);
        console.log('Find Today Statistics length: ', todayStatistics.length);
        console.log('Find Total Duration: ', totalDuration?.duration);
        /* Code that cause issues... We try to optimize it using "hashing" approach etc

        const mergedStatistics = _.map(statistics, (statistic) => {
            const updatedAt = String(statistic.updatedAt);
            return _.extend(
                {
                    today_duration: 0,
                    ...statistic,
                    updatedAt
                },
                _.findWhere(
                    todayStatistics.map((today) => ({
                        ...today,
                        updatedAt: String(today.updatedAt)
                    })),
                    {
                        taskId: statistic.taskId,
                        updatedAt
                    }
                )
            );
        });

        let tasks: ITask[] = chain(mergedStatistics)
            .groupBy('taskId')
            .map((tasks: ITask[], taskId) => {
                const [task] = tasks;
                return {
                    title: task.title,
                    id: taskId,
                    duration: reduce(pluck(tasks, 'duration'), ArraySum, 0),
                    todayDuration: reduce(pluck(tasks, 'today_duration'), ArraySum, 0),
                    updatedAt: task.updatedAt
                } as ITask;
            })
            .value();

        if (isNotEmpty(take)) {
            tasks = tasks.splice(0, take);
        }

        tasks = tasks.map((task: any) => {
            task.durationPercentage = parseFloat(
                parseFloat((task.duration * 100) / totalDuration.duration + '').toFixed(2)
            );
            return task;
        });

        */
        const totalDurationValue = statistics.reduce((total, stat) => total + (parseInt(stat.duration, 10) || 0), 0);
        console.log('Total Duration Value: ', totalDurationValue);
        const todayStatsLookup = todayStatistics.reduce((acc, stat) => {
            const taskId = stat.taskId;
            if (!acc[taskId]) {
                acc[taskId] = { todayDuration: 0 };
            }
            acc[taskId].todayDuration += parseInt(stat.today_duration, 10) || 0;
            return acc;
        }, {});
        const taskAggregates = statistics.reduce((acc, stat) => {
            const taskId = stat.taskId;
            if (!acc[taskId]) {
                acc[taskId] = { duration: 0, todayDuration: 0, title: stat.title, updatedAt: stat.updatedAt };
            }
            // Convert stat.duration to a number before adding
            const durationToAdd = Number(stat.duration) || 0;
            // Sum durations as numbers
            acc[taskId].duration += durationToAdd;
            if (todayStatsLookup[taskId]) {
                acc[taskId].todayDuration = todayStatsLookup[taskId].todayDuration;
            }
            return acc;
        }, {});
        let tasks = Object.entries(taskAggregates).map(([taskId, agg]) => ({
            id: taskId,
            title: agg.title,
            duration: agg.duration,
            todayDuration: agg.todayDuration,
            updatedAt: agg.updatedAt
        }));
        tasks = tasks.map((task) => {
            const duration = parseInt(task.duration, 10);
            const todayDuration = parseInt(task.todayDuration, 10);
            // Update task with parsed numeric values
            task.duration = isNaN(duration) ? null : duration;
            task.todayDuration = isNaN(todayDuration) ? null : todayDuration;
            if (!isNaN(task.duration) && totalDurationValue !== 0) {
                task.durationPercentage = parseFloat(((task.duration * 100) / totalDurationValue).toFixed(2));
            }
            else {
                task.durationPercentage = 0;
            }
            return task;
        });
        if ((0, index_1.isNotEmpty)(take)) {
            tasks = tasks.splice(0, take);
        }
        console.log('Task Aggregates: ', tasks);
        return tasks;
    }
    /**
     * GET Time Tracking Dashboard Manual Time Logs Statistics
     *
     * @param request
     * @returns
     */
    async manualTimes(request) {
        console.time('Get Manual Time Log');
        const { organizationId, startDate, endDate } = request;
        let { employeeIds = [], projectIds = [], teamIds = [] } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        /**
         * Set employeeIds based on user conditions and permissions
         */
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        query.leftJoinAndSelect(`${query.alias}.project`, 'project');
        query.leftJoinAndSelect(`${query.alias}.employee`, 'employee');
        query.leftJoinAndSelect(`employee.user`, 'user');
        query.setFindOptions({
            take: 5,
            order: {
                startedAt: 'DESC'
            }
        });
        query.where((qb) => {
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."logType" = :logType`), {
                    logType: contracts_1.TimeLogType.MANUAL
                });
            }));
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" BETWEEN :start AND :end`), {
                    start,
                    end
                });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeSlots"."startedAt" BETWEEN :start AND :end`), {
                    start,
                    end
                });
            }));
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
            }));
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeSlots"."tenantId" = :tenantId`), { tenantId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeSlots"."organizationId" = :organizationId`), { organizationId });
            }));
            qb.andWhere(new typeorm_1.Brackets((web) => {
                if ((0, index_1.isNotEmpty)(employeeIds)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" IN (:...employeeIds)`), {
                        employeeIds
                    });
                }
                if ((0, index_1.isNotEmpty)(projectIds)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."projectId" IN (:...projectIds)`), {
                        projectIds
                    });
                }
                if ((0, index_1.isNotEmpty)(teamIds)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationTeamId" IN (:...teamIds)`), { teamIds });
                }
            }));
        });
        const timeLogs = await query.getMany();
        const mappedTimeLogs = timeLogs.map((timeLog) => ({
            id: timeLog.id,
            startedAt: timeLog.startedAt,
            duration: timeLog.duration,
            user: { ...(0, underscore_1.pick)(timeLog.employee.user, ['name', 'imageUrl']) },
            project: { ...(0, underscore_1.pick)(timeLog.project, ['name', 'imageUrl']) },
            employeeId: timeLog.employee.id
        }));
        console.timeEnd('Get Manual Time Log');
        return mappedTimeLogs || [];
    }
    /**
     * GET Time Tracking Dashboard Activities Statistics
     *
     * @param request
     * @returns
     */
    async getActivities(request) {
        const { organizationId, startDate, endDate } = request;
        let { employeeIds = [], projectIds = [], teamIds = [] } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Retrieves the database type from the configuration service.
        const dbType = this.configService.dbConnectionOptions.type;
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        /**
         * Set employeeIds based on user conditions and permissions
         */
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmActivityRepository.createQueryBuilder();
        query
            .select((0, database_helper_1.prepareSQLQuery)(`COUNT("${query.alias}"."id")`), `sessions`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`SUM("${query.alias}"."duration")`), `duration`)
            .addSelect((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title"`), `title`)
            .innerJoin(`${query.alias}.timeSlot`, 'time_slot')
            .innerJoin(`time_slot.timeLogs`, 'time_log')
            .addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."title"`));
        query
            .andWhere((0, statistic_helper_1.getActivityDurationQueryString)(dbType, query.alias), { start, end })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."startedAt" BETWEEN :startDate AND :endDate`), {
                startDate: start,
                endDate: end
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :startDate AND :endDate`), {
                startDate: start,
                endDate: end
            });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), { projectIds });
            }
            if ((0, index_1.isNotEmpty)(teamIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."organizationTeamId" IN (:...teamIds)`), { teamIds });
            }
        }))
            .orderBy((0, database_helper_1.prepareSQLQuery)(`"duration"`), 'DESC')
            .limit(5);
        let activities = await query.getRawMany();
        /*
         * Fetch total duration of the week for calculate duration percentage
         */
        const totalDurationQuery = this.typeOrmActivityRepository.createQueryBuilder();
        totalDurationQuery
            .select((0, database_helper_1.prepareSQLQuery)(`SUM("${totalDurationQuery.alias}"."duration")`), `duration`)
            .innerJoin(`${totalDurationQuery.alias}.timeSlot`, 'time_slot')
            .innerJoin(`time_slot.timeLogs`, 'time_log');
        totalDurationQuery
            .andWhere((0, statistic_helper_1.getActivityDurationQueryString)(dbType, totalDurationQuery.alias), { start, end })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."startedAt" BETWEEN :startDate AND :endDate`), {
                startDate: start,
                endDate: end
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :startDate AND :endDate`), {
                startDate: start,
                endDate: end
            });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."organizationId" = :organizationId`), { organizationId });
        }))
            .andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${totalDurationQuery.alias}"."projectId" IN (:...projectIds)`), { projectIds });
            }
            if ((0, index_1.isNotEmpty)(teamIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."organizationTeamId" IN (:...teamIds)`), { teamIds });
            }
        }));
        const totalDuration = await totalDurationQuery.getRawOne();
        activities = activities.map((activity) => {
            activity.durationPercentage = (activity.duration * 100) / totalDuration.duration;
            return activity;
        });
        return activities || [];
    }
    /**
     * GET Time Tracking Dashboard Time Slots Statistics
     *
     * @param request
     * @returns
     */
    async getEmployeeTimeSlots(request) {
        console.time('Get Employee TimeSlots');
        const { organizationId, startDate, endDate } = request;
        let { employeeIds = [], projectIds = [], teamIds = [] } = request;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        /**
         * Set employeeIds based on user conditions and permissions
         */
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmTimeLogRepository.createQueryBuilder();
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'time_slot');
        query.innerJoin(`employee.user`, 'user');
        query.select((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`), 'id');
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`MAX("${query.alias}"."startedAt")`), 'startedAt');
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`"user"."imageUrl"`), 'user_image_url');
        // Builds a SELECT statement for the "user_name" column based on the database type.
        query.addSelect((0, database_helper_1.prepareSQLQuery)(`${(0, statistic_helper_1.concateUserNameExpression)(this.configService.dbConnectionOptions.type)}`), 'user_name');
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" BETWEEN :start AND :end`), { start, end });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."organizationId" = :organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."startedAt" BETWEEN :start AND :end`), { start, end });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), { projectIds });
            }
            if ((0, index_1.isNotEmpty)(teamIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationTeamId" IN (:...teamIds)`), { teamIds });
            }
        }));
        query.groupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`));
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"user"."id"`));
        query.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"startedAt"`), 'DESC');
        query.limit(3);
        let employees = [];
        employees = await query.getRawMany();
        for await (const employee of employees) {
            employee.user = {
                imageUrl: employee.user_image_url,
                name: employee.user_name
            };
            delete employee.user_image_url;
            delete employee.user_name;
            const query = this.typeOrmTimeSlotRepository.createQueryBuilder();
            query.innerJoinAndSelect(`${query.alias}.timeLogs`, 'timeLogs');
            query.leftJoinAndSelect(`${query.alias}.employee`, 'employee');
            query.leftJoinAndSelect(`${query.alias}.screenshots`, 'screenshots');
            query.where((qb) => {
                qb.andWhere(new typeorm_1.Brackets((web) => {
                    const { id: employeeId } = employee;
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), { employeeId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" BETWEEN :start AND :end`), { start, end });
                }));
                qb.andWhere(new typeorm_1.Brackets((web) => {
                    const { id: employeeId } = employee;
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" = :employeeId`), { employeeId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" = :organizationId`), { organizationId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" = :tenantId`), { tenantId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" BETWEEN :start AND :end`), { start, end });
                    if ((0, index_1.isNotEmpty)(projectIds)) {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), { projectIds });
                    }
                    if ((0, index_1.isNotEmpty)(teamIds)) {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationTeamId" IN (:...teamIds)`), { teamIds });
                    }
                }));
            });
            query.orderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt"`), 'DESC');
            query.limit(9);
            employee.timeSlots = await query.getMany();
        }
        console.timeEnd('Get Employee TimeSlots');
        return employees;
    }
    /**
     * Get employees count who worked in this week.
     *
     * @param request
     * @returns
     */
    async getEmployeeWorkedCounts(request) {
        const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
        query.select((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`), 'employeeId');
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'time_slot');
        query.andWhere(new typeorm_1.Brackets((where) => {
            this.getFilterQuery(query, where, request);
        }));
        query.groupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`));
        const employees = await query.getRawMany();
        return employees.length;
    }
    /**
     * Get projects count who worked in this week.
     *
     * @param request
     * @returns
     */
    async getProjectWorkedCounts(request) {
        const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
        query.select((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId"`), 'projectId');
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.project`, 'project');
        query.innerJoin(`${query.alias}.timeSlots`, 'time_slot');
        query.andWhere(new typeorm_1.Brackets((where) => {
            this.getFilterQuery(query, where, request);
        }));
        query.groupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId"`));
        const projects = await query.getRawMany();
        return projects.length;
    }
    /**
     * Applies filtering conditions to the given TypeORM query builder based on the provided request parameters.
     *
     * @param query The TypeORM query builder instance.
     * @param qb The TypeORM WhereExpressionBuilder instance.
     * @param request The request object containing filter parameters.
     * @returns The modified TypeORM WhereExpressionBuilder instance with applied filtering conditions.
     */
    getFilterQuery(query, qb, request) {
        const { organizationId, startDate, endDate, employeeIds = [], projectIds = [], teamIds = [] } = request;
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        qb.andWhere(`${query.alias}.tenantId = :tenantId`, { tenantId });
        qb.andWhere(`${query.alias}.organizationId = :organizationId`, { organizationId });
        qb.andWhere(`${query.alias}.startedAt BETWEEN :startDate AND :endDate`, { startDate: start, endDate: end });
        qb.andWhere(`time_slot.startedAt BETWEEN :startDate AND :endDate`, { startDate: start, endDate: end });
        if ((0, index_1.isNotEmpty)(request.activityLevel)) {
            const { start: startLevel, end: endLevel } = request.activityLevel;
            qb.andWhere(`time_slot.overall BETWEEN :startLevel AND :endLevel`, { startLevel: startLevel * 6, endLevel: endLevel * 6 });
        }
        if ((0, index_1.isNotEmpty)(request.logType)) {
            qb.andWhere(`${query.alias}.logType IN (:...logType)`, { logType: request.logType });
        }
        if ((0, index_1.isNotEmpty)(request.source)) {
            qb.andWhere(`${query.alias}.source IN (:...source)`, { source: request.source });
        }
        if ((0, index_1.isNotEmpty)(employeeIds)) {
            qb.andWhere(`${query.alias}.employeeId IN (:...employeeIds)`, { employeeIds })
                .andWhere(`time_slot.employeeId IN (:...employeeIds)`, { employeeIds });
        }
        if ((0, index_1.isNotEmpty)(projectIds)) {
            qb.andWhere(`${query.alias}.projectId IN (:...projectIds)`, { projectIds });
        }
        if ((0, index_1.isNotEmpty)(teamIds)) {
            qb.andWhere(`${query.alias}.organizationTeamId IN (:...teamIds)`, { teamIds });
        }
        return qb;
    }
};
exports.StatisticService = StatisticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        repository_1.TypeOrmActivityRepository,
        repository_2.TypeOrmTimeLogRepository,
        repository_2.MikroOrmTimeLogRepository,
        index_2.ConfigService])
], StatisticService);
//# sourceMappingURL=statistic.service.js.map