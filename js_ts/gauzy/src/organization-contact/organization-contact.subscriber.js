"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationContactSubscriber = void 0;
const typeorm_1 = require("typeorm");
const organization_contact_entity_1 = require("./organization-contact.entity");
const utils_1 = require("./../core/utils");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let OrganizationContactSubscriber = exports.OrganizationContactSubscriber = class OrganizationContactSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to OrganizationContact events.
     */
    listenTo() {
        return organization_contact_entity_1.OrganizationContact;
    }
    /**
     * Called after an OrganizationContact entity is loaded from the database. This method updates
     * the entity's image URL, setting it to the existing image's URL, or generating a dummy
     * image if no image URL is present.
     *
     * @param entity The OrganizationContact entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            if (entity.image && entity.image.fullUrl) {
                // Use the full URL from the image property if available
                entity.imageUrl = entity.image.fullUrl;
            }
            else if (!entity.imageUrl && entity.name) {
                // Otherwise, generate a dummy image URL based on the first character of the name
                console.log('OrganizationContactSubscriber: generate dummy image for entity.name', entity.name);
                entity.imageUrl = (0, utils_1.getDummyImage)(330, 300, entity.name.charAt(0).toUpperCase());
            }
        }
        catch (error) {
            console.error('OrganizationContactSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before an OrganizationContact entity is inserted or created in the database. This method sets a
     * default image URL based on the first character of the entity's name if an image URL is not already provided.
     *
     * @param entity The OrganizationContact entity that is about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Generate a dummy image URL based on the first character of the name, if imageUrl is not provided
            if (!entity.imageUrl && entity.name) {
                entity.imageUrl = (0, utils_1.getDummyImage)(330, 300, entity.name.charAt(0).toUpperCase());
            }
        }
        catch (error) {
            console.error('OrganizationContactSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.OrganizationContactSubscriber = OrganizationContactSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationContactSubscriber);
//# sourceMappingURL=organization-contact.subscriber.js.map