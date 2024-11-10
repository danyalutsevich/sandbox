import { Repository } from 'typeorm';
import { OrganizationGithubRepository } from '../github-repository.entity';
export declare class TypeOrmOrganizationGithubRepositoryRepository extends Repository<OrganizationGithubRepository> {
    readonly repository: Repository<OrganizationGithubRepository>;
    constructor(repository: Repository<OrganizationGithubRepository>);
}
