import { IOrganizationSprint } from '../../plugins/contracts/dist/index';
import { OrganizationProject, Task, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationSprint extends TenantOrganizationBaseEntity implements IOrganizationSprint {
    name: string;
    goal?: string;
    length: number;
    startDate?: Date;
    endDate?: Date;
    dayStart?: number;
    /**
     * OrganizationProject Relationship
     */
    project?: OrganizationProject;
    projectId: string;
    tasks?: Task[];
}
