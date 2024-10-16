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
exports.TimesheetSubmitHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const index_1 = require("../../../../../plugins/common/dist/index");
const context_1 = require("./../../../../core/context");
const email_service_1 = require("./../../../../email-send/email.service");
const timesheet_entity_1 = require("./../../timesheet.entity");
const timesheet_submit_command_1 = require("../timesheet-submit.command");
let TimesheetSubmitHandler = exports.TimesheetSubmitHandler = class TimesheetSubmitHandler {
    timeSheetRepository;
    emailService;
    constructor(timeSheetRepository, emailService) {
        this.timeSheetRepository = timeSheetRepository;
        this.emailService = emailService;
    }
    async execute(command) {
        const { input } = command;
        let { ids, status, organizationId } = input;
        if ((0, index_1.isEmpty)(ids)) {
            throw new common_1.NotAcceptableException('You can not submit timesheet');
        }
        if (typeof ids === 'string') {
            ids = [ids];
        }
        await this.timeSheetRepository.update({
            id: (0, typeorm_2.In)(ids),
            organizationId,
            tenantId: context_1.RequestContext.currentTenantId()
        }, {
            ...((status === 'submit') ? {
                submittedAt: new Date()
            } : {
                submittedAt: null
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
                tenantId: context_1.RequestContext.currentTenantId(),
                submittedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)())
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
            if (status === 'submit') {
                if (timesheet.employee && timesheet.employee.user) {
                    this.emailService.timesheetSubmit(timesheet.employee.user.email, timesheet);
                }
            }
        });
        return timesheets;
    }
};
exports.TimesheetSubmitHandler = TimesheetSubmitHandler = __decorate([
    (0, cqrs_1.CommandHandler)(timesheet_submit_command_1.TimesheetSubmitCommand),
    __param(0, (0, typeorm_1.InjectRepository)(timesheet_entity_1.Timesheet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], TimesheetSubmitHandler);
//# sourceMappingURL=timesheet-submit.handler.js.map