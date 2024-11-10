import { BaseEntityEventSubscriber } from '../../core/entities/subscribers/base-entity-event.subscriber';
import { TaskStatus } from './status.entity';
export declare class TaskStatusSubscriber extends BaseEntityEventSubscriber<TaskStatus> {
    /**
     * Indicates that this subscriber only listen to TaskStatus events.
     */
    listenTo(): typeof TaskStatus;
    /**
     * Called after a TaskStatus entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using the FileStorage provider.
     *
     * @param entity The TaskStatus entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: TaskStatus): Promise<void>;
    /**
     * Called before a TaskStatus entity is inserted into the database. This method ensures
     * default values for color and value properties are set.
     *
     * @param entity The TaskStatus entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: TaskStatus): Promise<void>;
}
