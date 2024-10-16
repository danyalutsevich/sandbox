import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { IntegrationSetting } from './integration-setting.entity';
export declare class IntegrationSettingSubscriber extends BaseEntityEventSubscriber<IntegrationSetting> {
    /**
     * Indicates that this subscriber only listen to IntegrationSetting events.
     */
    listenTo(): typeof IntegrationSetting;
    /**
     * Called after an IntegrationSetting entity is loaded from the database. This method handles
     * sensitive information by partially masking it before presenting to the user.
     *
     * @param entity The IntegrationSetting entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    afterEntityLoad(entity: IntegrationSetting): Promise<void>;
}
