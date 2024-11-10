import { IOrganizationGithubRepository, IOrganizationGithubRepositoryIssue } from '../../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../../../../core/entities/internal';
export declare class OrganizationGithubRepositoryIssue extends TenantOrganizationBaseEntity implements IOrganizationGithubRepositoryIssue {
    issueId: number;
    issueNumber: number;
    /**
     * Organization Github Repository
     */
    repository?: IOrganizationGithubRepository;
    repositoryId?: IOrganizationGithubRepository['id'];
}
