import { ICommand } from '@nestjs/cqrs';
import { ITimeSlot } from '../../../../plugins/contracts/dist/index';
export declare class TimeSlotBulkCreateOrUpdateCommand implements ICommand {
    readonly slots: ITimeSlot[];
    readonly employeeId: ITimeSlot['employeeId'];
    readonly organizationId: ITimeSlot['organizationId'];
    static readonly type = "[TimeSlot] bulk create / update";
    constructor(slots: ITimeSlot[], employeeId: ITimeSlot['employeeId'], organizationId: ITimeSlot['organizationId']);
}
