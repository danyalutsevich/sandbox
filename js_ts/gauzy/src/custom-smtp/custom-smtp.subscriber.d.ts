import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { CustomSmtp } from "./custom-smtp.entity";
export declare class CustomSmtpSubscriber extends BaseEntityEventSubscriber<CustomSmtp> {
    /**
    * Indicates that this subscriber only listen to CustomSmtp events.
    */
    listenTo(): typeof CustomSmtp;
    /**
     * Processes a CustomSmtp entity after it's loaded.
     * This function sets the entity's secretKey and secretPassword based on its username and password, if they are present.
     *
     * @param entity The CustomSmtp entity that has been loaded.
     */
    afterEntityLoad(entity: CustomSmtp): Promise<void>;
}
