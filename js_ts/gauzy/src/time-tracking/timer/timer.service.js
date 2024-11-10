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
exports.TimerService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const contracts_1 = require("../../../plugins/contracts");
const index_1 = require("../../../plugins/common/dist/index");
const context_1 = require("../../core/context");
const utils_1 = require("../../core/utils");
const database_helper_1 = require("../../database/database.helper");
const commands_1 = require("../time-log/commands");
const repository_1 = require("../time-log/repository");
const repository_2 = require("../../employee/repository");
const timer_helper_1 = require("./timer.helper");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
let TimerService = exports.TimerService = class TimerService {
    typeOrmTimeLogRepository;
    mikroOrmTimeLogRepository;
    typeOrmEmployeeRepository;
    mikroOrmEmployeeRepository;
    commandBus;
    ormType = ormType;
    constructor(typeOrmTimeLogRepository, mikroOrmTimeLogRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, commandBus) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.mikroOrmTimeLogRepository = mikroOrmTimeLogRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.mikroOrmEmployeeRepository = mikroOrmEmployeeRepository;
        this.commandBus = commandBus;
    }
    /**
     * Fetches an employee based on the provided query.
     *
     * @param query - The query parameters to find the employee.
     * @returns A Promise resolving to the employee entity or null.
     */
    async fetchEmployee(query) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                return await this.mikroOrmEmployeeRepository.findOneByOptions(query);
            case utils_1.MultiORMEnum.TypeORM:
                return await this.typeOrmEmployeeRepository.findOneByOptions(query);
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Get timer status
     *
     * @param request
     * @returns
     */
    async getTimerStatus(request) {
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { organizationId, source, todayStart, todayEnd } = request;
        let employee;
        /** SUPER_ADMIN have ability to see employees timer status by specific employee (employeeId) */
        const permission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        if (!!permission && (0, index_1.isNotEmpty)(request.employeeId)) {
            const { employeeId } = request;
            employee = await this.fetchEmployee({ id: employeeId, tenantId, organizationId, });
        }
        else {
            const userId = context_1.RequestContext.currentUserId();
            employee = await this.fetchEmployee({ userId, tenantId, organizationId });
        }
        if (!employee) {
            throw new common_1.NotFoundException("We couldn't find the employee you were looking for.");
        }
        const { id: employeeId } = employee;
        /** */
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(todayStart || (0, moment_1.default)().startOf('day')), moment_1.default.utc(todayEnd || (0, moment_1.default)().endOf('day')));
        let logs = [];
        let lastLog;
        // Define common parameters for querying
        const queryParams = {
            ...(source ? { source } : {}),
            startedAt: (0, typeorm_1.Between)(start, end),
            stoppedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            employeeId,
            tenantId,
            organizationId
        };
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                /**
                 * Get today's completed timelogs
                 */
                const parseQueryParams = (0, utils_1.parseTypeORMFindToMikroOrm)((0, timer_helper_1.buildLogQueryParameters)(queryParams));
                const items = await this.mikroOrmTimeLogRepository.findAll(parseQueryParams);
                // Optionally wrapSerialize is a function that serializes the entity
                logs = items.map((entity) => (0, utils_1.wrapSerialize)(entity));
                /**
                 * Get today's last log (running or completed)
                 */
                // Common query parameters for time log operations.
                const lastLogQueryParamsMikroOrm = (0, timer_helper_1.buildCommonQueryParameters)(queryParams);
                // Adds relations from the request to the query parameters.
                (0, timer_helper_1.addRelationsToQuery)(lastLogQueryParamsMikroOrm, request);
                // Converts TypeORM-style query parameters to a format compatible with MikroORM.
                const parseMikroOrmOptions = (0, utils_1.parseTypeORMFindToMikroOrm)(lastLogQueryParamsMikroOrm);
                // Get today's last log (running or completed)
                lastLog = await this.mikroOrmTimeLogRepository.findOne(parseMikroOrmOptions.where, parseMikroOrmOptions.mikroOptions);
                break;
            case utils_1.MultiORMEnum.TypeORM:
                // Get today's completed timelogs
                logs = await this.typeOrmTimeLogRepository.find((0, timer_helper_1.buildLogQueryParameters)(queryParams));
                const lastLogQueryParamsTypeOrm = (0, timer_helper_1.buildCommonQueryParameters)(queryParams); // Common query parameters for time log operations.
                (0, timer_helper_1.addRelationsToQuery)(lastLogQueryParamsTypeOrm, request); // Adds relations from the request to the query parameters.
                // Get today's last log (running or completed)
                lastLog = await this.typeOrmTimeLogRepository.findOne(lastLogQueryParamsTypeOrm);
                break;
            default:
                throw new Error(`Not implemented for ${ormType}`);
        }
        const status = {
            duration: 0,
            running: false,
            lastLog: null,
        };
        // Calculate completed timelogs duration
        status.duration += logs.filter(Boolean).reduce((sum, log) => sum + log.duration, 0);
        // Calculate last TimeLog duration
        if (lastLog) {
            status.lastLog = lastLog;
            status.running = lastLog.isRunning;
            if (status.running) {
                status.duration += Math.abs((0, moment_1.default)().diff((0, moment_1.default)(lastLog.startedAt), 'seconds'));
            }
        }
        return status;
    }
    /**
     * Start time tracking
     *
     * @param request
     * @returns
     */
    async startTimer(request) {
        console.log('----------------------------------Started Timer Date----------------------------------', moment_1.default.utc(request.startedAt).toDate());
        const { organizationId, source, logType } = request;
        /**
         * If source, logType not found in request then reject the request.
         */
        const c1 = Object.values(contracts_1.TimeLogSourceEnum).includes(source);
        const c2 = Object.values(contracts_1.TimeLogType).includes(logType);
        if (!c1 || !c2) {
            throw new common_1.BadRequestException();
        }
        const userId = context_1.RequestContext.currentUserId();
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const employee = await this.typeOrmEmployeeRepository.findOneBy({
            userId,
            tenantId,
        });
        if (!employee) {
            throw new common_1.NotFoundException("We couldn't find the employee you were looking for.");
        }
        const { id: employeeId } = employee;
        const lastLog = await this.getLastRunningLog(request);
        console.log('Start Timer Time Log', { request, lastLog });
        if (lastLog) {
            /**
             * If you want to start timer, but employee timer is already started.
             * So, we have to first update stop timer entry in database, then create start timer entry.
             * It will manage to create proper entires in database
             */
            console.log('Schedule Time Log Entries Command', lastLog);
            await this.commandBus.execute(new commands_1.ScheduleTimeLogEntriesCommand(lastLog));
        }
        await this.typeOrmEmployeeRepository.update({ id: employeeId }, {
            isOnline: true,
            isTrackingTime: true, // Employee time tracking status
        });
        const { projectId, taskId, organizationContactId, organizationTeamId, description, isBillable, version, } = request;
        const now = moment_1.default.utc().toDate();
        const startedAt = request.startedAt ? moment_1.default.utc(request.startedAt).toDate() : now;
        return await this.commandBus.execute(new commands_1.TimeLogCreateCommand({
            organizationId,
            tenantId,
            employeeId,
            startedAt: startedAt,
            stoppedAt: startedAt,
            duration: 0,
            source: source || contracts_1.TimeLogSourceEnum.WEB_TIMER,
            logType: logType || contracts_1.TimeLogType.TRACKED,
            projectId: projectId || null,
            taskId: taskId || null,
            organizationContactId: organizationContactId || null,
            organizationTeamId: organizationTeamId || null,
            description: description || null,
            isBillable: isBillable || false,
            version: version || null,
            isRunning: true,
        }));
    }
    /**
     * Stop time tracking
     *
     * @param request
     * @returns
     */
    async stopTimer(request) {
        console.log('----------------------------------Stopped Timer Date----------------------------------', moment_1.default.utc(request.stoppedAt).toDate());
        const { organizationId } = request;
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const userId = context_1.RequestContext.currentUserId();
        const employee = await this.typeOrmEmployeeRepository.findOneBy({
            userId,
            tenantId,
        });
        if (!employee) {
            throw new common_1.NotFoundException("We couldn't find the employee you were looking for.");
        }
        const { id: employeeId } = employee;
        await this.typeOrmEmployeeRepository.update({ id: employeeId }, {
            isOnline: false,
            isTrackingTime: false, // Employee time tracking status
        });
        let lastLog = await this.getLastRunningLog(request);
        if (!lastLog) {
            /**
             * If you want to stop timer, but employee timer is already stopped.
             * So, we have to first create start timer entry in database, then update stop timer entry.
             * It will manage to create proper entires in database
             */
            await this.startTimer(request);
            lastLog = await this.getLastRunningLog(request);
        }
        const now = moment_1.default.utc().toDate();
        const stoppedAt = request.stoppedAt ? moment_1.default.utc(request.stoppedAt).toDate() : now;
        /** Function that performs the date range validation */
        try {
            (0, utils_1.validateDateRange)(lastLog.startedAt, stoppedAt);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
        lastLog = await this.commandBus.execute(new commands_1.TimeLogUpdateCommand({
            stoppedAt,
            isRunning: false,
        }, lastLog.id, request.manualTimeSlot));
        console.log('Stop Timer Time Log', { lastLog });
        try {
            const conflicts = await this.commandBus.execute(new commands_1.IGetConflictTimeLogCommand({
                ignoreId: lastLog.id,
                startDate: lastLog.startedAt,
                endDate: lastLog.stoppedAt,
                employeeId: lastLog.employeeId,
                organizationId: organizationId || lastLog.organizationId,
                tenantId,
            }));
            console.log('Get Conflicts Time Logs', conflicts, {
                ignoreId: lastLog.id,
                startDate: lastLog.startedAt,
                endDate: lastLog.stoppedAt,
                employeeId: lastLog.employeeId,
                organizationId: request.organizationId || lastLog.organizationId,
                tenantId,
            });
            if ((0, index_1.isNotEmpty)(conflicts)) {
                const times = {
                    start: new Date(lastLog.startedAt),
                    end: new Date(lastLog.stoppedAt),
                };
                if ((0, index_1.isNotEmpty)(conflicts)) {
                    await Promise.all(await conflicts.map(async (timeLog) => {
                        const { timeSlots = [] } = timeLog;
                        timeSlots.map(async (timeSlot) => {
                            await this.commandBus.execute(new commands_1.DeleteTimeSpanCommand(times, timeLog, timeSlot));
                        });
                    }));
                }
            }
        }
        catch (error) {
            console.error('Error while deleting time span during conflicts timelogs', error);
        }
        return lastLog;
    }
    /**
     * Toggle time tracking start/stop
     *
     * @param request
     * @returns
     */
    async toggleTimeLog(request) {
        const lastLog = await this.getLastRunningLog(request);
        if (!lastLog) {
            return this.startTimer(request);
        }
        else {
            return this.stopTimer(request);
        }
    }
    /**
     * Get employee last running timer
     *
     * @param request
     * @returns
     */
    async getLastRunningLog(request) {
        const userId = context_1.RequestContext.currentUserId();
        const tenantId = context_1.RequestContext.currentTenantId();
        const employee = await this.typeOrmEmployeeRepository.findOne({
            where: {
                userId,
                tenantId,
            },
            relations: {
                user: true,
            },
        });
        if (!employee) {
            throw new common_1.NotFoundException("We couldn't find the employee you were looking for.");
        }
        if (!employee.isTrackingEnabled) {
            throw new common_1.ForbiddenException(`The time tracking functionality has been disabled for you.`);
        }
        const { id: employeeId } = employee;
        return await this.typeOrmTimeLogRepository.findOne({
            where: {
                stoppedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
                employeeId,
                tenantId,
                organizationId: request.organizationId,
                isRunning: true,
            },
            order: {
                startedAt: 'DESC',
                createdAt: 'DESC',
            },
        });
    }
    /**
     * Get timer worked status
     *
     * @param request The input parameters for the query.
     * @returns The timer status for the employee.
     */
    async getTimerWorkedStatus(request) {
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { organizationId, organizationTeamId, source } = request;
        // Define the array to store employeeIds
        let employeeIds = [];
        const permissions = [contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE, contracts_1.PermissionsEnum.ORG_MEMBER_LAST_LOG_VIEW];
        // Check if the current user has any of the specified permissions
        if (context_1.RequestContext.hasAnyPermission(permissions)) {
            // If yes, set employeeIds based on request.employeeIds or request.employeeId
            employeeIds = request.employeeIds ? request.employeeIds.filter(Boolean) : [request.employeeId].filter(Boolean);
        }
        else {
            // EMPLOYEE have the ability to see only their own timer status
            const employeeId = context_1.RequestContext.currentEmployeeId();
            employeeIds = [employeeId];
        }
        let lastLogs = [];
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const knex = this.mikroOrmTimeLogRepository.getKnex();
                // Construct your SQL query using knex
                let sqlQuery = knex('time_log').select(knex.raw('DISTINCT ON ("time_log"."employeeId") *'));
                // Builds an SQL query with specific where clauses.
                sqlQuery.whereNotNull('startedAt');
                sqlQuery.whereNotNull('stoppedAt');
                sqlQuery.whereIn('employeeId', employeeIds);
                sqlQuery.andWhere({
                    tenantId,
                    organizationId,
                    isActive: true,
                    isArchived: false
                });
                if (source) {
                    sqlQuery = sqlQuery.andWhere({ source });
                }
                if (organizationTeamId) {
                    sqlQuery = sqlQuery.andWhere({ organizationTeamId });
                }
                // Adds ordering to the SQL query.
                sqlQuery = sqlQuery.orderBy([
                    { column: 'employeeId', order: 'ASC' },
                    { column: 'startedAt', order: 'DESC' },
                    { column: 'createdAt', order: 'DESC' }
                ]);
                // Execute the raw SQL query and get the results
                const rawResults = (await knex.raw(sqlQuery.toString())).rows || [];
                const timeLogIds = rawResults.map((entry) => entry.id);
                // Converts TypeORM find options to a format compatible with MikroORM for a given entity.
                const { mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({
                    ...(request.relations ? { relations: request.relations } : {})
                });
                // Get last logs group by employees (running or completed);
                lastLogs = (await this.mikroOrmTimeLogRepository.find({ id: { $in: timeLogIds } }, mikroOptions)).map((item) => (0, utils_1.wrapSerialize)(item));
                break;
            case utils_1.MultiORMEnum.TypeORM:
                /**
                 * Get last logs (running or completed)
                 */
                const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
                // query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
                query.setFindOptions({
                    ...(request['relations'] ? { relations: request['relations'] } : {}),
                });
                query.where({
                    startedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
                    stoppedAt: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
                    employeeId: (0, typeorm_1.In)(employeeIds),
                    tenantId,
                    organizationId,
                    isActive: true,
                    isArchived: false,
                    ...((0, index_1.isNotEmpty)(source) ? { source } : {}),
                    ...((0, index_1.isNotEmpty)(organizationTeamId) ? { organizationTeamId } : {}),
                });
                query.orderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`), 'ASC'); // Adjust ORDER BY to match the SELECT list
                query.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt"`), 'DESC');
                query.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."createdAt"`), 'DESC');
                // Get last logs group by employees (running or completed)
                lastLogs = await query.distinctOn([(0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId"`)]).getMany();
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        /** Transform an array of ITimeLog objects into an array of ITimerStatus objects. */
        const statistics = lastLogs.map((lastLog) => ({
            duration: lastLog?.duration || 0,
            running: lastLog?.isRunning || false,
            lastLog: lastLog || null,
            timerStatus: lastLog?.isRunning ? 'running' : (0, moment_1.default)(lastLog?.stoppedAt).diff(new Date(), 'day') > 0 ? 'idle' : 'pause',
        }));
        /**
         * @returns An array of ITimerStatus objects.
         */
        return statistics;
    }
};
exports.TimerService = TimerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmTimeLogRepository,
        repository_1.MikroOrmTimeLogRepository,
        repository_2.TypeOrmEmployeeRepository,
        repository_2.MikroOrmEmployeeRepository,
        cqrs_1.CommandBus])
], TimerService);
//# sourceMappingURL=timer.service.js.map