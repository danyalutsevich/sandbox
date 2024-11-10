"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTypeSubscriber = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const file_storage_1 = require("./../../core/file-storage");
const base_entity_event_subscriber_1 = require("../../core/entities/subscribers/base-entity-event.subscriber");
const issue_type_entity_1 = require("./issue-type.entity");
let IssueTypeSubscriber = exports.IssueTypeSubscriber = class IssueTypeSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to IssueType events.
     */
    listenTo() {
        return issue_type_entity_1.IssueType;
    }
    /**
     * Called after an IssueType entity is loaded from the database. This method updates
     * the entity by setting the full icon URL using the FileStorage provider.
     *
     * @param entity The IssueType entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            if (entity.image && entity.image.fullUrl) {
                // Use the fullUrl from the image property if available
                entity.fullIconUrl = entity.image.fullUrl;
            }
            else if (entity.icon) {
                // Otherwise, generate the full URL for the icon
                const store = new file_storage_1.FileStorage().setProvider(contracts_1.FileStorageProviderEnum.LOCAL);
                entity.fullIconUrl = await store.getProviderInstance().url(entity.icon);
            }
        }
        catch (error) {
            console.error('IssueTypeSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before an IssueType entity is inserted into the database. This method sets default
     * values and prepares the entity for creation.
     *
     * @param entity The IssueType entity that is about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Set a default color if not provided
            if (!entity.color) {
                entity.color = faker_1.faker.internet.color();
            }
            // Generate a slug from the name, if the name property exists
            if (typeof entity.name === 'string') {
                entity.value = (0, index_1.sluggable)(entity.name);
            }
        }
        catch (error) {
            console.error('IssueTypeSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.IssueTypeSubscriber = IssueTypeSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], IssueTypeSubscriber);
//# sourceMappingURL=issue-type.subscriber.js.map