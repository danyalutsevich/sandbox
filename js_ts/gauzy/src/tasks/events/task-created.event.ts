import { IEvent } from "@nestjs/cqrs";
import { ITask } from '../../../plugins/contracts';

export class TaskCreatedEvent implements IEvent {

    constructor(
        public readonly input: ITask
    ) { }
}
