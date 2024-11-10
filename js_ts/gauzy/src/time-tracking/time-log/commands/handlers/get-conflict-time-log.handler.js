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
exports.GetConflictTimeLogHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../../plugins/config/dist/index");
const database_helper_1 = require("./../../../../database/database.helper");
const time_log_entity_1 = require("./../../time-log.entity");
const get_conflict_time_log_command_1 = require("../get-conflict-time-log.command");
const context_1 = require("./../../../../core/context");
const type_orm_time_log_repository_1 = require("../../repository/type-orm-time-log.repository");
let GetConflictTimeLogHandler = exports.GetConflictTimeLogHandler = class GetConflictTimeLogHandler {
    typeOrmTimeLogRepository;
    configService;
    constructor(typeOrmTimeLogRepository, configService) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.configService = configService;
    }
    async execute(command) {
        const { input } = command;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const { employeeId, organizationId } = input;
        const startedAt = moment_1.default.utc(input.startDate).toISOString();
        const stoppedAt = moment_1.default.utc(input.endDate).toISOString();
        let conflictQuery = this.typeOrmTimeLogRepository.createQueryBuilder();
        let query = ``;
        switch (this.configService.dbConnectionOptions.type) {
            case index_1.DatabaseTypeEnum.sqlite:
            case index_1.DatabaseTypeEnum.betterSqlite3:
                query = `'${startedAt}' >= "${conflictQuery.alias}"."startedAt" and '${startedAt}' <= "${conflictQuery.alias}"."stoppedAt"`;
                break;
            case index_1.DatabaseTypeEnum.postgres:
                query = `("${conflictQuery.alias}"."startedAt", "${conflictQuery.alias}"."stoppedAt") OVERLAPS (timestamptz '${startedAt}', timestamptz '${stoppedAt}')`;
                break;
            case index_1.DatabaseTypeEnum.mysql:
                query = (0, database_helper_1.prepareSQLQuery)(`"${conflictQuery.alias}"."startedAt" BETWEEN '${startedAt}' AND '${stoppedAt}' AND "${conflictQuery.alias}"."stoppedAt" BETWEEN '${startedAt}' AND '${stoppedAt}'`);
                break;
            default:
                throw Error(`cannot get conflict time log due to unsupported database type: ${this.configService.dbConnectionOptions.type}`);
        }
        conflictQuery = conflictQuery
            .innerJoinAndSelect(`${conflictQuery.alias}.timeSlots`, 'timeSlots')
            .where((0, database_helper_1.prepareSQLQuery)(`"${conflictQuery.alias}"."employeeId" = :employeeId`), { employeeId })
            .andWhere((0, database_helper_1.prepareSQLQuery)(`"${conflictQuery.alias}"."tenantId" = :tenantId`), { tenantId })
            .andWhere((0, database_helper_1.prepareSQLQuery)(`"${conflictQuery.alias}"."organizationId" = :organizationId`), { organizationId })
            .andWhere(query);
        if (input.relations) {
            input.relations.forEach((relation) => {
                conflictQuery = conflictQuery.leftJoinAndSelect(`${conflictQuery.alias}.${relation}`, relation);
            });
        }
        if (input.ignoreId) {
            conflictQuery = conflictQuery.andWhere(`${conflictQuery.alias}.id NOT IN (:...id)`, {
                id: input.ignoreId instanceof Array
                    ? input.ignoreId
                    : [input.ignoreId]
            });
        }
        return await conflictQuery.getMany();
    }
};
exports.GetConflictTimeLogHandler = GetConflictTimeLogHandler = __decorate([
    (0, cqrs_1.CommandHandler)(get_conflict_time_log_command_1.IGetConflictTimeLogCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        index_1.ConfigService])
], GetConflictTimeLogHandler);
//# sourceMappingURL=get-conflict-time-log.handler.js.map