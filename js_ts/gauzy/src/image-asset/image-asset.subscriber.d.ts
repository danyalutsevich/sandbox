import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
import { ImageAsset } from "./image-asset.entity";
export declare class ImageAssetSubscriber extends BaseEntityEventSubscriber<ImageAsset> {
    /**
    * Indicates that this subscriber only listen to ImageAsset events.
    */
    listenTo(): typeof ImageAsset;
    /**
     * Called after an ImageAsset entity is loaded from the database.
     * This method updates the entity by setting the full and thumbnail URLs using the provided storage provider.
     *
     * @param entity The ImageAsset entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: ImageAsset): Promise<void>;
}
