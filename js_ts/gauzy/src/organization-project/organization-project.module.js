"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationProjectModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationProjectModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_project_entity_1 = require("./organization-project.entity");
const organization_project_controller_1 = require("./organization-project.controller");
const organization_project_service_1 = require("./organization-project.service");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const type_orm_organization_project_repository_1 = require("./repository/type-orm-organization-project.repository");
let OrganizationProjectModule = exports.OrganizationProjectModule = OrganizationProjectModule_1 = class OrganizationProjectModule {
};
exports.OrganizationProjectModule = OrganizationProjectModule = OrganizationProjectModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-projects',
                    module: OrganizationProjectModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_project_entity_1.OrganizationProject]),
            nestjs_1.MikroOrmModule.forFeature([organization_project_entity_1.OrganizationProject]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_project_controller_1.OrganizationProjectController],
        providers: [organization_project_service_1.OrganizationProjectService, type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_project_service_1.OrganizationProjectService, type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository]
    })
], OrganizationProjectModule);
//# sourceMappingURL=organization-project.module.js.map