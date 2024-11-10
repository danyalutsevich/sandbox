import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { Integration } from './integration.entity';
export declare class IntegrationSubscriber extends BaseEntityEventSubscriber<Integration> {
    /**
     * Indicates that this subscriber only listen to Integration events.
     */
    listenTo(): typeof Integration;
    /**
     * Called after an Integration entity is loaded from the database. This method updates
     * the entity by setting the full image URL using a specified file storage provider.
     *
     * @param entity The Integration entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: Integration): Promise<void>;
}
