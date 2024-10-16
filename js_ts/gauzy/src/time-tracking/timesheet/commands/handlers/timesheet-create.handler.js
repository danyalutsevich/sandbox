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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
;
const __1 = require("..");
const timesheet_service_1 = require("./../../timesheet.service");
const context_1 = require("../../../../core/context");
let TimesheetCreateHandler = exports.TimesheetCreateHandler = class TimesheetCreateHandler {
    _timesheetService;
    constructor(_timesheetService) {
        this._timesheetService = _timesheetService;
    }
    async execute(command) {
        const { input } = command;
        const { employeeId, duration, keyboard, mouse, overall, startedAt, stoppedAt, organizationId } = input;
        try {
            return await this._timesheetService.create({
                employeeId,
                duration,
                keyboard,
                mouse,
                overall,
                startedAt,
                stoppedAt,
                organizationId,
                tenantId: context_1.RequestContext.currentTenantId()
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Can\'t create timesheet for employee-${employeeId} of organization-${organizationId}`);
        }
    }
};
exports.TimesheetCreateHandler = TimesheetCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(__1.TimesheetCreateCommand),
    __metadata("design:paramtypes", [timesheet_service_1.TimeSheetService])
], TimesheetCreateHandler);
//# sourceMappingURL=timesheet-create.handler.js.map