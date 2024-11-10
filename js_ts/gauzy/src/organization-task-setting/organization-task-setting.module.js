"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrganizationTaskSettingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTaskSettingModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const organization_task_setting_controller_1 = require("./organization-task-setting.controller");
const organization_task_setting_service_1 = require("./organization-task-setting.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const organization_task_setting_entity_1 = require("./organization-task-setting.entity");
const handlers_1 = require("./commands/handlers");
const repository_1 = require("./repository");
let OrganizationTaskSettingModule = exports.OrganizationTaskSettingModule = OrganizationTaskSettingModule_1 = class OrganizationTaskSettingModule {
};
exports.OrganizationTaskSettingModule = OrganizationTaskSettingModule = OrganizationTaskSettingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/organization-task-setting',
                    module: OrganizationTaskSettingModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([organization_task_setting_entity_1.OrganizationTaskSetting]),
            nestjs_1.MikroOrmModule.forFeature([organization_task_setting_entity_1.OrganizationTaskSetting]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [organization_task_setting_controller_1.OrganizationTaskSettingController],
        providers: [organization_task_setting_service_1.OrganizationTaskSettingService, repository_1.TypeOrmOrganizationTaskSettingRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, organization_task_setting_service_1.OrganizationTaskSettingService, repository_1.TypeOrmOrganizationTaskSettingRepository]
    })
], OrganizationTaskSettingModule);
//# sourceMappingURL=organization-task-setting.module.js.map