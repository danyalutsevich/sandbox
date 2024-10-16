import { DeleteResult } from 'typeorm';
import { IOrganizationTeamCreateInput, IOrganizationTeam, IPagination, IOrganizationTeamUpdateInput, IBasePerTenantAndOrganizationEntityModel, IUser } from '../../plugins/contracts/dist/index';
import { Employee } from '../core/entities/internal';
import { PaginationParams, TenantAwareCrudService } from '../core/crud';
import { RoleService } from '../role/role.service';
import { UserService } from './../user/user.service';
import { OrganizationTeamEmployeeService } from '../organization-team-employee/organization-team-employee.service';
import { TaskService } from './../tasks/task.service';
import { TypeOrmEmployeeRepository } from '../employee/repository';
import { EmployeeService } from './../employee/employee.service';
import { TimerService } from '../time-tracking/timer/timer.service';
import { StatisticService } from '../time-tracking/statistic';
import { GetOrganizationTeamStatisticQuery } from './queries';
import { MikroOrmOrganizationTeamRepository, TypeOrmOrganizationTeamRepository } from './repository';
import { OrganizationTeam } from './organization-team.entity';
import { MikroOrmOrganizationTeamEmployeeRepository } from '../organization-team-employee/repository/mikro-orm-organization-team-employee.repository';
export declare class OrganizationTeamService extends TenantAwareCrudService<OrganizationTeam> {
    readonly typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository;
    readonly mikroOrmOrganizationTeamRepository: MikroOrmOrganizationTeamRepository;
    readonly mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository;
    private readonly typeOrmEmployeeRepository;
    private readonly statisticService;
    private readonly timerService;
    private readonly roleService;
    private readonly organizationTeamEmployeeService;
    private readonly userService;
    private readonly employeeService;
    private readonly taskService;
    constructor(typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository: MikroOrmOrganizationTeamRepository, mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, statisticService: StatisticService, timerService: TimerService, roleService: RoleService, organizationTeamEmployeeService: OrganizationTeamEmployeeService, userService: UserService, employeeService: EmployeeService, taskService: TaskService);
    /**
     * Execute the GetOrganizationTeamStatisticQuery.
     *
     * @param input - The input query for getting organization team statistics.
     * @returns The organization team with optional statistics.
     */
    getOrganizationTeamStatistic(input: GetOrganizationTeamStatisticQuery): Promise<IOrganizationTeam>;
    /**
     * Synchronize last worked task information for members of an organization team.
     *
     * @param members - Array of organization team members.
     * @param input - Input parameters including date range and statistics options.
     * @returns A promise resolving to an array of organization team members with updated statistics.
     */
    private syncLastWorkedTask;
    /**
     * Retrieves a collection of employees based on specified criteria.
     * @param memberIds - Array of member IDs to include in the query.
     * @param managerIds - Array of manager IDs to include in the query.
     * @param organizationId - The organization ID for filtering.
     * @param tenantId - The tenant ID for filtering.
     * @returns A Promise resolving to an array of Employee entities with associated user information.
     */
    retrieveEmployees(memberIds: string[], managerIds: string[], organizationId: string, tenantId: string): Promise<Employee[]>;
    /**
     * Creates an organization team based on the provided input.
     * @param input - Input data for creating the organization team.
     * @returns A Promise resolving to the created organization team.
     * @throws BadRequestException if there is an error in the creation process.
     */
    create(input: IOrganizationTeamCreateInput): Promise<IOrganizationTeam>;
    /**
     * Update an organization team.
     *
     * @param id - The ID of the organization team to be updated.
     * @param input - The updated information for the organization team.
     * @returns A Promise resolving to the updated organization team.
     * @throws ForbiddenException if the user lacks permission or if certain conditions are not met.
     * @throws BadRequestException if there's an error during the update process.
     */
    update(id: IOrganizationTeam['id'], input: IOrganizationTeamUpdateInput): Promise<IOrganizationTeam>;
    /**
     * Find teams associated with the current user.
     *
     * @param options - Pagination options.
     * @returns A Promise resolving to the paginated list of teams.
     * @throws UnauthorizedException if an unauthorized user attempts to access this information.
     */
    findMyTeams(options: PaginationParams<OrganizationTeam>): Promise<IPagination<OrganizationTeam>>;
    /**
     * GET organization teams pagination by params
     *
     * @param filter
     * @returns
     */
    pagination(options?: PaginationParams<OrganizationTeam>): Promise<IPagination<OrganizationTeam>>;
    /**
     * Retrieves a paginated list of organization teams based on specified options.
     * @param options - Pagination and filtering options.
     * @returns A Promise resolving to an object containing paginated organization teams.
     */
    findAll(options?: PaginationParams<OrganizationTeam>): Promise<IPagination<IOrganizationTeam>>;
    /**
     * Delete an organization team.
     *
     * @param teamId - The ID of the organization team to be deleted.
     * @param options - Additional options for the deletion, such as organizationId.
     * @returns A Promise resolving to the result of the deletion operation.
     * @throws ForbiddenException if the current context lacks the necessary permission.
     */
    deleteTeam(teamId: IOrganizationTeam['id'], options: IBasePerTenantAndOrganizationEntityModel): Promise<DeleteResult | IOrganizationTeam>;
    /**
     * Checks if a user is a member of any teams and performs necessary actions.
     *
     * @param userId - The ID of the user to check.
     * @returns A Promise resolving to the result of the operation.
     * @throws ForbiddenException if the current context lacks the necessary permission or if the user is not found or not associated with an employee.
     */
    existTeamsAsMember(userId: IUser['id']): Promise<DeleteResult>;
}
