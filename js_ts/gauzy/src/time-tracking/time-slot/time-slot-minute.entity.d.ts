import { ITimeSlot, ITimeSlotMinute } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class TimeSlotMinute extends TenantOrganizationBaseEntity implements ITimeSlotMinute {
    keyboard?: number;
    mouse?: number;
    datetime?: Date;
    timeSlot?: ITimeSlot;
    readonly timeSlotId?: string;
}
