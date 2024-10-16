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
exports.ScheduleTimeLogEntriesHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../../plugins/common/dist/index");
const index_2 = require("../../../../../plugins/config/dist/index");
const database_helper_1 = require("./../../../../database/database.helper");
;
const time_log_entity_1 = require("./../../time-log.entity");
const schedule_time_log_entries_command_1 = require("../schedule-time-log-entries.command");
const context_1 = require("./../../../../core/context");
const type_orm_time_log_repository_1 = require("../../repository/type-orm-time-log.repository");
let ScheduleTimeLogEntriesHandler = exports.ScheduleTimeLogEntriesHandler = class ScheduleTimeLogEntriesHandler {
    typeOrmTimeLogRepository;
    constructor(typeOrmTimeLogRepository) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
    }
    async execute(command) {
        const { timeLog } = command;
        let timeLogs = [];
        if (timeLog) {
            const { organizationId, employeeId } = timeLog;
            const tenantId = context_1.RequestContext.currentTenantId();
            const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
            query.setFindOptions({
                relations: {
                    timeSlots: true
                }
            });
            query.where((qb) => {
                qb.andWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" = :employeeId`), { employeeId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                }));
                qb.andWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere(new typeorm_2.Brackets((web) => {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."stoppedAt" IS NOT NULL`));
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."isRunning" = :isRunning`), { isRunning: true });
                    }));
                    web.orWhere(new typeorm_2.Brackets((web) => {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."stoppedAt" IS NULL`));
                    }));
                }));
                console.log('Schedule Time Log Query For Tenant Organization Entries', qb.getQueryAndParameters());
            });
            timeLogs = await query.getMany();
        }
        else {
            const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
            query.setFindOptions({
                relations: {
                    timeSlots: true
                }
            });
            query.where((qb) => {
                qb.andWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."stoppedAt" IS NOT NULL`));
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."isRunning" = :isRunning`), { isRunning: true });
                }));
                qb.orWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."stoppedAt" IS NULL`));
                }));
                console.log('Schedule Time Log Query For All Entries', query.getQueryAndParameters());
            });
            timeLogs = await query.getMany();
        }
        for await (const timeLog of timeLogs) {
            console.log('Schedule Time Log Entry', timeLog);
            const logDifference = (0, moment_1.default)().diff(moment_1.default.utc(timeLog.startedAt), 'minutes');
            if ((0, index_1.isEmpty)(timeLog.timeSlots) &&
                logDifference > 10) {
                console.log('Schedule Time Log Entry Updated StoppedAt Using StartedAt', timeLog.startedAt);
                await this.typeOrmTimeLogRepository.save({
                    id: timeLog.id,
                    stoppedAt: (0, moment_1.default)(timeLog.startedAt).add(10, 'seconds').toDate()
                });
            }
            else if ((0, index_1.isNotEmpty)(timeLog.timeSlots)) {
                let stoppedAt;
                let slotDifference;
                const duration = timeLog.timeSlots.reduce((sum, current) => sum + current.duration, 0);
                /**
                 * Adjust stopped date as per database selection
                 */
                switch ((0, index_2.getConfig)().dbConnectionOptions.type) {
                    case index_2.DatabaseTypeEnum.sqlite:
                    case index_2.DatabaseTypeEnum.betterSqlite3:
                        stoppedAt = moment_1.default.utc(timeLog.startedAt).add(duration, 'seconds').format('YYYY-MM-DD HH:mm:ss.SSS');
                        slotDifference = moment_1.default.utc((0, moment_1.default)()).diff(stoppedAt, 'minutes');
                        break;
                    case index_2.DatabaseTypeEnum.postgres:
                    case index_2.DatabaseTypeEnum.mysql:
                        stoppedAt = (0, moment_1.default)(timeLog.startedAt).add(duration, 'seconds').toDate();
                        slotDifference = (0, moment_1.default)().diff(moment_1.default.utc(stoppedAt), 'minutes');
                        break;
                    default:
                        throw Error(`cannot format startedAt, slotDifference due to unsupported database type: ${(0, index_2.getConfig)().dbConnectionOptions.type}`);
                }
                console.log('Schedule Time Log Entry Updated StoppedAt Using StoppedAt', stoppedAt);
                if (slotDifference > 10) {
                    await this.typeOrmTimeLogRepository.save({
                        id: timeLog.id,
                        stoppedAt: stoppedAt
                    });
                }
            }
            /**
             * Stop previous pending timer anyway.
             * If we have any pending TimeLog entry
             */
            await this.typeOrmTimeLogRepository.save({
                id: timeLog.id,
                isRunning: false
            });
            console.log('Schedule Time Log Entry Updated Entry', timeLog);
        }
    }
};
exports.ScheduleTimeLogEntriesHandler = ScheduleTimeLogEntriesHandler = __decorate([
    (0, cqrs_1.CommandHandler)(schedule_time_log_entries_command_1.ScheduleTimeLogEntriesCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository])
], ScheduleTimeLogEntriesHandler);
//# sourceMappingURL=schedule-time-log-entries.handler.js.map