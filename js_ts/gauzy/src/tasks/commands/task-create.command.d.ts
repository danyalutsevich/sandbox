import { ICommand } from '@nestjs/cqrs';
import { ITaskCreateInput } from '../../../plugins/contracts';
export declare class TaskCreateCommand implements ICommand {
    readonly input: ITaskCreateInput;
    readonly triggeredEvent: boolean;
    static readonly type = "[Tasks] Create Task";
    constructor(input: ITaskCreateInput, triggeredEvent?: boolean);
}
