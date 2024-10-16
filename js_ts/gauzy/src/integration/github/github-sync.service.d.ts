import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { OctokitService } from '../../../plugins/plugins/integration-github/dist/index';
import { IGithubAutomationIssuePayload, IGithubIssue, IGithubSyncIssuePayload, IGithubInstallationDeletedPayload, IIntegrationTenant, IGithubIssueCreateOrUpdatePayload, IIntegrationMap } from '../../../plugins/contracts';
import { IntegrationTenantService } from 'integration-tenant/integration-tenant.service';
import { OrganizationProjectService } from 'organization-project/organization-project.service';
import { GithubRepositoryService } from './repository/github-repository.service';
export declare class GithubSyncService {
    private readonly _commandBus;
    private readonly _octokitService;
    private readonly _integrationTenantService;
    private readonly _organizationProjectService;
    private readonly _githubRepositoryService;
    private readonly logger;
    constructor(_commandBus: CommandBus, _octokitService: OctokitService, _integrationTenantService: IntegrationTenantService, _organizationProjectService: OrganizationProjectService, _githubRepositoryService: GithubRepositoryService);
    /**
     * Automatically synchronize GitHub issues with a repository.
     *
     * @param {IIntegrationTenant['id']} integrationId - The ID of the integration tenant.
     * @param {IGithubSyncIssuePayload} input - The payload containing GitHub repository details and issues.
     * @param {Request} request - The HTTP request object.
     * @returns {Promise<boolean>} A Promise that indicates whether the synchronization was successful.
     */
    autoSyncGithubIssues(integrationId: IIntegrationTenant['id'], input: IGithubSyncIssuePayload, request: Request): Promise<boolean>;
    /**
     * Manually synchronize GitHub issues with a repository.
     *
     * @param {IIntegrationTenant['id']} integrationId - The ID of the integration tenant.
     * @param {IGithubSyncIssuePayload} input - The payload containing GitHub repository details and issues.
     * @param {Request} request - The HTTP request object.
     * @returns {Promise<boolean>} A Promise indicating whether the synchronization was successful.
     */
    manualSyncGithubIssues(integrationId: IIntegrationTenant['id'], input: IGithubSyncIssuePayload, request: Request): Promise<boolean>;
    /**
     * Synchronize GitHub issues and labels based on entity settings.
     *
     * @param integrationId - The ID of the integration tenant.
     * @param input - The payload containing information required for synchronization.
     * @throws {HttpException} Throws an HTTP exception if synchronization fails.
     */
    syncingGithubIssues(integrationId: IIntegrationTenant['id'], input: IGithubSyncIssuePayload, delay?: number, successCallback?: (success: boolean) => void, errorCallback?: (error: boolean) => void): Promise<IIntegrationMap[] | boolean>;
    /**
     * Synchronize GitHub labels for a specific repository issue based on integration settings.
     *
     * @param organizationId - The ID of the organization.
     * @param tenantId - The ID of the organization's tenant.
     * @param integrationId - The ID of the GitHub integration.
     * @param repository - Information about the GitHub repository for which labels are synchronized.
     * @param issue - The GitHub issue for which labels are synchronized.
     * @returns A promise that resolves to the result of the label synchronization process, which is an array of tags.
     */
    private syncGithubLabelsByIssueNumber;
    /**
     * Syncs automation issues for a GitHub repository.
     *
     * @param integration - The GitHub integration settings.
     * @param input - The payload containing information for the synchronization.
     */
    syncAutomationIssue(input: IGithubAutomationIssuePayload): Promise<any>;
    /**
     * Determines whether an issue should be synchronized based on project settings.
     *
     * @param project - The project configuration.
     * @param issue - The GitHub issue to be synchronized.
     * @returns A boolean indicating whether the issue should be synchronized.
     */
    private shouldSyncIssue;
    /**
     * Deletes a GitHub installation and its associated integration.
     *
     * @param payload - An object containing the installation and its associated integration.
     */
    installationDeleted(payload: IGithubInstallationDeletedPayload): Promise<void>;
    /**
     * Map GitHub issue payload data to the required format.
     *
     * @param issues - An array of GitHub issues.
     * @returns An array of mapped issue payload data.
     */
    private _mapIssuePayload;
    /**
     * Create or Update a GitHub issue on a repository using the specified installation ID.
     *
     * @param installationId - The GitHub installation ID.
     * @param data - The data for the GitHub issue, including repo, owner, title, body, and labels.
     * @returns A promise that resolves to the response from GitHub.
     */
    createOrUpdateIssue(installationId: number, data: IGithubIssueCreateOrUpdatePayload): Promise<any>;
    /**
     * Retrieves all issues from a GitHub repository using the GitHub API with pagination.
     *
     * @param installation_id - The installation ID for the GitHub App.
     * @param owner - The owner (user or organization) of the GitHub repository.
     * @param repo - The name of the GitHub repository.
     * @returns A Promise that resolves to an array of GitHub issues.
     */
    getRepositoryAllIssues(installation_id: number, owner: string, repo: string, callback?: (issues: IGithubIssue[]) => void): Promise<IGithubIssue[]>;
}
