import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { EmailTemplate } from "./email-template.entity";
export declare class EmailTemplateSubscriber extends BaseEntityEventSubscriber<EmailTemplate> {
    /**
    * Indicates that this subscriber only listen to EmailTemplate events.
    */
    listenTo(): typeof EmailTemplate;
    /**
     * Called after entity is loaded from the database.
     *
     * @param entity
     */
    afterEntityLoad(entity: EmailTemplate): Promise<void>;
}
