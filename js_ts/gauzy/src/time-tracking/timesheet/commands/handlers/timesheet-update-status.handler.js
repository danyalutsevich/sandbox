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
exports.TimesheetUpdateStatusHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../../../../plugins/contracts/dist/index");
const index_2 = require("../../../../../plugins/common/dist/index");
const context_1 = require("./../../../../core/context");
const email_service_1 = require("./../../../../email-send/email.service");
const timesheet_update_status_command_1 = require("../timesheet-update-status.command");
const timesheet_entity_1 = require("./../../timesheet.entity");
let TimesheetUpdateStatusHandler = exports.TimesheetUpdateStatusHandler = class TimesheetUpdateStatusHandler {
    timeSheetRepository;
    emailService;
    constructor(timeSheetRepository, emailService) {
        this.timeSheetRepository = timeSheetRepository;
        this.emailService = emailService;
    }
    async execute(command) {
        const { input } = command;
        let { ids, status, organizationId } = input;
        if ((0, index_2.isEmpty)(ids)) {
            throw new common_1.NotAcceptableException('You can not update timesheet status');
        }
        if (typeof ids === 'string') {
            ids = [ids];
        }
        await this.timeSheetRepository.update({
            id: (0, typeorm_2.In)(ids),
            organizationId,
            tenantId: context_1.RequestContext.currentTenantId()
        }, {
            status: status,
            ...((status === index_1.TimesheetStatus.APPROVED) ? {
                approvedById: context_1.RequestContext.currentUserId()
            } : {}),
            ...((status === index_1.TimesheetStatus.APPROVED) ? {
                approvedAt: new Date()
            } : {
                approvedAt: null
            }),
        });
        const timesheets = await this.timeSheetRepository.find({
            relations: {
                employee: {
                    user: true
                }
            },
            where: {
                id: (0, typeorm_2.In)(ids),
                organizationId,
                tenantId: context_1.RequestContext.currentTenantId()
            },
            select: {
                employee: {
                    id: true,
                    organizationId: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        });
        timesheets.forEach((timesheet) => {
            if (timesheet.employee && timesheet.employee.user) {
                this.emailService.setTimesheetAction(timesheet.employee.user.email, timesheet);
            }
        });
        return timesheets;
    }
};
exports.TimesheetUpdateStatusHandler = TimesheetUpdateStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(timesheet_update_status_command_1.TimesheetUpdateStatusCommand),
    __param(0, (0, typeorm_1.InjectRepository)(timesheet_entity_1.Timesheet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], TimesheetUpdateStatusHandler);
//# sourceMappingURL=timesheet-update-status.handler.js.map