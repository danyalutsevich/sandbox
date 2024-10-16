"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDocumentSubscriber = void 0;
const typeorm_1 = require("typeorm");
const organization_document_entity_1 = require("./organization-document.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let OrganizationDocumentSubscriber = exports.OrganizationDocumentSubscriber = class OrganizationDocumentSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to OrganizationDocument events.
    */
    listenTo() {
        return organization_document_entity_1.OrganizationDocument;
    }
    /**
     * Called after an OrganizationDocument entity is loaded from the database. This method updates
     * the entity's document URL if an associated document with a full URL is present.
     *
     * @param entity The OrganizationDocument entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            if (entity.document && entity.document.fullUrl) {
                // Use the full URL from the document property if available
                entity.documentUrl = entity.document.fullUrl;
            }
        }
        catch (error) {
            console.error('OrganizationDocumentSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.OrganizationDocumentSubscriber = OrganizationDocumentSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationDocumentSubscriber);
//# sourceMappingURL=organization-document.subscriber.js.map