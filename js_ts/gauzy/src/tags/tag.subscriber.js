"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSubscriber = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const file_storage_1 = require("./../core/file-storage");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const tag_entity_1 = require("./tag.entity");
let TagSubscriber = exports.TagSubscriber = class TagSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to Tag events.
     */
    listenTo() {
        return tag_entity_1.Tag;
    }
    /**
     * Called after a Tag entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using the FileStorage provider.
     *
     * @param entity The Tag entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Update the fullIconUrl if an icon property is present
            if (entity.icon) {
                const store = new file_storage_1.FileStorage().setProvider(index_1.FileStorageProviderEnum.LOCAL);
                entity.fullIconUrl = await store.getProviderInstance().url(entity.icon);
            }
        }
        catch (error) {
            console.error(`TagSubscriber: An error occurred during the afterEntityLoad process for entity ID ${entity.id}:`, error);
        }
    }
    /**
     * Called before a Tag entity is inserted into the database. This method sets a default color
     * for the tag if one isn't provided.
     *
     * @param entity The Tag entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-insertion processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Set a default color using faker if not provided
            entity.color = entity.color || faker_1.faker.internet.color();
        }
        catch (error) {
            console.error('TagSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.TagSubscriber = TagSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], TagSubscriber);
//# sourceMappingURL=tag.subscriber.js.map