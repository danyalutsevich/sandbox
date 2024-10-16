import { IIntegrationMapSyncRepository, IOrganizationGithubRepository } from '../../../../plugins/contracts/dist/index';
import { GithubRepositoryService } from './github-repository.service';
import { UpdateGithubRepositoryDTO } from './dto';
export declare class GitHubRepositoryController {
    private readonly _githubRepositoryService;
    constructor(_githubRepositoryService: GithubRepositoryService);
    /**
     * Sync a GitHub repository with Gauzy using provided data.
     *
     * @param entity The data needed for synchronization.
     * @returns The synchronized integration map.
     */
    syncRepository(entity: IIntegrationMapSyncRepository): Promise<IOrganizationGithubRepository>;
    /**
     * Handle an HTTP PUT request to update a GitHub repository by its unique identifier.
     * @param id - A string representing the unique identifier of the GitHub repository.
     * @param input - An object representing the data to update the GitHub repository with.
     * @returns A Promise that resolves to the updated GitHub repository data.
     */
    update(id: string, input: UpdateGithubRepositoryDTO): Promise<IOrganizationGithubRepository>;
}
