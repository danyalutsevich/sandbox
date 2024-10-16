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
exports.TimesheetFirstOrCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const internal_1 = require("./../../../../core/entities/internal");
const context_1 = require("./../../../../core/context");
const timesheet_first_or_create_command_1 = require("./../timesheet-first-or-create.command");
const timesheet_create_command_1 = require("./../timesheet-create.command");
const database_helper_1 = require("./../../../../database/database.helper");
let TimesheetFirstOrCreateHandler = exports.TimesheetFirstOrCreateHandler = class TimesheetFirstOrCreateHandler {
    timeSheetRepository;
    employeeRepository;
    commandBus;
    constructor(timeSheetRepository, employeeRepository, commandBus) {
        this.timeSheetRepository = timeSheetRepository;
        this.employeeRepository = employeeRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { date, employeeId } = command;
        let { organizationId } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        const startedAt = moment_1.default.utc(date).startOf('week');
        const stoppedAt = moment_1.default.utc(date).endOf('week');
        /**
         * If organization not found,use employee organization
         */
        if (!organizationId) {
            const employee = await this.employeeRepository.findOneBy({
                id: employeeId,
                tenantId
            });
            organizationId = employee.organizationId;
        }
        try {
            /**
             * Find employee current week working timesheet
             */
            const query = this.timeSheetRepository.createQueryBuilder('timesheet');
            query.where((query) => {
                query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.where([
                        {
                            startedAt: (0, typeorm_2.Between)(startedAt.toDate(), stoppedAt.toDate())
                        },
                        {
                            stoppedAt: (0, typeorm_2.Between)(startedAt.toDate(), stoppedAt.toDate())
                        }
                    ]);
                }));
                query.andWhere(new typeorm_2.Brackets((qb) => {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), { employeeId });
                }));
            });
            return await query.getOneOrFail();
        }
        catch (error) {
            /**
             * Create employee current week working timesheet
             */
            return await this.commandBus.execute(new timesheet_create_command_1.TimesheetCreateCommand({
                startedAt: (0, moment_1.default)(startedAt).toDate(),
                stoppedAt: (0, moment_1.default)(stoppedAt).toDate(),
                employeeId,
                organizationId,
                mouse: 0,
                keyboard: 0,
                duration: 0
            }));
        }
    }
};
exports.TimesheetFirstOrCreateHandler = TimesheetFirstOrCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(timesheet_first_or_create_command_1.TimesheetFirstOrCreateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.Timesheet)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cqrs_1.CommandBus])
], TimesheetFirstOrCreateHandler);
//# sourceMappingURL=timesheet-first-or-create.handler.js.map