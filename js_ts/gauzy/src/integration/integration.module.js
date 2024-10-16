"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IntegrationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const hubstaff_module_1 = require("./hubstaff/hubstaff.module");
const integration_type_entity_1 = require("./integration-type.entity");
const integration_entity_1 = require("./integration.entity");
const integration_service_1 = require("./integration.service");
const integration_controller_1 = require("./integration.controller");
const handlers_1 = require("./commands/handlers");
const integration_tenant_module_1 = require("../integration-tenant/integration-tenant.module");
const github_module_1 = require("./github/github.module");
const integration_ai_module_1 = require("./gauzy-ai/integration-ai.module");
let IntegrationModule = exports.IntegrationModule = IntegrationModule_1 = class IntegrationModule {
};
exports.IntegrationModule = IntegrationModule = IntegrationModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/integration',
                    module: IntegrationModule_1,
                    children: [
                        { path: '/hubstaff', module: hubstaff_module_1.HubstaffModule },
                        { path: '/github', module: github_module_1.GithubModule },
                        { path: '/gauzy-ai', module: integration_ai_module_1.IntegrationAIModule },
                        { path: '/', module: IntegrationModule_1 }
                    ]
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([integration_entity_1.Integration, integration_type_entity_1.IntegrationType]),
            nestjs_1.MikroOrmModule.forFeature([integration_entity_1.Integration, integration_type_entity_1.IntegrationType]),
            integration_tenant_module_1.IntegrationTenantModule,
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => github_module_1.GithubModule),
            (0, common_1.forwardRef)(() => hubstaff_module_1.HubstaffModule),
            (0, common_1.forwardRef)(() => integration_ai_module_1.IntegrationAIModule),
            cqrs_1.CqrsModule
        ],
        controllers: [integration_controller_1.IntegrationController],
        providers: [integration_service_1.IntegrationService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, integration_service_1.IntegrationService]
    })
], IntegrationModule);
//# sourceMappingURL=integration.module.js.map