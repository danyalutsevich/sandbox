import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { Task } from "./task.entity";
export declare class TaskSubscriber extends BaseEntityEventSubscriber<Task> {
    /**
    * Indicates that this subscriber only listen to Task events.
    */
    listenTo(): typeof Task;
    /**
     * Called after a Task entity is loaded from the database. This method constructs a formatted
     * task number based on the prefix and the task's number.
     *
     * @param entity The Task entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the task number generation is complete.
     */
    afterEntityLoad(entity: Task): Promise<void>;
    /**
     * Called before a Task entity is inserted into the database. This method sets the creator ID
     * of the task based on the current user context.
     *
     * @param entity The Task entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: Task): Promise<void>;
}
