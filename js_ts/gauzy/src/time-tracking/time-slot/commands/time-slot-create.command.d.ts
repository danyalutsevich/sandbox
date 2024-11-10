import { ICommand } from '@nestjs/cqrs';
import { ITimeSlotCreateInput } from '../../../../plugins/contracts/dist/index';
export declare class TimeSlotCreateCommand implements ICommand {
    readonly input: ITimeSlotCreateInput;
    static readonly type = "[TimeSlot] Create TimeSlot";
    constructor(input: ITimeSlotCreateInput);
}
