"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const file_storage_1 = require("./../core/file-storage");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const integration_entity_1 = require("./integration.entity");
let IntegrationSubscriber = exports.IntegrationSubscriber = class IntegrationSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to Integration events.
     */
    listenTo() {
        return integration_entity_1.Integration;
    }
    /**
     * Called after an Integration entity is loaded from the database. This method updates
     * the entity by setting the full image URL using a specified file storage provider.
     *
     * @param entity The Integration entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Check if imgSrc is present and non-empty
            if (entity.imgSrc) {
                // Instantiate FileStorage with the desired provider
                const store = new file_storage_1.FileStorage().setProvider(index_1.FileStorageProviderEnum.LOCAL);
                // Retrieve and set the full image URL
                entity.fullImgUrl = await store.getProviderInstance().url(entity.imgSrc);
            }
        }
        catch (error) {
            console.error('IntegrationSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.IntegrationSubscriber = IntegrationSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], IntegrationSubscriber);
//# sourceMappingURL=integration.subscriber.js.map