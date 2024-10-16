import { Request } from 'express';
import { OctokitResponse, OctokitService } from '../../../plugins/plugins/integration-github/dist/index';
import { IGithubIssue, IGithubRepository, IGithubRepositoryResponse } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from 'core/dto';
import { GithubIssuesQueryDTO } from './dto';
export declare class GitHubIntegrationController {
    private readonly _octokitService;
    private readonly logger;
    constructor(_octokitService: OctokitService);
    /**
     * Get GitHub installation metadata for a specific integration.
     *
     * This endpoint allows you to retrieve metadata associated with a GitHub installation for a given integration.
     *
     * @param {Request} request - The HTTP request object.
     * @param {TenantOrganizationBaseDTO} query - Query parameters, including organizationId.
     * @returns {Promise<OctokitResponse<any> | void>} A promise that resolves with the GitHub installation metadata.
     * @throws {HttpException} If the query parameters are invalid or if there's an error retrieving the metadata.
     */
    getGithubInstallationMetadata(request: Request, query: TenantOrganizationBaseDTO): Promise<OctokitResponse<any> | void>;
    /**
     * Get GitHub repositories associated with a specific GitHub App installation within a given organization.
     *
     * This endpoint allows you to retrieve a list of GitHub repositories associated with a GitHub App installation within a specific organization.
     *
     * @param {Request} request - The HTTP request object.
     * @param {TenantOrganizationBaseDTO} query - Query parameters containing organization information.
     * @returns {Promise<OctokitResponse<IGithubRepositoryResponse>>} A promise that resolves with the GitHub repositories.
     * @throws {HttpException} If the query parameters are invalid or if there's an error retrieving the repositories.
     */
    getGithubRepositories(request: Request, query: TenantOrganizationBaseDTO): Promise<OctokitResponse<IGithubRepositoryResponse> | void>;
    /**
     * Get GitHub repository issues for a specific GitHub App installation within a given organization, owner, and repository.
     *
     * This endpoint allows you to retrieve issues associated with a GitHub repository for a GitHub App installation within a specific organization.
     *
     * @param {Request} request - The HTTP request object.
     * @param {TenantOrganizationBaseDTO} query - Query parameters containing organization information.
     * @param {string} owner - The owner (username or organization) of the repository.
     * @param {string} repo - The name of the repository.
     * @returns {Promise<OctokitResponse<IGithubIssue>>} A promise that resolves with the GitHub repository issues.
     * @throws {HttpException} If the query parameters are invalid or if there's an error retrieving the issues.
     */
    getGithubRepositoryIssues(request: Request, query: GithubIssuesQueryDTO, owner: IGithubRepository['owner']['login'], repo: IGithubRepository['name']): Promise<OctokitResponse<IGithubIssue[]> | void>;
}
