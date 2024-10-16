import { ICommand } from '@nestjs/cqrs';
import { ITimeSlotMinute } from '../../../../plugins/contracts/dist/index';
export declare class UpdateTimeSlotMinutesCommand implements ICommand {
    readonly id: string;
    readonly input: ITimeSlotMinute;
    static readonly type = "[TimeSlotMinutes] update";
    constructor(id: string, input: ITimeSlotMinute);
}
