"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserOrganizationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrganizationModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const tenant_module_1 = require("../tenant/tenant.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const organization_module_1 = require("./../organization/organization.module");
const user_module_1 = require("./../user/user.module");
const employee_module_1 = require("../employee/employee.module");
const role_module_1 = require("./../role/role.module");
const user_organization_services_1 = require("./user-organization.services");
const user_organization_controller_1 = require("./user-organization.controller");
const user_organization_entity_1 = require("./user-organization.entity");
const repository_1 = require("./repository");
const handlers_1 = require("./commands/handlers");
let UserOrganizationModule = exports.UserOrganizationModule = UserOrganizationModule_1 = class UserOrganizationModule {
};
exports.UserOrganizationModule = UserOrganizationModule = UserOrganizationModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/user-organization', module: UserOrganizationModule_1 }
            ]),
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([user_organization_entity_1.UserOrganization])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([user_organization_entity_1.UserOrganization])),
            (0, common_1.forwardRef)(() => tenant_module_1.TenantModule),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => employee_module_1.EmployeeModule),
            (0, common_1.forwardRef)(() => role_module_1.RoleModule),
            cqrs_1.CqrsModule
        ],
        controllers: [user_organization_controller_1.UserOrganizationController],
        providers: [user_organization_services_1.UserOrganizationService, repository_1.TypeOrmUserOrganizationRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, user_organization_services_1.UserOrganizationService, repository_1.TypeOrmUserOrganizationRepository]
    })
], UserOrganizationModule);
//# sourceMappingURL=user-organization.module.js.map