"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubTaskUpdateOrCreateCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const context_1 = require("core/context");
const utils_1 = require("core/utils");
const organization_project_service_1 = require("organization-project/organization-project.service");
const commands_1 = require("integration-tenant/commands");
const commands_2 = require("integration/github/repository/issue/commands");
const commands_3 = require("integration-map/commands");
const integration_map_service_1 = require("integration-map/integration-map.service");
const github_repository_issue_service_1 = require("./../../repository/issue/github-repository-issue.service");
const github_sync_service_1 = require("../../github-sync.service");
const task_update_or_create_command_1 = require("../task.update-or-create.command");
let GithubTaskUpdateOrCreateCommandHandler = exports.GithubTaskUpdateOrCreateCommandHandler = class GithubTaskUpdateOrCreateCommandHandler {
    _commandBus;
    _githubSyncService;
    _organizationProjectService;
    _integrationMapService;
    _githubRepositoryIssueService;
    constructor(_commandBus, _githubSyncService, _organizationProjectService, _integrationMapService, _githubRepositoryIssueService) {
        this._commandBus = _commandBus;
        this._githubSyncService = _githubSyncService;
        this._organizationProjectService = _organizationProjectService;
        this._integrationMapService = _integrationMapService;
        this._githubRepositoryIssueService = _githubRepositoryIssueService;
    }
    /**
     * Command handler for the `GithubTaskUpdateOrCreateCommand`, responsible for processing actions when a task is opened in Gauzy.
     *
     * @param command - The `GithubTaskUpdateOrCreateCommand` containing the task data to be processed.
     */
    async execute(command) {
        try {
            const { task, options } = command;
            const tenantId = context_1.RequestContext.currentTenantId() || options.tenantId;
            const { organizationId, projectId } = options;
            // Step 1: Get the GitHub integration for the organization
            const integration = await this._commandBus.execute(new commands_1.IntegrationTenantGetCommand({
                where: {
                    name: index_1.IntegrationEnum.GITHUB,
                    organizationId,
                    tenantId,
                    isActive: true,
                    isArchived: false,
                    integration: {
                        provider: index_1.IntegrationEnum.GITHUB,
                        isActive: true,
                        isArchived: false,
                    },
                },
                relations: {
                    settings: true,
                },
            }));
            // Step 2: Check if the integration and its settings are available
            if (!!integration && !!integration.settings) {
                const integrationId = integration.id;
                // Convert settings array to an object for easier access
                const settings = (0, utils_1.arrayToObject)(integration.settings, 'settingsName', 'settingsValue');
                const installationId = settings['installation_id'];
                // Step 3: Ensure that installation ID is available
                if (!!installationId) {
                    try {
                        // Step 4: Get the project and repository information
                        const project = await this._organizationProjectService.findOneByIdString(projectId, {
                            where: {
                                organizationId,
                                tenantId,
                                isActive: true,
                                isArchived: false,
                                repository: {
                                    organizationId,
                                    tenantId,
                                    hasSyncEnabled: true,
                                    isActive: true,
                                    isArchived: false
                                }
                            },
                            relations: {
                                repository: true
                            }
                        });
                        // Step 5: Check if the project and its repository are available
                        if (!!project && !!project.repository) {
                            const repository = project.repository;
                            // Step 6: Prepare the payload for opening the GitHub issue
                            const payload = {
                                repo: repository.name,
                                owner: repository.owner,
                                title: task.title,
                                body: task.description,
                                labels: this._mapIssueLabelPayload(task.tags || []),
                            };
                            const syncTag = settings['sync_tag'];
                            // Check if the issue should be synchronized for this project
                            // Step 7: Continue execution based on auto-sync label setting
                            if (!!this.shouldSyncIssue(project, payload.labels, syncTag)) {
                                try {
                                    // Check if an integration map already exists for the issue
                                    const integrationMap = await this._integrationMapService.findOneByWhereOptions({
                                        entity: index_1.IntegrationEntity.ISSUE,
                                        gauzyId: task.id,
                                        integrationId,
                                        organizationId,
                                        tenantId,
                                        isActive: true,
                                        isArchived: false
                                    });
                                    try {
                                        /** */
                                        const syncIssue = await this._githubRepositoryIssueService.findOneByWhereOptions({
                                            organizationId,
                                            tenantId,
                                            repositoryId: repository.id,
                                            issueId: parseInt(integrationMap.sourceId)
                                        });
                                        payload.issue_number = syncIssue.issueNumber;
                                        await this._githubSyncService.createOrUpdateIssue(installationId, payload);
                                    }
                                    catch (error) {
                                        console.log('Error while getting synced issue', error?.message);
                                    }
                                }
                                catch (error) {
                                    // Step 9: Open the GitHub issue
                                    const issue = await this._githubSyncService.createOrUpdateIssue(installationId, payload);
                                    // Step 10: Synchronized GitHub repository issue.
                                    const { repositoryId } = repository;
                                    await this._commandBus.execute(new commands_2.IntegrationSyncGithubRepositoryIssueCommand({
                                        tenantId,
                                        organizationId,
                                        integrationId
                                    }, repositoryId, issue));
                                    // Step 11: Create a mapping between the task and the GitHub issue
                                    return await this._commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                                        gauzyId: task.id,
                                        integrationId,
                                        sourceId: (issue.id).toString(),
                                        entity: index_1.IntegrationEntity.ISSUE,
                                        organizationId,
                                        tenantId
                                    }));
                                }
                            }
                        }
                    }
                    catch (error) {
                        console.log('Project Not Found: %s', error.message);
                    }
                }
            }
        }
        catch (error) {
            // Handle errors gracefully, for example, log them
        }
    }
    /**
     * Determines whether an issue should be synchronized based on project settings.
     *
     * @param project - The project configuration.
     * @param issue - The GitHub issue to be synchronized.
     * @returns A boolean indicating whether the issue should be synchronized.
     */
    shouldSyncIssue(project, labels = [], syncTag) {
        if (!project || !project.isTasksAutoSync) {
            return false;
        }
        return !!labels.find((label) => label.name.trim() === syncTag.trim());
    }
    /**
     * Map an array of tags to a simplified structure.
     *
     * @param tags - An array of ITag objects to be mapped.
     * @returns An array of objects with 'name', 'color', and 'description' properties.
     */
    _mapIssueLabelPayload(tags = []) {
        return tags.map(({ name, color, description, isSystem }) => ({
            name,
            color,
            description,
            default: isSystem
        }));
    }
};
exports.GithubTaskUpdateOrCreateCommandHandler = GithubTaskUpdateOrCreateCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(task_update_or_create_command_1.GithubTaskUpdateOrCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        github_sync_service_1.GithubSyncService, typeof (_a = typeof organization_project_service_1.OrganizationProjectService !== "undefined" && organization_project_service_1.OrganizationProjectService) === "function" ? _a : Object, typeof (_b = typeof integration_map_service_1.IntegrationMapService !== "undefined" && integration_map_service_1.IntegrationMapService) === "function" ? _b : Object, github_repository_issue_service_1.GithubRepositoryIssueService])
], GithubTaskUpdateOrCreateCommandHandler);
//# sourceMappingURL=task.update-or-create.handler.js.map