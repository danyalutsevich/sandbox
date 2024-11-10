import { ICommand } from '@nestjs/cqrs';
import { ITask, ITaskUpdateInput } from '../../../plugins/contracts';
export declare class TaskUpdateCommand implements ICommand {
    readonly id: ITask['id'];
    readonly input: ITaskUpdateInput;
    readonly triggeredEvent: boolean;
    static readonly type = "[Tasks] Update Task";
    constructor(id: ITask['id'], input: ITaskUpdateInput, triggeredEvent?: boolean);
}
