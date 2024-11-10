import { IEmployee, IOrganizationTeam, IOrganizationTeamEmployee, IRole, ITask } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationTeamEmployee extends TenantOrganizationBaseEntity implements IOrganizationTeamEmployee {
    /**
     * enabled / disabled time tracking feature for team member
     */
    isTrackingEnabled?: boolean;
    /**
     * member's active task
     */
    activeTask?: ITask;
    activeTaskId?: ITask['id'];
    /**
     * OrganizationTeam
     */
    organizationTeam: IOrganizationTeam;
    organizationTeamId: IOrganizationTeam['id'];
    /**
     * Employee
     */
    employee: IEmployee;
    employeeId: IEmployee['id'];
    /**
     * Role
     */
    role?: IRole;
    roleId?: IRole['id'];
    order: number;
}
