import { ICommand } from '@nestjs/cqrs';
import { IDeleteTimeSlot } from '../../../../plugins/contracts/dist/index';
export declare class DeleteTimeSlotCommand implements ICommand {
    readonly query: IDeleteTimeSlot;
    static readonly type = "[TimeSlot] delete";
    constructor(query: IDeleteTimeSlot);
}
