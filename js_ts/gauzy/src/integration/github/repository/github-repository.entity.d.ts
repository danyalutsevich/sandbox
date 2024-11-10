import { IIntegrationTenant, IOrganizationGithubRepository, IOrganizationGithubRepositoryIssue, IOrganizationProject } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../../../core/entities/internal';
export declare class OrganizationGithubRepository extends TenantOrganizationBaseEntity implements IOrganizationGithubRepository {
    repositoryId: number;
    name: string;
    fullName: string;
    owner: string;
    issuesCount: number;
    hasSyncEnabled: boolean;
    private: boolean;
    status: string;
    /** What integration tenant sync to */
    integration: IIntegrationTenant;
    integrationId: IIntegrationTenant['id'];
    /** Repository Sync Organization Projects */
    projects?: IOrganizationProject[];
    /** Repository Sync Organization Projects */
    issues?: IOrganizationGithubRepositoryIssue[];
}
