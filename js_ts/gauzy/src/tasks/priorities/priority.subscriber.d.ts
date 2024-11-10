import { BaseEntityEventSubscriber } from '../../core/entities/subscribers/base-entity-event.subscriber';
import { TaskPriority } from './priority.entity';
export declare class TaskPrioritySubscriber extends BaseEntityEventSubscriber<TaskPriority> {
    /**
     * Indicates that this subscriber only listen to TaskPriority events.
     */
    listenTo(): typeof TaskPriority;
    /**
     * Called after a TaskPriority entity is loaded from the database. This method updates
     * the entity by setting the full icon URL if an icon is associated with the priority level.
     *
     * @param entity The TaskPriority entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: TaskPriority): Promise<void>;
    /**
     * Called before a TaskPriority entity is inserted into the database. This method ensures
     * that default values for color and value properties are set if they're not provided.
     *
     * @param entity The TaskPriority entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: TaskPriority): Promise<void>;
}
