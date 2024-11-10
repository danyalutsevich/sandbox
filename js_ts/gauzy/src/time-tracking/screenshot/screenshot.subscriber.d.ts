import { BaseEntityEventSubscriber } from "../../core/entities/subscribers/base-entity-event.subscriber";
import { Screenshot } from "./screenshot.entity";
import { MultiOrmEntityManager } from "../../core/entities/subscribers/entity-event-subscriber.types";
export declare class ScreenshotSubscriber extends BaseEntityEventSubscriber<Screenshot> {
    /**
    * Indicates that this subscriber only listen to Screenshot events.
    */
    listenTo(): typeof Screenshot;
    /**
     * Called before a Screenshot entity is created in the database.
     * This method prepares the entity for creation, including handling database-specific logic such as converting certain properties to JSON
     * strings for SQLite databases when using TypeORM.
     *
     * @param entity The Screenshot entity about to be created.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. Used for additional database operations if necessary.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: Screenshot, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called before a Screenshot entity is updated in the database.
     * This method prepares the entity for update, including converting certain properties to JSON strings for specific database types.
     *
     * @param entity The Screenshot entity about to be updated.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. Used for additional database operations if necessary.
     * @returns {Promise<void>} A promise that resolves when the pre-update processing is complete.
     */
    beforeEntityUpdate(entity: Screenshot, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called after a Screenshot entity is loaded from the database. This method performs additional
     * processing such as retrieving file URLs from a storage provider and handling specific data formats based on the database type.
     *
     * @param entity The loaded Screenshot entity.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. Used for additional database operations if necessary.
     * @returns {Promise<void>} A promise that resolves when the additional processing is complete.
     */
    afterEntityLoad(entity: Screenshot, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called after a Screenshot entity is deleted from the database.
     * This method handles the deletion of associated files (both the main file and its thumbnail) from the storage system.
     *
     * @param entity The Screenshot entity that was deleted.
     * @returns {Promise<void>} A promise that resolves when the file deletion operations are complete.
     */
    afterEntityDelete(entity: Screenshot): Promise<void>;
}
