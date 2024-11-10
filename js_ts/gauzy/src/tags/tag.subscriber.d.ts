import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { Tag } from './tag.entity';
export declare class TagSubscriber extends BaseEntityEventSubscriber<Tag> {
    /**
     * Indicates that this subscriber only listen to Tag events.
     */
    listenTo(): typeof Tag;
    /**
     * Called after a Tag entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using the FileStorage provider.
     *
     * @param entity The Tag entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: Tag): Promise<void>;
    /**
     * Called before a Tag entity is inserted into the database. This method sets a default color
     * for the tag if one isn't provided.
     *
     * @param entity The Tag entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-insertion processing is complete.
     */
    beforeEntityCreate(entity: Tag): Promise<void>;
}
