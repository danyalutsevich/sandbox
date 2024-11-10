import { ICommand } from '@nestjs/cqrs';
import { ITimeSlot } from '../../../../plugins/contracts/dist/index';
export declare class CreateTimeSlotCommand implements ICommand {
    readonly input: ITimeSlot;
    static readonly type = "[TimeSlot] create";
    constructor(input: ITimeSlot);
}
