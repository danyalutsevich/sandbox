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
exports.TimesheetRecalculateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
;
const timesheet_service_1 = require("../../timesheet.service");
const timesheet_recalculate_command_1 = require("../timesheet-recalculate.command");
const internal_1 = require("./../../../../core/entities/internal");
const context_1 = require("./../../../../core/context");
const utils_1 = require("./../../../../core/utils");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_slot_repository_1 = require("../../../time-slot/repository/type-orm-time-slot.repository");
let TimesheetRecalculateHandler = exports.TimesheetRecalculateHandler = class TimesheetRecalculateHandler {
    timesheetService;
    typeOrmTimeSlotRepository;
    constructor(timesheetService, typeOrmTimeSlotRepository) {
        this.timesheetService = timesheetService;
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { id } = command;
        const timesheet = await this.timesheetService.findOneByIdString(id);
        const tenantId = context_1.RequestContext.currentTenantId();
        const { employeeId, organizationId } = timesheet;
        const { start: startedAt, end: stoppedAt } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(timesheet.startedAt), moment_1.default.utc(timesheet.stoppedAt));
        const query = this.typeOrmTimeSlotRepository.createQueryBuilder();
        const timeSlot = await query
            .select('SUM(duration)', 'duration')
            .addSelect('AVG(keyboard)', 'keyboard')
            .addSelect('AVG(mouse)', 'mouse')
            .addSelect('AVG(overall)', 'overall')
            .where(new typeorm_2.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), {
                employeeId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), {
                tenantId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" >= :startedAt AND "${query.alias}"."startedAt" < :stoppedAt`), {
                startedAt,
                stoppedAt
            });
        }))
            .getRawOne();
        try {
            await this.timesheetService.update(id, {
                duration: Math.round(timeSlot.duration),
                keyboard: Math.round(timeSlot.keyboard),
                mouse: Math.round(timeSlot.mouse),
                overall: Math.round(timeSlot.overall)
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Can\'t update timesheet for employee-${employeeId} of organization-${organizationId}`);
        }
        return await this.timesheetService.findOneByIdString(id);
    }
};
exports.TimesheetRecalculateHandler = TimesheetRecalculateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(timesheet_recalculate_command_1.TimesheetRecalculateCommand),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __metadata("design:paramtypes", [timesheet_service_1.TimeSheetService,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository])
], TimesheetRecalculateHandler);
//# sourceMappingURL=timesheet-recalculate.handler.js.map