"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AvailabilitySlotsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilitySlotsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const availability_slots_entity_1 = require("./availability-slots.entity");
const availability_slots_service_1 = require("./availability-slots.service");
const availability_slots_controller_1 = require("./availability-slots.controller");
const handlers_1 = require("./commands/handlers");
const employee_module_1 = require("./../employee/employee.module");
const organization_module_1 = require("./../organization/organization.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let AvailabilitySlotsModule = exports.AvailabilitySlotsModule = AvailabilitySlotsModule_1 = class AvailabilitySlotsModule {
};
exports.AvailabilitySlotsModule = AvailabilitySlotsModule = AvailabilitySlotsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/availability-slots', module: AvailabilitySlotsModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([availability_slots_entity_1.AvailabilitySlot]),
            nestjs_1.MikroOrmModule.forFeature([availability_slots_entity_1.AvailabilitySlot]),
            cqrs_1.CqrsModule,
            employee_module_1.EmployeeModule,
            organization_module_1.OrganizationModule,
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [availability_slots_controller_1.AvailabilitySlotsController],
        providers: [availability_slots_service_1.AvailabilitySlotsService, ...handlers_1.CommandHandlers],
        exports: [availability_slots_service_1.AvailabilitySlotsService]
    })
], AvailabilitySlotsModule);
//# sourceMappingURL=availability-slots.module.js.map