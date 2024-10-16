import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationGithubRepository } from '../../../../../plugins/contracts/dist/index';
import { GithubRepositoryService } from './../../repository/github-repository.service';
import { IntegrationSyncGithubRepositoryCommand } from '../integration-sync-github-repository.command';
export declare class IntegrationSyncGithubRepositoryCommandHandler implements ICommandHandler<IntegrationSyncGithubRepositoryCommand> {
    private readonly _githubRepositoryService;
    constructor(_githubRepositoryService: GithubRepositoryService);
    /**
     * Execute a synchronization of a GitHub repository for an integration.
     *
     * @param command - The command containing synchronization details.
     * @returns A promise that resolves to the integrated GitHub repository.
     */
    execute(command: IntegrationSyncGithubRepositoryCommand): Promise<IOrganizationGithubRepository>;
}
