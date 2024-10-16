"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSubscriber = void 0;
const typeorm_1 = require("typeorm");
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/common/dist/index");
const organization_entity_1 = require("./organization.entity");
const utils_1 = require("../core/utils");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let OrganizationSubscriber = exports.OrganizationSubscriber = class OrganizationSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to Organization events.
     */
    listenTo() {
        return organization_entity_1.Organization;
    }
    /**
     * Called after an Organization entity is loaded from the database. This method updates
     * the entity's image URL based on the available data.
     *
     * @param entity The Organization entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Check if there's an existing image with a full URL
            if (entity.image?.fullUrl) {
                entity.imageUrl = entity.image.fullUrl;
            }
            // If not, and if the imageUrl is not already set, generate a dummy image URL
            else if (!entity.imageUrl && (entity.name || entity.officialName)) {
                entity.imageUrl = (0, utils_1.getOrganizationDummyImage)(entity.name || entity.officialName);
            }
        }
        catch (error) {
            console.error('OrganizationSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before an Organization entity is inserted or created in the database.
     * This method sets default values for certain properties of the entity.
     *
     * @param entity The Organization entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            if (entity) {
                // Set a profile link based on the organization's name or official name
                if (entity.name || entity.officialName) {
                    entity.profile_link = (0, index_1.sluggable)(`${entity.name || entity.officialName}`);
                }
                // Generate a dummy image URL if an image URL is not already provided
                if (!entity.imageUrl) {
                    entity.imageUrl = (0, utils_1.getOrganizationDummyImage)(entity.name || entity.officialName);
                }
                // Assign a random color for brandColor if it's not provided
                if (!entity.brandColor) {
                    entity.brandColor = faker_1.faker.internet.color();
                }
            }
        }
        catch (error) {
            console.error('OrganizationSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.OrganizationSubscriber = OrganizationSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationSubscriber);
//# sourceMappingURL=organization.subscriber.js.map