"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureSubscriber = void 0;
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const file_storage_1 = require("./../core/file-storage");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const feature_entity_1 = require("./feature.entity");
let FeatureSubscriber = exports.FeatureSubscriber = class FeatureSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Feature events.
    */
    listenTo() {
        return feature_entity_1.Feature;
    }
    /**
     * Called after an entity is loaded from the database.
     *
     * @param entity - The loaded Feature entity.
     */
    async afterEntityLoad(entity) {
        try {
            // Set a default status if not present
            if (!entity.status) {
                entity.status = (0, underscore_1.shuffle)(Object.values(index_2.FeatureStatusEnum))[0];
            }
            // Check and set isEnabled based on gauzyToggleFeatures
            entity.isEnabled = index_1.gauzyToggleFeatures.hasOwnProperty(entity.code) ? !!index_1.gauzyToggleFeatures[entity.code] : true;
            // Set imageUrl based on the entity's image property
            if (entity.image) {
                const store = new file_storage_1.FileStorage().setProvider(index_2.FileStorageProviderEnum.LOCAL);
                entity.imageUrl = await store.getProviderInstance().url(entity.image);
            }
        }
        catch (error) {
            console.error('FeatureSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.FeatureSubscriber = FeatureSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], FeatureSubscriber);
//# sourceMappingURL=feature.subscriber.js.map