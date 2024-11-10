import { IEmployee, IOrganization, ISkill } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Skill extends TenantOrganizationBaseEntity implements ISkill {
    name?: string;
    description?: string;
    color?: string;
    /**
     * employees skills
     */
    employees?: IEmployee[];
    /**
     * organizations skills
     */
    organizations?: IOrganization[];
}
