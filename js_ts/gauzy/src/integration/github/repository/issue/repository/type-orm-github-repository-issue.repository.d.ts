import { Repository } from 'typeorm';
import { OrganizationGithubRepositoryIssue } from '../github-repository-issue.entity';
export declare class TypeOrmOrganizationGithubRepositoryIssueRepository extends Repository<OrganizationGithubRepositoryIssue> {
    readonly repository: Repository<OrganizationGithubRepositoryIssue>;
    constructor(repository: Repository<OrganizationGithubRepositoryIssue>);
}
