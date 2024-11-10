import { BaseEntityEventSubscriber } from "../../core/entities/subscribers/base-entity-event.subscriber";
import { Activity } from "./activity.entity";
export declare class ActivitySubscriber extends BaseEntityEventSubscriber<Activity> {
    /**
    * Indicates that this subscriber only listen to Activity events.
    */
    listenTo(): typeof Activity;
    /**
     * Called before an Activity entity is inserted or created in the database.
     * This method prepares the entity for insertion, particularly by serializing the metaData property to a JSON string
     * for SQLite databases.
     *
     * @param entity The Activity entity that is about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: Activity): Promise<void>;
}
