import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { Feature } from "./feature.entity";
export declare class FeatureSubscriber extends BaseEntityEventSubscriber<Feature> {
    /**
    * Indicates that this subscriber only listen to Feature events.
    */
    listenTo(): typeof Feature;
    /**
     * Called after an entity is loaded from the database.
     *
     * @param entity - The loaded Feature entity.
     */
    afterEntityLoad(entity: Feature): Promise<void>;
}
