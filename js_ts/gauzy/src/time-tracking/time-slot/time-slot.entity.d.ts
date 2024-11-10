import { ITimeSlot, ITimeSlotMinute, IActivity, IScreenshot, IEmployee, ITimeLog } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class TimeSlot extends TenantOrganizationBaseEntity implements ITimeSlot {
    duration?: number;
    keyboard?: number;
    mouse?: number;
    overall?: number;
    startedAt: Date;
    /** Additional virtual columns */
    stoppedAt?: Date;
    percentage?: number;
    keyboardPercentage?: number;
    mousePercentage?: number;
    /**
     * Employee
     */
    employee?: IEmployee;
    employeeId: IEmployee['id'];
    /**
     * Screenshot
     */
    screenshots?: IScreenshot[];
    /**
     * Activity
     */
    activities?: IActivity[];
    /**
     * TimeSlotMinute
     */
    timeSlotMinutes?: ITimeSlotMinute[];
    /**
     * TimeLog
     */
    timeLogs?: ITimeLog[];
}
