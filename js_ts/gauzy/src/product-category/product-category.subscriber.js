"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategorySubscriber = void 0;
const typeorm_1 = require("typeorm");
const product_category_entity_1 = require("./product-category.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let ProductCategorySubscriber = exports.ProductCategorySubscriber = class ProductCategorySubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to ProductCategory events.
    */
    listenTo() {
        return product_category_entity_1.ProductCategory;
    }
    /**
     * Called after a ProductCategory entity is loaded from the database. This method updates
     * the entity's imageUrl if an associated image with a full URL is present.
     *
     * @param entity The ProductCategory entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Update the imageUrl if an associated image with a full URL is present
            if (entity.image && entity.image.fullUrl) {
                entity.imageUrl = entity.image.fullUrl;
            }
        }
        catch (error) {
            console.error(`ProductCategorySubscriber: An error occurred during the afterEntityLoad process for entity ID ${entity.id}:`, error);
        }
    }
};
exports.ProductCategorySubscriber = ProductCategorySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ProductCategorySubscriber);
//# sourceMappingURL=product-category.subscriber.js.map