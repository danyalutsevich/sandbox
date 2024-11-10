import { ICommand } from '@nestjs/cqrs';
import { IGetAvailabilitySlotsConflictInput } from '../../../plugins/contracts';
export declare class GetConflictAvailabilitySlotsCommand implements ICommand {
    readonly input: IGetAvailabilitySlotsConflictInput;
    static readonly type = "[AvailabilitySlots] get conflict";
    constructor(input: IGetAvailabilitySlotsConflictInput);
}
