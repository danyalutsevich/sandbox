import { ICommand } from '@nestjs/cqrs';
export declare class TimeSlotBulkDeleteCommand implements ICommand {
    readonly input: any;
    readonly forceDirectDelete: boolean;
    static readonly type = "[TimeSlot] delete";
    constructor(input: any, forceDirectDelete?: boolean);
}
