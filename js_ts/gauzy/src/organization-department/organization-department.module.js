"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationDepartmentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDepartmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_department_entity_1 = require("./organization-department.entity");
const organization_department_controller_1 = require("./organization-department.controller");
const organization_department_service_1 = require("./organization-department.service");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let OrganizationDepartmentModule = exports.OrganizationDepartmentModule = OrganizationDepartmentModule_1 = class OrganizationDepartmentModule {
};
exports.OrganizationDepartmentModule = OrganizationDepartmentModule = OrganizationDepartmentModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-department',
                    module: OrganizationDepartmentModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_department_entity_1.OrganizationDepartment]),
            nestjs_1.MikroOrmModule.forFeature([organization_department_entity_1.OrganizationDepartment]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_department_controller_1.OrganizationDepartmentController],
        providers: [organization_department_service_1.OrganizationDepartmentService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_department_service_1.OrganizationDepartmentService]
    })
], OrganizationDepartmentModule);
//# sourceMappingURL=organization-department.module.js.map