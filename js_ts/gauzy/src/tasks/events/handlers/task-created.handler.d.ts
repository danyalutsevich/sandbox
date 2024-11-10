import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { TaskCreatedEvent } from '../task-created.event';
export declare class TaskCreatedEventHandler implements IEventHandler<TaskCreatedEvent> {
    private readonly _commandBus;
    private readonly logger;
    constructor(_commandBus: CommandBus);
    /**
     * Handles a `TaskCreatedEvent` by processing the event's input and executing a command if a project ID is present.
     *
     * @param event - The `TaskCreatedEvent` to handle.
     */
    handle(event: TaskCreatedEvent): Promise<void>;
}
