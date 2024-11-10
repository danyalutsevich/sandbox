import { OrganizationDocument } from "./organization-document.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
export declare class OrganizationDocumentSubscriber extends BaseEntityEventSubscriber<OrganizationDocument> {
    /**
    * Indicates that this subscriber only listen to OrganizationDocument events.
    */
    listenTo(): typeof OrganizationDocument;
    /**
     * Called after an OrganizationDocument entity is loaded from the database. This method updates
     * the entity's document URL if an associated document with a full URL is present.
     *
     * @param entity The OrganizationDocument entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: OrganizationDocument): Promise<void>;
}
