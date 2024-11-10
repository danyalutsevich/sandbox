import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { EmailReset } from './email-reset.entity';
export declare class EmailResetSubscriber extends BaseEntityEventSubscriber<EmailReset> {
    /**
     * Indicates that this subscriber only listen to EmailReset events.
     */
    listenTo(): typeof EmailReset;
    /**
     * Called after entity is loaded from the database.
     *
     * @param entity
     */
    afterEntityLoad(entity: EmailReset): Promise<void>;
    /**
     * Called before entity is inserted/created to the database.
     *
     * @param entity
     */
    beforeEntityCreate(entity: EmailReset): Promise<void>;
}
