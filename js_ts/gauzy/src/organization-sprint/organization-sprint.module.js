"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationSprintModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSprintModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_sprint_service_1 = require("./organization-sprint.service");
const organization_sprint_controller_1 = require("./organization-sprint.controller");
const organization_sprint_entity_1 = require("./organization-sprint.entity");
const task_entity_1 = require("../tasks/task.entity");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let OrganizationSprintModule = exports.OrganizationSprintModule = OrganizationSprintModule_1 = class OrganizationSprintModule {
};
exports.OrganizationSprintModule = OrganizationSprintModule = OrganizationSprintModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/organization-sprint', module: OrganizationSprintModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([organization_sprint_entity_1.OrganizationSprint, task_entity_1.Task]),
            nestjs_1.MikroOrmModule.forFeature([organization_sprint_entity_1.OrganizationSprint, task_entity_1.Task]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_sprint_controller_1.OrganizationSprintController],
        providers: [organization_sprint_service_1.OrganizationSprintService, ...handlers_1.CommandHandlers],
        exports: [organization_sprint_service_1.OrganizationSprintService]
    })
], OrganizationSprintModule);
//# sourceMappingURL=organization-sprint.module.js.map