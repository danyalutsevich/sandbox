import { IEvent } from "@nestjs/cqrs";
import { ITask } from '../../../plugins/contracts';

export class TaskUpdatedEvent implements IEvent {

    constructor(
        public readonly input: ITask
    ) { }
}
