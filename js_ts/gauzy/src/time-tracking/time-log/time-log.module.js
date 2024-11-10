"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const employee_module_1 = require("./../../employee/employee.module");
const organization_project_module_1 = require("./../../organization-project/organization-project.module");
const organization_contact_module_1 = require("./../../organization-contact/organization-contact.module");
const handlers_1 = require("./commands/handlers");
const time_log_entity_1 = require("./time-log.entity");
const time_log_controller_1 = require("./time-log.controller");
const time_log_service_1 = require("./time-log.service");
const time_slot_module_1 = require("./../time-slot/time-slot.module");
const repository_1 = require("./repository");
let TimeLogModule = exports.TimeLogModule = class TimeLogModule {
};
exports.TimeLogModule = TimeLogModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            time_log_controller_1.TimeLogController
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([time_log_entity_1.TimeLog]),
            nestjs_1.MikroOrmModule.forFeature([time_log_entity_1.TimeLog]),
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
            (0, common_1.forwardRef)(() => organization_project_module_1.OrganizationProjectModule),
            (0, common_1.forwardRef)(() => organization_contact_module_1.OrganizationContactModule),
            (0, common_1.forwardRef)(() => time_slot_module_1.TimeSlotModule),
            cqrs_1.CqrsModule
        ],
        providers: [time_log_service_1.TimeLogService, repository_1.TypeOrmTimeLogRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, time_log_service_1.TimeLogService, repository_1.TypeOrmTimeLogRepository]
    })
], TimeLogModule);
//# sourceMappingURL=time-log.module.js.map