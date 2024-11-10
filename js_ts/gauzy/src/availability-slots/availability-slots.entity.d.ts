import { AvailabilitySlotType, IAvailabilitySlot, IEmployee } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class AvailabilitySlot extends TenantOrganizationBaseEntity implements IAvailabilitySlot {
    startTime: Date;
    endTime: Date;
    allDay: boolean;
    type: AvailabilitySlotType;
    /**
     * Employee
     */
    employee?: IEmployee;
    readonly employeeId?: string;
}
