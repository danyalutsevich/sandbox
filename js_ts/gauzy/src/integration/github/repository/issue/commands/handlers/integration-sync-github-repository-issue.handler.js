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
exports.IntegrationSyncGithubRepositoryIssueCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("../../../../../../core/context");
const integration_sync_github_repository_issue_command_1 = require("../integration-sync-github-repository-issue.command");
const type_orm_organization_github_repository_repository_1 = require("../../../repository/type-orm-organization-github-repository.repository");
const type_orm_github_repository_issue_repository_1 = require("../../repository/type-orm-github-repository-issue.repository");
let IntegrationSyncGithubRepositoryIssueCommandHandler = exports.IntegrationSyncGithubRepositoryIssueCommandHandler = class IntegrationSyncGithubRepositoryIssueCommandHandler {
    typeOrmOrganizationGithubRepositoryRepository;
    typeOrmOrganizationGithubRepositoryIssueRepository;
    constructor(typeOrmOrganizationGithubRepositoryRepository, typeOrmOrganizationGithubRepositoryIssueRepository) {
        this.typeOrmOrganizationGithubRepositoryRepository = typeOrmOrganizationGithubRepositoryRepository;
        this.typeOrmOrganizationGithubRepositoryIssueRepository = typeOrmOrganizationGithubRepositoryIssueRepository;
    }
    /**
     * Execute a command to synchronize a GitHub repository issue and store it in the local database.
     *
     * @param command - The command containing input parameters for the synchronization.
     * @returns A Promise that resolves to the synchronized organization's GitHub repository issue.
     */
    async execute(command) {
        try {
            // Extract input parameters from the command
            const { input, repositoryId, issue } = command;
            // Extract relevant data from the input
            const { organizationId, integrationId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            // Find the synced repository based on organization, tenant, and integration
            const syncedRepository = await this.findRepository({
                organizationId,
                tenantId,
                integrationId,
                repositoryId
            });
            // Extract issue details
            const { id, number } = issue;
            /** */
            try {
                return await this.typeOrmOrganizationGithubRepositoryIssueRepository.findOneByOrFail({
                    issueId: id,
                    issueNumber: number,
                    organizationId,
                    tenantId,
                    repositoryId: syncedRepository.id
                });
            }
            catch (error) {
                // Create a new integration repository issue if it doesn't exist
                const createEntity = this.typeOrmOrganizationGithubRepositoryIssueRepository.create({
                    issueId: id,
                    issueNumber: number,
                    organizationId,
                    tenantId,
                    repositoryId: syncedRepository ? syncedRepository.id : null
                });
                return await this.typeOrmOrganizationGithubRepositoryIssueRepository.save(createEntity);
            }
        }
        catch (error) {
            console.log('Error while syncing GitHub repository issue:', error.message);
            throw new Error('Failed to sync GitHub repository issue');
        }
    }
    /**
     * Find a GitHub repository in the local database.
     *
     * @param organizationId - The organization's ID.
     * @param tenantId - The tenant's ID.
     * @param integrationId - The integration's ID.
     * @param repositoryId - The GitHub repository's ID.
     * @returns A Promise that resolves to the found organization's GitHub repository, or null if not found.
     */
    async findRepository({ organizationId, tenantId, integrationId, repositoryId }) {
        return await this.typeOrmOrganizationGithubRepositoryRepository.findOneBy({
            organizationId,
            tenantId,
            integrationId,
            repositoryId,
        });
    }
};
exports.IntegrationSyncGithubRepositoryIssueCommandHandler = IntegrationSyncGithubRepositoryIssueCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_sync_github_repository_issue_command_1.IntegrationSyncGithubRepositoryIssueCommand),
    __metadata("design:paramtypes", [type_orm_organization_github_repository_repository_1.TypeOrmOrganizationGithubRepositoryRepository,
        type_orm_github_repository_issue_repository_1.TypeOrmOrganizationGithubRepositoryIssueRepository])
], IntegrationSyncGithubRepositoryIssueCommandHandler);
//# sourceMappingURL=integration-sync-github-repository-issue.handler.js.map