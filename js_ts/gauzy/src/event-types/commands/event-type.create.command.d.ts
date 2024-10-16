import { ICommand } from '@nestjs/cqrs';
import { IEventTypeCreateInput } from '../../../plugins/contracts';
export declare class EventTypeCreateCommand implements ICommand {
    readonly input: IEventTypeCreateInput;
    static readonly type = "[EventType] Create";
    constructor(input: IEventTypeCreateInput);
}
