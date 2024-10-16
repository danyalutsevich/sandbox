import { ICommand } from '@nestjs/cqrs';
import { ITimeSlotMinute } from '../../../../plugins/contracts/dist/index';
export declare class CreateTimeSlotMinutesCommand implements ICommand {
    readonly input: ITimeSlotMinute;
    static readonly type = "[TimeSlotMinutes] create";
    constructor(input: ITimeSlotMinute);
}
