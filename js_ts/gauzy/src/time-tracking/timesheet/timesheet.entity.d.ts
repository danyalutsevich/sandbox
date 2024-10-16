import { IEmployee, ITimesheet, IUser } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class Timesheet extends TenantOrganizationBaseEntity implements ITimesheet {
    duration?: number;
    keyboard?: number;
    mouse?: number;
    overall?: number;
    startedAt?: Date;
    stoppedAt?: Date;
    approvedAt?: Date;
    submittedAt?: Date;
    lockedAt?: Date;
    /**
     * Edited timestamp column
     */
    editedAt?: Date;
    isBilled?: boolean;
    status: string;
    /** Additional virtual columns */
    /**
     * Indicates whether the Timesheet has been edited.
     * If the value is true, it means the Timesheet has been edited.
     * If the value is false or undefined, it means the Timesheet has not been edited.
     */
    isEdited?: boolean;
    /**
     * Employee
     */
    employee: IEmployee;
    employeeId?: IEmployee['id'];
    /**
     * Approve By User
     */
    approvedBy?: IUser;
    approvedById?: IUser['id'];
    /**
     * Called after entity is loaded.
     */
    afterLoadEntity?(): void;
}
