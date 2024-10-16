import { IActivity, IURLMetaData, IEmployee, ITask, ITimeSlot, IOrganizationProject } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class Activity extends TenantOrganizationBaseEntity implements IActivity {
    title: string;
    description?: string;
    metaData?: string | IURLMetaData;
    date: string;
    time: string;
    duration?: number;
    type?: string;
    source?: string;
    recordedAt?: Date;
    /**
     * Employee
     */
    employee?: IEmployee;
    /**
     * Employee ID
     */
    employeeId?: IEmployee['id'];
    /**
     * Organization Project Relationship
     */
    project?: IOrganizationProject;
    /**
     * Organization Project ID
     */
    projectId?: IOrganizationProject['id'];
    /**
     * Time Slot Activity
     */
    timeSlot?: ITimeSlot;
    timeSlotId?: ITimeSlot['id'];
    /**
     * Task Activity
     */
    task?: ITask;
    taskId?: ITask['id'];
}
