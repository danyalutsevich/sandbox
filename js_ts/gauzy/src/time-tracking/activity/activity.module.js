"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const employee_module_1 = require("./../../employee/employee.module");
const organization_project_module_1 = require("./../../organization-project/organization-project.module");
const handlers_1 = require("./commands/handlers");
const activity_controller_1 = require("./activity.controller");
const activity_service_1 = require("./activity.service");
const activity_entity_1 = require("./activity.entity");
const activity_map_service_1 = require("./activity.map.service");
const time_slot_module_1 = require("./../time-slot/time-slot.module");
const repository_1 = require("./repository");
let ActivityModule = exports.ActivityModule = class ActivityModule {
};
exports.ActivityModule = ActivityModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            activity_controller_1.ActivityController
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([activity_entity_1.Activity]),
            nestjs_1.MikroOrmModule.forFeature([activity_entity_1.Activity]),
            role_permission_module_1.RolePermissionModule,
            employee_module_1.EmployeeModule,
            organization_project_module_1.OrganizationProjectModule,
            (0, common_1.forwardRef)(() => time_slot_module_1.TimeSlotModule),
            cqrs_1.CqrsModule
        ],
        providers: [
            activity_service_1.ActivityService,
            activity_map_service_1.ActivityMapService,
            repository_1.TypeOrmActivityRepository,
            ...handlers_1.CommandHandlers
        ],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, activity_service_1.ActivityService, activity_map_service_1.ActivityMapService, repository_1.TypeOrmActivityRepository]
    })
], ActivityModule);
//# sourceMappingURL=activity.module.js.map