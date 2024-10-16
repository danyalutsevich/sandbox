import { ICommand } from '@nestjs/cqrs';
export declare class ScheduleTimeSlotEntriesCommand implements ICommand {
    static readonly type = "Adjust [TimeSlot] Entries";
    constructor();
}
