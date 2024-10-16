"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmployeeAwardModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeAwardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const employee_award_entity_1 = require("./employee-award.entity");
const employee_award_controller_1 = require("./employee-award.controller");
const employee_award_service_1 = require("./employee-award.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EmployeeAwardModule = exports.EmployeeAwardModule = EmployeeAwardModule_1 = class EmployeeAwardModule {
};
exports.EmployeeAwardModule = EmployeeAwardModule = EmployeeAwardModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/employee-award', module: EmployeeAwardModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([employee_award_entity_1.EmployeeAward]),
            nestjs_1.MikroOrmModule.forFeature([employee_award_entity_1.EmployeeAward]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [employee_award_controller_1.EmployeeAwardController],
        providers: [employee_award_service_1.EmployeeAwardService]
    })
], EmployeeAwardModule);
//# sourceMappingURL=employee-award.module.js.map