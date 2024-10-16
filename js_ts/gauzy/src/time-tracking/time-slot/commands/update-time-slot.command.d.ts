import { ICommand } from '@nestjs/cqrs';
import { ITimeSlot } from '../../../../plugins/contracts/dist/index';
export declare class UpdateTimeSlotCommand implements ICommand {
    readonly id: string;
    readonly input: ITimeSlot;
    static readonly type = "[TimeSlot] update";
    constructor(id: string, input: ITimeSlot);
}
