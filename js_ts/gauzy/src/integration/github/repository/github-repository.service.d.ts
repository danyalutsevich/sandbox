import { CommandBus } from '@nestjs/cqrs';
import { IIntegrationMapSyncRepository, IOrganizationGithubRepository } from '../../../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from 'core/crud';
import { OrganizationGithubRepository } from './github-repository.entity';
import { MikroOrmOrganizationGithubRepositoryRepository } from './repository/mikro-orm-organization-github-repository.repository';
import { TypeOrmOrganizationGithubRepositoryRepository } from './repository/type-orm-organization-github-repository.repository';
export declare class GithubRepositoryService extends TenantAwareCrudService<OrganizationGithubRepository> {
    private readonly _commandBus;
    private readonly logger;
    constructor(typeOrmOrganizationGithubRepositoryRepository: TypeOrmOrganizationGithubRepositoryRepository, mikroOrmOrganizationGithubRepositoryRepository: MikroOrmOrganizationGithubRepositoryRepository, _commandBus: CommandBus);
    /**
     * Synchronize a GitHub repository with an integration.
     *
     * @param input - The input data for synchronization.
     * @returns An object indicating success or failure of the synchronization.
     */
    syncGithubRepository(input: IIntegrationMapSyncRepository): Promise<IOrganizationGithubRepository>;
}
