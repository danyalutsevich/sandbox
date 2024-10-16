import { ProductCategory } from "./product-category.entity";
import { BaseEntityEventSubscriber } from "../core/entities/subscribers/base-entity-event.subscriber";
export declare class ProductCategorySubscriber extends BaseEntityEventSubscriber<ProductCategory> {
    /**
    * Indicates that this subscriber only listen to ProductCategory events.
    */
    listenTo(): typeof ProductCategory;
    /**
     * Called after a ProductCategory entity is loaded from the database. This method updates
     * the entity's imageUrl if an associated image with a full URL is present.
     *
     * @param entity The ProductCategory entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    afterEntityLoad(entity: ProductCategory): Promise<void>;
}
