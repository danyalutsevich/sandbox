import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { Invite } from "./invite.entity";
export declare class InviteSubscriber extends BaseEntityEventSubscriber<Invite> {
    /**
    * Indicates that this subscriber only listen to Invite events.
    */
    listenTo(): typeof Invite;
    /**
     * Called after an Invite entity is loaded from the database. This method updates the
     * entity's status based on its expiration date.
     *
     * @param entity The Invite entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    afterEntityLoad(entity: Invite): Promise<void>;
}
