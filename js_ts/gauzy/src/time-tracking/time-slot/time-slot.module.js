"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const time_slot_entity_1 = require("./time-slot.entity");
const time_slot_controller_1 = require("./time-slot.controller");
const time_slot_minute_entity_1 = require("./time-slot-minute.entity");
const time_slot_service_1 = require("./time-slot.service");
const time_log_module_1 = require("./../time-log/time-log.module");
const employee_module_1 = require("./../../employee/employee.module");
const activity_module_1 = require("./../activity/activity.module");
const type_orm_time_slot_repository_1 = require("./repository/type-orm-time-slot.repository");
let TimeSlotModule = exports.TimeSlotModule = class TimeSlotModule {
};
exports.TimeSlotModule = TimeSlotModule = __decorate([
    (0, common_1.Module)({
        controllers: [time_slot_controller_1.TimeSlotController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([time_slot_entity_1.TimeSlot, time_slot_minute_entity_1.TimeSlotMinute]),
            nestjs_1.MikroOrmModule.forFeature([time_slot_entity_1.TimeSlot, time_slot_minute_entity_1.TimeSlotMinute]),
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => time_log_module_1.TimeLogModule),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
            (0, common_1.forwardRef)(() => activity_module_1.ActivityModule),
            cqrs_1.CqrsModule
        ],
        providers: [time_slot_service_1.TimeSlotService, type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, time_slot_service_1.TimeSlotService, type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository]
    })
], TimeSlotModule);
//# sourceMappingURL=time-slot.module.js.map