"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskVersionSubscriber = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const file_storage_1 = require("../../core/file-storage");
const base_entity_event_subscriber_1 = require("../../core/entities/subscribers/base-entity-event.subscriber");
const version_entity_1 = require("./version.entity");
let TaskVersionSubscriber = exports.TaskVersionSubscriber = class TaskVersionSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to TaskVersion events.
     */
    listenTo() {
        return version_entity_1.TaskVersion;
    }
    /**
     * Called after a TaskVersion entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using a specified file storage provider.
     *
     * @param entity The TaskVersion entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Generate and set the full icon URL if an icon property exists
            if (entity.icon) {
                const store = new file_storage_1.FileStorage().setProvider(contracts_1.FileStorageProviderEnum.LOCAL);
                entity.fullIconUrl = await store.getProviderInstance().url(entity.icon);
            }
        }
        catch (error) {
            console.error('TaskVersionSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before a TaskVersion entity is inserted or created in the database. This method ensures
     * default values for color and value properties are set.
     *
     * @param entity The TaskVersion entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Set a default color using faker if not provided
            entity.color = entity.color || faker_1.faker.internet.color();
            // Set a sluggable value based on the name, if provided
            if ('name' in entity) {
                entity.value = (0, index_1.sluggable)(entity.name);
            }
        }
        catch (error) {
            console.error('TaskVersionSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.TaskVersionSubscriber = TaskVersionSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], TaskVersionSubscriber);
//# sourceMappingURL=version.subscriber.js.map