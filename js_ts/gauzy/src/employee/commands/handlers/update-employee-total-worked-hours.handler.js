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
exports.UpdateEmployeeTotalWorkedHoursHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../plugins/config/dist/index");
const database_helper_1 = require("./../../../database/database.helper");
const update_employee_total_worked_hours_command_1 = require("../update-employee-total-worked-hours.command");
const employee_service_1 = require("../../employee.service");
const internal_1 = require("./../../../core/entities/internal");
const context_1 = require("./../../../core/context");
const type_orm_time_log_repository_1 = require("../../../time-tracking/time-log/repository/type-orm-time-log.repository");
const mikro_orm_time_log_repository_1 = require("../../../time-tracking/time-log/repository/mikro-orm-time-log.repository");
const config = (0, index_1.getConfig)();
let UpdateEmployeeTotalWorkedHoursHandler = exports.UpdateEmployeeTotalWorkedHoursHandler = class UpdateEmployeeTotalWorkedHoursHandler {
    employeeService;
    typeOrmTimeLogRepository;
    mikroOrmTimeLogRepository;
    constructor(employeeService, typeOrmTimeLogRepository, mikroOrmTimeLogRepository) {
        this.employeeService = employeeService;
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.mikroOrmTimeLogRepository = mikroOrmTimeLogRepository;
    }
    /**
     *
     * @param command
     */
    async execute(command) {
        const { employeeId, hours } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        let totalWorkHours;
        if (hours) {
            totalWorkHours = hours;
        }
        else {
            let sumQuery = this.getSumQuery();
            const query = this.typeOrmTimeLogRepository.createQueryBuilder();
            query.select(sumQuery, `duration`);
            query.where({ employeeId, tenantId });
            const logs = await query.getRawOne();
            totalWorkHours = (logs.duration || 0) / 3600;
        }
        await this.employeeService.update(employeeId, {
            totalWorkHours: parseInt(totalWorkHours + '', 10)
        });
    }
    /**
     * Get the database-specific sum query for calculating time duration between "startedAt" and "stoppedAt".
     * @returns The database-specific sum query.
     */
    getSumQuery() {
        let sumQuery;
        switch (config.dbConnectionOptions.type) {
            case index_1.DatabaseTypeEnum.sqlite:
            case index_1.DatabaseTypeEnum.betterSqlite3:
                sumQuery = 'SUM((julianday("stoppedAt") - julianday("startedAt")) * 86400)';
                break;
            case index_1.DatabaseTypeEnum.postgres:
                sumQuery = 'SUM(extract(epoch from ("stoppedAt" - "startedAt")))';
                break;
            case index_1.DatabaseTypeEnum.mysql:
                sumQuery = (0, database_helper_1.prepareSQLQuery)('SUM(TIMESTAMPDIFF(SECOND, "startedAt", "stoppedAt"))');
                break;
            default:
                throw Error(`cannot update employee total worked hours due to unsupported database type: ${config.dbConnectionOptions.type}`);
        }
        return sumQuery;
    }
};
exports.UpdateEmployeeTotalWorkedHoursHandler = UpdateEmployeeTotalWorkedHoursHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_employee_total_worked_hours_command_1.UpdateEmployeeTotalWorkedHoursCommand),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.TimeLog)),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService,
        type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository])
], UpdateEmployeeTotalWorkedHoursHandler);
//# sourceMappingURL=update-employee-total-worked-hours.handler.js.map