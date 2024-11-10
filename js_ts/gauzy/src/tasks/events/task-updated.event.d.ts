import { IEvent } from "@nestjs/cqrs";
import { ITask } from '../../../plugins/contracts';
export declare class TaskUpdatedEvent implements IEvent {
    readonly input: ITask;
    constructor(input: ITask);
}
