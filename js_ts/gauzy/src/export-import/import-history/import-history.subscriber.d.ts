import { BaseEntityEventSubscriber } from "../../core/entities/subscribers/base-entity-event.subscriber";
import { ImportHistory } from "./import-history.entity";
export declare class ImportHistorySubscriber extends BaseEntityEventSubscriber<ImportHistory> {
    /**
    * Indicates that this subscriber only listen to ImportHistory events.
    */
    listenTo(): typeof ImportHistory;
    /**
     * Called after an ImportHistory entity is loaded from the database. This method updates
     * the entity by setting the full URL using the FileStorage provider based on the entity's path.
     *
     * @param entity The ImportHistory entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: ImportHistory): Promise<void>;
}
