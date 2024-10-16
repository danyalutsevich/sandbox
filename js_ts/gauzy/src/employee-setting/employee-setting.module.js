"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeSettingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSettingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const employee_setting_entity_1 = require("./employee-setting.entity");
const employee_setting_service_1 = require("./employee-setting.service");
const employee_setting_controller_1 = require("./employee-setting.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EmployeeSettingModule = exports.EmployeeSettingModule = EmployeeSettingModule_1 = class EmployeeSettingModule {
};
exports.EmployeeSettingModule = EmployeeSettingModule = EmployeeSettingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/employee-settings', module: EmployeeSettingModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([employee_setting_entity_1.EmployeeSetting]),
            nestjs_1.MikroOrmModule.forFeature([employee_setting_entity_1.EmployeeSetting]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [employee_setting_controller_1.EmployeeSettingController],
        providers: [employee_setting_service_1.EmployeeSettingService],
        exports: [employee_setting_service_1.EmployeeSettingService]
    })
], EmployeeSettingModule);
//# sourceMappingURL=employee-setting.module.js.map