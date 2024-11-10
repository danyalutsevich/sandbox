"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const integration_module_1 = require("../../integration/integration.module");
const integration_tenant_module_1 = require("../../integration-tenant/integration-tenant.module");
const integration_setting_module_1 = require("../../integration-setting/integration-setting.module");
const integration_map_module_1 = require("../../integration-map/integration-map.module");
const organization_project_module_1 = require("../../organization-project/organization-project.module");
const handlers_1 = require("./commands/handlers");
const github_authorization_controller_1 = require("./github-authorization.controller");
const github_integration_controller_1 = require("./github-integration.controller");
const github_controller_1 = require("./github.controller");
const github_service_1 = require("./github.service");
const github_middleware_1 = require("./github.middleware");
const github_hooks_controller_1 = require("./github.hooks.controller");
const github_hooks_service_1 = require("./github.hooks.service");
const github_sync_controller_1 = require("./github-sync.controller");
const github_sync_service_1 = require("./github-sync.service");
const github_repository_controller_1 = require("./repository/github-repository.controller");
const github_repository_service_1 = require("./repository/github-repository.service");
const github_repository_entity_1 = require("./repository/github-repository.entity");
const github_repository_issue_entity_1 = require("./repository/issue/github-repository-issue.entity");
const github_repository_issue_service_1 = require("./repository/issue/github-repository-issue.service");
const repository_1 = require("./repository/repository");
const repository_2 = require("./repository/issue/repository");
let GithubModule = exports.GithubModule = class GithubModule {
    /**
     *
     * @param consumer
     */
    configure(consumer) {
        // Apply middlewares to specific controllers
        consumer.apply(github_middleware_1.GithubMiddleware).forRoutes({
            path: '/integration/github/:integrationId/metadata',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/integration/github/:integrationId/repositories',
            method: common_1.RequestMethod.GET,
        }, {
            path: '/integration/github/:integrationId/:owner/:repo/issues',
            method: common_1.RequestMethod.GET,
        }, 
        /** */
        {
            path: '/integration/github/:integrationId/manual-sync/issues',
            method: common_1.RequestMethod.POST,
        }, {
            path: '/integration/github/:integrationId/auto-sync/issues',
            method: common_1.RequestMethod.POST,
        }); // Apply to specific routes and methods
    }
};
exports.GithubModule = GithubModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([github_repository_entity_1.OrganizationGithubRepository, github_repository_issue_entity_1.OrganizationGithubRepositoryIssue]),
            nestjs_1.MikroOrmModule.forFeature([github_repository_entity_1.OrganizationGithubRepository, github_repository_issue_entity_1.OrganizationGithubRepositoryIssue]),
            axios_1.HttpModule,
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => organization_project_module_1.OrganizationProjectModule),
            (0, common_1.forwardRef)(() => integration_module_1.IntegrationModule),
            (0, common_1.forwardRef)(() => integration_tenant_module_1.IntegrationTenantModule),
            (0, common_1.forwardRef)(() => integration_setting_module_1.IntegrationSettingModule),
            (0, common_1.forwardRef)(() => integration_map_module_1.IntegrationMapModule),
            cqrs_1.CqrsModule
        ],
        controllers: [
            github_authorization_controller_1.GitHubAuthorizationController,
            github_controller_1.GitHubController,
            github_hooks_controller_1.GitHubHooksController,
            github_integration_controller_1.GitHubIntegrationController,
            github_sync_controller_1.GitHubSyncController,
            github_repository_controller_1.GitHubRepositoryController
        ],
        providers: [
            github_service_1.GithubService,
            github_sync_service_1.GithubSyncService,
            github_hooks_service_1.GithubHooksService,
            github_repository_service_1.GithubRepositoryService,
            github_repository_issue_service_1.GithubRepositoryIssueService,
            // Define middleware heres
            github_middleware_1.GithubMiddleware,
            repository_1.TypeOrmOrganizationGithubRepositoryRepository,
            repository_2.TypeOrmOrganizationGithubRepositoryIssueRepository,
            // Define handlers heres
            ...handlers_1.CommandHandlers
        ],
        exports: [
            repository_1.TypeOrmOrganizationGithubRepositoryRepository,
            repository_2.TypeOrmOrganizationGithubRepositoryIssueRepository
        ],
    })
], GithubModule);
//# sourceMappingURL=github.module.js.map