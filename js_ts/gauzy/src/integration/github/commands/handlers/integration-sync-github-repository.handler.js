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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSyncGithubRepositoryCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const context_1 = require("core/context");
const github_repository_service_1 = require("./../../repository/github-repository.service");
const integration_sync_github_repository_command_1 = require("../integration-sync-github-repository.command");
let IntegrationSyncGithubRepositoryCommandHandler = exports.IntegrationSyncGithubRepositoryCommandHandler = class IntegrationSyncGithubRepositoryCommandHandler {
    _githubRepositoryService;
    constructor(_githubRepositoryService) {
        this._githubRepositoryService = _githubRepositoryService;
    }
    /**
     * Execute a synchronization of a GitHub repository for an integration.
     *
     * @param command - The command containing synchronization details.
     * @returns A promise that resolves to the integrated GitHub repository.
     */
    async execute(command) {
        // Extract input parameters from the command
        const { input } = command;
        const { repository, organizationId, integrationId } = input;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        // Destructure the repository object for better readability
        const { id: repositoryId, full_name, name, owner, open_issues_count } = repository;
        const status = repository.status || index_1.GithubRepositoryStatusEnum.SYNCING;
        try {
            /**
             * Find an integration repository based on repository, integration, organization, and tenant.
             *
             * @returns A promise that resolves to the integration repository if found.
             */
            const integrationRepository = await this._githubRepositoryService.findOneByWhereOptions({
                repositoryId,
                integrationId,
                organizationId,
                tenantId
            });
            /**
             * Update an integration repository with the provided details.
             *
             * @returns A promise that resolves to the updated integration repository.
             */
            return await this._githubRepositoryService.create({
                id: integrationRepository.id,
                name: name,
                fullName: full_name,
                owner: owner.login,
                issuesCount: open_issues_count,
                private: repository.private,
                status,
                repositoryId,
                integrationId,
                organizationId,
                tenantId
            });
        }
        catch (error) {
            /**
             * Create or update an integration repository with the provided details.
             *
             * @returns A promise that resolves to the created or updated integration repository.
             */
            return await this._githubRepositoryService.create({
                name: name,
                fullName: full_name,
                owner: owner.login,
                issuesCount: open_issues_count,
                private: repository.private,
                status,
                repositoryId,
                integrationId,
                organizationId,
                tenantId
            });
        }
    }
};
exports.IntegrationSyncGithubRepositoryCommandHandler = IntegrationSyncGithubRepositoryCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_sync_github_repository_command_1.IntegrationSyncGithubRepositoryCommand),
    __metadata("design:paramtypes", [github_repository_service_1.GithubRepositoryService])
], IntegrationSyncGithubRepositoryCommandHandler);
//# sourceMappingURL=integration-sync-github-repository.handler.js.map