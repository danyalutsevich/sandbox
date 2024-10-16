import { Tenant } from "./tenant.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
export declare class TenantSubscriber extends BaseEntityEventSubscriber<Tenant> {
    /**
    * Indicates that this subscriber only listen to Organization events.
    */
    listenTo(): typeof Tenant;
    /**
     * Executes after a Tenant entity is loaded. It updates the entity's logo
     * using `updateTenantLogo`. Errors during this process are logged.
     *
     * @param entity The loaded Tenant entity.
     * @returns {Promise<void>}
     */
    afterEntityLoad(entity: Tenant): Promise<void>;
    /**
     * Invoked before creating a new Tenant entity. It sets or updates the logo
     * through `updateTenantLogo`. Errors are logged for troubleshooting.
     *
     * @param entity The Tenant entity to be created.
     */
    beforeEntityCreate(entity: Tenant): Promise<void>;
    /**
     * Called before a Tenant entity is updated in the database. This method updates
     * the tenant's logo as necessary before the actual database update occurs.
     *
     * @param entity The Tenant entity that is about to be updated.
     * @returns {Promise<void>} A promise that resolves when the pre-update processing is complete.
     */
    beforeEntityUpdate(entity: Tenant): Promise<void>;
    /**
     * Updates the logo for a Tenant entity.
     *
     * @param entity - The Tenant entity for which the logo is to be updated.
     * @returns A promise that resolves when the logo update is complete.
     */
    updateTenantLogo(entity: Tenant): Promise<void>;
}
