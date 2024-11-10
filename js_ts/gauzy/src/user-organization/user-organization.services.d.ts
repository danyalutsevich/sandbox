import { IOrganization, IPagination, IUser, IUserOrganization } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { TypeOrmOrganizationRepository } from '../organization/repository';
import { UserOrganization } from './user-organization.entity';
import { MikroOrmUserOrganizationRepository, TypeOrmUserOrganizationRepository } from './repository';
import { EmployeeService } from '../employee/employee.service';
export declare class UserOrganizationService extends TenantAwareCrudService<UserOrganization> {
    readonly typeOrmUserOrganizationRepository: TypeOrmUserOrganizationRepository;
    readonly mikroOrmUserOrganizationRepository: MikroOrmUserOrganizationRepository;
    readonly typeOrmOrganizationRepository: TypeOrmOrganizationRepository;
    private readonly employeeService;
    constructor(typeOrmUserOrganizationRepository: TypeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository: MikroOrmUserOrganizationRepository, typeOrmOrganizationRepository: TypeOrmOrganizationRepository, employeeService: EmployeeService);
    /**
     * Finds all user organizations based on the provided filter options.
     *
     * @param filter Optional filter options to apply when querying user organizations.
     * @returns A promise resolving to an array of user organizations.
     */
    findAllUserOrganizations(filter: PaginationParams<UserOrganization>, includeEmployee: boolean): Promise<IPagination<UserOrganization>>;
    /**
     * Adds a user to all organizations within a specific tenant.
     *
     * @param userId The unique identifier of the user to be added to the organizations.
     * @param tenantId The unique identifier of the tenant whose organizations the user will be added to.
     * @returns A promise that resolves to an array of IUserOrganization, where each element represents the user's association with an organization in the tenant.
     */
    addUserToOrganization(user: IUser, organizationId: IOrganization['id']): Promise<IUserOrganization | IUserOrganization[]>;
    /**
     * Adds a user to all organizations within a given tenant..
     *
     * @param userId The unique identifier of the user to be added to the organizations.
     * @param tenantId The unique identifier of the tenant whose organizations the user will be added to.
     * @returns A promise that resolves to an array of IUserOrganization, representing the user-organization relationships created.
     */
    private _addUserToAllOrganizations;
}
