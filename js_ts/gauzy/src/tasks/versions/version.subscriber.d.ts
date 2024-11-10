import { BaseEntityEventSubscriber } from '../../core/entities/subscribers/base-entity-event.subscriber';
import { TaskVersion } from './version.entity';
export declare class TaskVersionSubscriber extends BaseEntityEventSubscriber<TaskVersion> {
    /**
     * Indicates that this subscriber only listen to TaskVersion events.
     */
    listenTo(): typeof TaskVersion;
    /**
     * Called after a TaskVersion entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using a specified file storage provider.
     *
     * @param entity The TaskVersion entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: TaskVersion): Promise<void>;
    /**
     * Called before a TaskVersion entity is inserted or created in the database. This method ensures
     * default values for color and value properties are set.
     *
     * @param entity The TaskVersion entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: TaskVersion): Promise<void>;
}
