import { Invoice } from "./invoice.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { MultiOrmEntityManager } from "../core/entities/subscribers/entity-event-subscriber.types";
export declare class InvoiceSubscriber extends BaseEntityEventSubscriber<Invoice> {
    /**
    * Indicates that this subscriber only listen to Invoice events.
    */
    listenTo(): typeof Invoice;
    /**
     * Called after an Invoice entity is created in the database. This method updates
     * the entity by setting a generated token.
     *
     * @param entity The newly created Invoice entity.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM.
     *           Used for executing the update operation.
     * @returns {Promise<void>} A promise that resolves when the update operation is complete.
     */
    afterEntityCreate(entity: Invoice, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Generate a public invoice token.
     *
     * @param payload The data to be encoded in the JWT.
     * @returns The generated JWT string.
     */
    private createToken;
}
