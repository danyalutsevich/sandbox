import { DeleteResult, UpdateResult } from 'typeorm';
import { IEmployee, IOrganizationTeam, IOrganizationTeamEmployee, IOrganizationTeamEmployeeActiveTaskUpdateInput, IOrganizationTeamEmployeeFindInput, IOrganizationTeamEmployeeUpdateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { Role } from './../core/entities/internal';
import { OrganizationTeamEmployee } from './organization-team-employee.entity';
import { TaskService } from './../tasks/task.service';
import { MikroOrmOrganizationTeamEmployeeRepository } from './repository/mikro-orm-organization-team-employee.repository';
import { TypeOrmOrganizationTeamEmployeeRepository } from './repository/type-orm-organization-team-employee.repository';
export declare class OrganizationTeamEmployeeService extends TenantAwareCrudService<OrganizationTeamEmployee> {
    private readonly taskService;
    constructor(typeOrmOrganizationTeamEmployeeRepository: TypeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository, taskService: TaskService);
    updateOrganizationTeam(organizationTeamId: IOrganizationTeam['id'], organizationId: IOrganizationTeam['organizationId'], employees: IEmployee[], role: Role, managerIds: string[], memberIds: string[]): Promise<void>;
    /**
     * Delete team members by IDs
     *
     * @param memberIds
     */
    deleteMemberByIds(memberIds: string[]): void;
    /**
     * Update organization team member entity
     *
     * @param id
     * @param entity
     * @returns
     */
    update(memberId: IOrganizationTeamEmployee['id'], entity: IOrganizationTeamEmployeeUpdateInput): Promise<OrganizationTeamEmployee | UpdateResult>;
    /**
     * Update organization team member active task entity
     *
     * @param id
     * @param entity
     * @returns
     */
    updateActiveTask(memberId: IOrganizationTeamEmployee['id'], entity: IOrganizationTeamEmployeeActiveTaskUpdateInput): Promise<OrganizationTeamEmployee | UpdateResult>;
    /**
     * Delete team member by memberId
     *
     * @param memberId
     * @param options
     * @returns
     */
    deleteTeamMember(memberId: IOrganizationTeamEmployee['id'], options: IOrganizationTeamEmployeeFindInput): Promise<DeleteResult | OrganizationTeamEmployee>;
}
