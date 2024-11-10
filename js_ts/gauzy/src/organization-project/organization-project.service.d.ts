import { IEmployee, IOrganizationGithubRepository, IOrganizationProject, IOrganizationProjectsFindInput, IPagination } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { OrganizationProject } from './organization-project.entity';
import { TypeOrmOrganizationProjectRepository } from './repository/type-orm-organization-project.repository';
import { MikroOrmOrganizationProjectRepository } from './repository/mikro-orm-organization-project.repository';
export declare class OrganizationProjectService extends TenantAwareCrudService<OrganizationProject> {
    constructor(typeOrmOrganizationProjectRepository: TypeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository: MikroOrmOrganizationProjectRepository);
    /**
     * Find employee assigned projects
     *
     * @param employeeId
     * @param options
     * @returns
     */
    findByEmployee(employeeId: IEmployee['id'], options: IOrganizationProjectsFindInput): Promise<IOrganizationProject[]>;
    /**
     * Organization project override find all method
     *
     * @param filter
     * @returns
     */
    findAll(options?: PaginationParams<OrganizationProject>): Promise<IPagination<OrganizationProject>>;
    /**
     * Organization project override pagination method
     *
     * @param filter
     * @returns
     */
    pagination(options?: PaginationParams<OrganizationProject>): Promise<IPagination<OrganizationProject>>;
    /**
     * Get organization projects associated with a specific repository.
     *
     * @param repositoryId - The ID of the repository.
     * @param options - An object containing organization, tenant, and integration information.
     * @returns A Promise that resolves to an array of organization projects.
     */
    getProjectsByGithubRepository(repositoryId: IOrganizationGithubRepository['repositoryId'], options: {
        organizationId: IOrganizationGithubRepository['id'];
        tenantId: IOrganizationGithubRepository['tenantId'];
        integrationId: IOrganizationGithubRepository['integrationId'];
        projectId?: IOrganizationProject['id'];
    }): Promise<IOrganizationProject[]>;
    /**
     * Find synchronized organization projects with options and count their associated issues.
     *
     * @param options - Query and pagination options (optional).
     * @returns A paginated list of synchronized organization projects with associated issue counts.
     */
    findSyncedProjects(options?: PaginationParams<OrganizationProject>): Promise<IPagination<OrganizationProject>>;
}
