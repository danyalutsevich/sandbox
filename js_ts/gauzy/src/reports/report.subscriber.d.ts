import { Report } from "./report.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
export declare class ReportSubscriber extends BaseEntityEventSubscriber<Report> {
    /**
    * Indicates that this subscriber only listen to Report events.
    */
    listenTo(): typeof Report;
    /**
     * Called after a Report entity is loaded from the database. This method updates
     * the entity by setting the image URL using the FileStorage provider.
     *
     * @param entity The Report entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: Report): Promise<void>;
}
