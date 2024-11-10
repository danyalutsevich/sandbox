import { TimeOffRequest } from "./time-off-request.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
export declare class TimeOffRequestSubscriber extends BaseEntityEventSubscriber<TimeOffRequest> {
    /**
    * Indicates that this subscriber only listen to TimeOffRequest events.
    */
    listenTo(): typeof TimeOffRequest;
    /**
     * Called after a TimeOffRequest entity is loaded from the database. This method updates
     * the entity's document URL if an associated document with a full URL is present.
     *
     * @param entity The TimeOffRequest entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: TimeOffRequest): Promise<void>;
}
