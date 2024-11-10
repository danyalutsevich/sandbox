import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { User } from './user.entity';
export declare class UserSubscriber extends BaseEntityEventSubscriber<User> {
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo(): typeof User;
    /**
     * Called before a User entity is inserted or created in the database. This method ensures
     * that a default image URL is set if one is not provided.
     *
     * @param entity The User entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: User): Promise<void>;
    /**
     * Called after the entity is loaded from the database.
     *
     * @param entity The User entity that has been loaded.
     */
    afterEntityLoad(entity: User): Promise<void>;
}
