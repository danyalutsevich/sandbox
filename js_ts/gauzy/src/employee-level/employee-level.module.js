"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeLevelModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeLevelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const employee_level_controller_1 = require("./employee-level.controller");
const employee_level_service_1 = require("./employee-level.service");
const employee_level_entity_1 = require("./employee-level.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EmployeeLevelModule = exports.EmployeeLevelModule = EmployeeLevelModule_1 = class EmployeeLevelModule {
};
exports.EmployeeLevelModule = EmployeeLevelModule = EmployeeLevelModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/employee-level', module: EmployeeLevelModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([employee_level_entity_1.EmployeeLevel]),
            nestjs_1.MikroOrmModule.forFeature([employee_level_entity_1.EmployeeLevel]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [employee_level_controller_1.EmployeeLevelController],
        providers: [employee_level_service_1.EmployeeLevelService]
    })
], EmployeeLevelModule);
//# sourceMappingURL=employee-level.module.js.map