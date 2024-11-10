import { ICommand } from '@nestjs/cqrs';
import { AvailabilityMergeType, IAvailabilitySlotsCreateInput } from '../../../plugins/contracts';
export declare class AvailabilitySlotsCreateCommand implements ICommand {
    readonly input: IAvailabilitySlotsCreateInput;
    readonly insertType: AvailabilityMergeType;
    static readonly type = "[AvailabilitySlots] Create";
    constructor(input: IAvailabilitySlotsCreateInput, insertType?: AvailabilityMergeType);
}
