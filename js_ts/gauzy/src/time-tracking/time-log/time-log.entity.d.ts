import { ITimeLog, TimeLogType, TimeLogSourceEnum, ITimesheet, IEmployee, ITask, IOrganizationProject, IOrganizationContact, ITimeSlot, IOrganizationTeam } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class TimeLog extends TenantOrganizationBaseEntity implements ITimeLog {
    startedAt?: Date;
    stoppedAt?: Date;
    /**
     * Edited timestamp column
     */
    editedAt?: Date;
    logType: TimeLogType;
    source?: TimeLogSourceEnum;
    description?: string;
    reason?: string;
    isBillable: boolean;
    isRunning?: boolean;
    version?: string;
    /** Additional virtual columns */
    duration: number;
    /**
     * Indicates whether the TimeLog has been edited.
     * If the value is true, it means the TimeLog has been edited.
     * If the value is false or undefined, it means the TimeLog has not been edited.
     */
    isEdited?: boolean;
    /**
     * Employee relationship
     */
    employee: IEmployee;
    employeeId: IEmployee['id'];
    /**
     * Timesheet relationship
     */
    timesheet?: ITimesheet;
    timesheetId?: ITimesheet['id'];
    /**
     * Organization Project Relationship
     */
    project?: IOrganizationProject;
    /**
     * Organization Project ID
     */
    projectId?: IOrganizationProject['id'];
    /**
     * Task
     */
    task?: ITask;
    taskId?: ITask['id'];
    /**
     * OrganizationContact
     */
    organizationContact?: IOrganizationContact;
    organizationContactId?: IOrganizationContact['id'];
    /**
     * Organization Team
     */
    organizationTeam?: IOrganizationTeam;
    organizationTeamId?: IOrganizationTeam['id'];
    /**
     * TimeSlot
     */
    timeSlots?: ITimeSlot[];
    /**
     * Called after entity is loaded.
     */
    afterEntityLoad?(): void;
}
