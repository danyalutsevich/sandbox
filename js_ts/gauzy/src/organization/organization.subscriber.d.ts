import { Organization } from './organization.entity';
import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
export declare class OrganizationSubscriber extends BaseEntityEventSubscriber<Organization> {
    /**
     * Indicates that this subscriber only listen to Organization events.
     */
    listenTo(): typeof Organization;
    /**
     * Called after an Organization entity is loaded from the database. This method updates
     * the entity's image URL based on the available data.
     *
     * @param entity The Organization entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: Organization): Promise<void>;
    /**
     * Called before an Organization entity is inserted or created in the database.
     * This method sets default values for certain properties of the entity.
     *
     * @param entity The Organization entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: Organization): Promise<void>;
}
