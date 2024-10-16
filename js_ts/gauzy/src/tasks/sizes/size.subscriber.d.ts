import { BaseEntityEventSubscriber } from '../../core/entities/subscribers/base-entity-event.subscriber';
import { TaskSize } from './size.entity';
export declare class TaskSizeSubscriber extends BaseEntityEventSubscriber<TaskSize> {
    /**
     * Indicates that this subscriber only listen to TaskSize events.
     */
    listenTo(): typeof TaskSize;
    /**
     * Called after a TaskSize entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using the FileStorage provider.
     *
     * @param entity The TaskSize entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: TaskSize): Promise<void>;
    /**
     * Called before a TaskSize entity is inserted into the database. This method sets default
     * values for certain properties of the entity.
     *
     * @param entity The TaskSize entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: TaskSize): Promise<void>;
}
