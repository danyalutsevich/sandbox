"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const email_send_module_1 = require("./../../email-send/email-send.module");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const employee_module_1 = require("./../../employee/employee.module");
const time_slot_module_1 = require("./../time-slot/time-slot.module");
const handlers_1 = require("./commands/handlers");
const timesheet_controller_1 = require("./timesheet.controller");
const timesheet_service_1 = require("./timesheet.service");
const timesheet_entity_1 = require("./timesheet.entity");
let TimesheetModule = exports.TimesheetModule = class TimesheetModule {
};
exports.TimesheetModule = TimesheetModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            timesheet_controller_1.TimeSheetController
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([timesheet_entity_1.Timesheet]),
            nestjs_1.MikroOrmModule.forFeature([timesheet_entity_1.Timesheet]),
            cqrs_1.CqrsModule,
            email_send_module_1.EmailSendModule,
            role_permission_module_1.RolePermissionModule,
            time_slot_module_1.TimeSlotModule,
            employee_module_1.EmployeeModule
        ],
        providers: [
            timesheet_service_1.TimeSheetService,
            ...handlers_1.CommandHandlers
        ],
        exports: [
            timesheet_service_1.TimeSheetService,
            typeorm_1.TypeOrmModule,
            nestjs_1.MikroOrmModule
        ]
    })
], TimesheetModule);
//# sourceMappingURL=timesheet.module.js.map