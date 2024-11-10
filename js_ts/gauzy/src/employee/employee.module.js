"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const index_1 = require("../../plugins/plugins/integration-ai/dist/index");
const internal_1 = require("./../core/entities/internal");
const employee_entity_1 = require("./employee.entity");
const user_module_1 = require("./../user/user.module");
const handlers_1 = require("./commands/handlers");
const employee_controller_1 = require("./employee.controller");
const employee_job_controller_1 = require("./employee-job.controller");
const employee_service_1 = require("./employee.service");
const auth_module_1 = require("./../auth/auth.module");
const email_send_module_1 = require("./../email-send/email-send.module");
const user_organization_module_1 = require("../user-organization/user-organization.module");
const role_module_1 = require("./../role/role.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const type_orm_employee_repository_1 = require("./repository/type-orm-employee.repository");
let EmployeeModule = exports.EmployeeModule = EmployeeModule_1 = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule = EmployeeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/employee', module: EmployeeModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee, internal_1.TimeLog]),
            nestjs_1.MikroOrmModule.forFeature([employee_entity_1.Employee, internal_1.TimeLog]),
            (0, common_1.forwardRef)(() => email_send_module_1.EmailSendModule),
            (0, common_1.forwardRef)(() => user_organization_module_1.UserOrganizationModule),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            role_module_1.RoleModule,
            index_1.GauzyAIModule.forRoot(),
            cqrs_1.CqrsModule
        ],
        controllers: [employee_job_controller_1.EmployeeJobController, employee_controller_1.EmployeeController],
        providers: [employee_service_1.EmployeeService, type_orm_employee_repository_1.TypeOrmEmployeeRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, employee_service_1.EmployeeService, type_orm_employee_repository_1.TypeOrmEmployeeRepository]
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map