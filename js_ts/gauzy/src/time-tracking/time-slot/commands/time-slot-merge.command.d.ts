import { ITimeSlot } from '../../../../plugins/contracts/dist/index';
import { ICommand } from '@nestjs/cqrs';
export declare class TimeSlotMergeCommand implements ICommand {
    readonly organizationId: ITimeSlot['organizationId'];
    readonly employeeId: ITimeSlot['employeeId'];
    readonly start: ITimeSlot['startedAt'];
    readonly end: ITimeSlot['stoppedAt'];
    static readonly type = "[TimeSlot] merge";
    constructor(organizationId: ITimeSlot['organizationId'], employeeId: ITimeSlot['employeeId'], start: ITimeSlot['startedAt'], end: ITimeSlot['stoppedAt']);
}
