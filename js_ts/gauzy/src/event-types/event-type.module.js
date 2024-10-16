"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventTypeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const event_type_entity_1 = require("./event-type.entity");
const event_type_service_1 = require("./event-type.service");
const event_type_controller_1 = require("./event-type.controller");
const handlers_1 = require("./commands/handlers");
const employee_module_1 = require("../employee/employee.module");
const organization_module_1 = require("../organization/organization.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EventTypeModule = exports.EventTypeModule = EventTypeModule_1 = class EventTypeModule {
};
exports.EventTypeModule = EventTypeModule = EventTypeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/event-type', module: EventTypeModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([event_type_entity_1.EventType]),
            nestjs_1.MikroOrmModule.forFeature([event_type_entity_1.EventType]),
            role_permission_module_1.RolePermissionModule,
            employee_module_1.EmployeeModule,
            organization_module_1.OrganizationModule,
            cqrs_1.CqrsModule
        ],
        controllers: [event_type_controller_1.EventTypeController],
        providers: [event_type_service_1.EventTypeService, ...handlers_1.CommandHandlers],
        exports: [event_type_service_1.EventTypeService]
    })
], EventTypeModule);
//# sourceMappingURL=event-type.module.js.map