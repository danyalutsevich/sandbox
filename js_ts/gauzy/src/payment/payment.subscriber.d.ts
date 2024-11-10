import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { Payment } from "./payment.entity";
export declare class PaymentSubscriber extends BaseEntityEventSubscriber<Payment> {
    /**
    * Indicates that this subscriber only listen to Payment events.
    */
    listenTo(): typeof Payment;
    /**
     * Called before a Payment entity is inserted or created in the database. This method assigns
     * the ID of the current user to the recordedById property of the entity, tracking who created the payment.
     *
     * @param entity The Payment entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: Payment): Promise<void>;
}
