import { OrganizationContact } from './organization-contact.entity';
import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
export declare class OrganizationContactSubscriber extends BaseEntityEventSubscriber<OrganizationContact> {
    /**
     * Indicates that this subscriber only listen to OrganizationContact events.
     */
    listenTo(): typeof OrganizationContact;
    /**
     * Called after an OrganizationContact entity is loaded from the database. This method updates
     * the entity's image URL, setting it to the existing image's URL, or generating a dummy
     * image if no image URL is present.
     *
     * @param entity The OrganizationContact entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: OrganizationContact): Promise<void>;
    /**
     * Called before an OrganizationContact entity is inserted or created in the database. This method sets a
     * default image URL based on the first character of the entity's name if an image URL is not already provided.
     *
     * @param entity The OrganizationContact entity that is about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    beforeEntityCreate(entity: OrganizationContact): Promise<void>;
}
