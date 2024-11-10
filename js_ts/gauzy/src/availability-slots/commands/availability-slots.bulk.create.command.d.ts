import { ICommand } from '@nestjs/cqrs';
import { IAvailabilitySlotsCreateInput } from '../../../plugins/contracts';
export declare class AvailabilitySlotsBulkCreateCommand implements ICommand {
    readonly input: IAvailabilitySlotsCreateInput[];
    static readonly type = "[Availability Bulk Slots] Register";
    constructor(input: IAvailabilitySlotsCreateInput[]);
}
