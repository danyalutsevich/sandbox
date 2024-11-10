import { IEvent } from "@nestjs/cqrs";
import { ITask } from '../../../plugins/contracts';
export declare class TaskCreatedEvent implements IEvent {
    readonly input: ITask;
    constructor(input: ITask);
}
