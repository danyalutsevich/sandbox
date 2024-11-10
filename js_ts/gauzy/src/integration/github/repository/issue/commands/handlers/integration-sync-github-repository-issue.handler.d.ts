import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationGithubRepositoryIssue } from '../../../../../../../plugins/contracts/dist/index';
import { IntegrationSyncGithubRepositoryIssueCommand } from '../integration-sync-github-repository-issue.command';
import { TypeOrmOrganizationGithubRepositoryRepository } from '../../../repository/type-orm-organization-github-repository.repository';
import { TypeOrmOrganizationGithubRepositoryIssueRepository } from '../../repository/type-orm-github-repository-issue.repository';
export declare class IntegrationSyncGithubRepositoryIssueCommandHandler implements ICommandHandler<IntegrationSyncGithubRepositoryIssueCommand> {
    private readonly typeOrmOrganizationGithubRepositoryRepository;
    private readonly typeOrmOrganizationGithubRepositoryIssueRepository;
    constructor(typeOrmOrganizationGithubRepositoryRepository: TypeOrmOrganizationGithubRepositoryRepository, typeOrmOrganizationGithubRepositoryIssueRepository: TypeOrmOrganizationGithubRepositoryIssueRepository);
    /**
     * Execute a command to synchronize a GitHub repository issue and store it in the local database.
     *
     * @param command - The command containing input parameters for the synchronization.
     * @returns A Promise that resolves to the synchronized organization's GitHub repository issue.
     */
    execute(command: IntegrationSyncGithubRepositoryIssueCommand): Promise<IOrganizationGithubRepositoryIssue>;
    /**
     * Find a GitHub repository in the local database.
     *
     * @param organizationId - The organization's ID.
     * @param tenantId - The tenant's ID.
     * @param integrationId - The integration's ID.
     * @param repositoryId - The GitHub repository's ID.
     * @returns A Promise that resolves to the found organization's GitHub repository, or null if not found.
     */
    private findRepository;
}
