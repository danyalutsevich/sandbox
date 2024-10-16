"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRelatedIssueTypeSubscriber = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const file_storage_1 = require("../../core/file-storage");
const related_issue_type_entity_1 = require("./related-issue-type.entity");
const base_entity_event_subscriber_1 = require("../../core/entities/subscribers/base-entity-event.subscriber");
let TaskRelatedIssueTypeSubscriber = exports.TaskRelatedIssueTypeSubscriber = class TaskRelatedIssueTypeSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to TaskRelatedIssueType events.
     */
    listenTo() {
        return related_issue_type_entity_1.TaskRelatedIssueType;
    }
    /**
     * Called after a TaskRelatedIssueType entity is loaded from the database. This method updates
     * the entity by setting the full icon URL if an icon is associated with the issue type.
     *
     * @param entity The TaskRelatedIssueType entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Update the fullIconUrl if an icon is present
            if (entity.icon) {
                const store = new file_storage_1.FileStorage().setProvider(contracts_1.FileStorageProviderEnum.LOCAL);
                entity.fullIconUrl = await store.getProviderInstance().url(entity.icon);
            }
        }
        catch (error) {
            console.error(`TaskRelatedIssueTypeSubscriber: An error occurred during the afterEntityLoad process for entity ID ${entity.id}:`, error);
        }
    }
    /**
     * Called before a TaskRelatedIssueType entity is inserted into the database. This method ensures
     * that default values for color and value properties are set.
     *
     * @param entity The TaskRelatedIssueType entity about to be created.
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
            console.error('TaskRelatedIssueTypeSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.TaskRelatedIssueTypeSubscriber = TaskRelatedIssueTypeSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], TaskRelatedIssueTypeSubscriber);
//# sourceMappingURL=related-issue-type.subscriber.js.map