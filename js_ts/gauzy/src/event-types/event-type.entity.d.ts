import { IEmployee, IEventType, ITag } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EventType extends TenantOrganizationBaseEntity implements IEventType {
    duration: number;
    durationUnit: string;
    title: string;
    description?: string;
    /**
     * Employee
     */
    employee?: IEmployee;
    readonly employeeId?: string;
    /**
     * Tag
     */
    tags?: ITag[];
}
