import { BaseEntityEventSubscriber } from './base-entity-event.subscriber';
import { MultiOrmEntityManager } from './entity-event-subscriber.types';
/**
 *
 */
export declare class TenantOrganizationBaseEntityEventSubscriber<Entity = any> extends BaseEntityEventSubscriber<Entity> {
    /**
     * Event subscriber to handle pre-creation logic for entities.
     * @param entity - The entity being created.
     * @param em - Optional entity manager, in case additional queries are needed.
     */
    beforeEntityCreate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
}
