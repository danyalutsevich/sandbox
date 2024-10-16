import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { TaskUpdatedEvent } from '../task-updated.event';
export declare class TaskUpdatedEventHandler implements IEventHandler<TaskUpdatedEvent> {
    private readonly _commandBus;
    private readonly logger;
    constructor(_commandBus: CommandBus);
    /**
     * Handles a `TaskUpdatedEvent` by processing the event's input and executing a command if a project ID is present.
     *
     * @param event - The `TaskUpdatedEvent` to handle.
     */
    handle(event: TaskUpdatedEvent): Promise<void>;
}
