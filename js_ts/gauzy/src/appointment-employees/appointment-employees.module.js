"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppointmentEmployeesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentEmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const appointment_employees_entity_1 = require("./appointment-employees.entity");
const appointment_employees_controller_1 = require("./appointment-employees.controller");
const appointment_employees_service_1 = require("./appointment-employees.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let AppointmentEmployeesModule = exports.AppointmentEmployeesModule = AppointmentEmployeesModule_1 = class AppointmentEmployeesModule {
};
exports.AppointmentEmployeesModule = AppointmentEmployeesModule = AppointmentEmployeesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/appointment-employees',
                    module: AppointmentEmployeesModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([appointment_employees_entity_1.AppointmentEmployee]),
            nestjs_1.MikroOrmModule.forFeature([appointment_employees_entity_1.AppointmentEmployee]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [appointment_employees_controller_1.AppointmentEmployeesController],
        providers: [appointment_employees_service_1.AppointmentEmployeesService],
        exports: [appointment_employees_service_1.AppointmentEmployeesService]
    })
], AppointmentEmployeesModule);
//# sourceMappingURL=appointment-employees.module.js.map