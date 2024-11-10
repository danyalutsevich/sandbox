"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriber = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../core/utils");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const user_entity_1 = require("./user.entity");
let UserSubscriber = exports.UserSubscriber = class UserSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
        return user_entity_1.User;
    }
    /**
     * Called before a User entity is inserted or created in the database. This method ensures
     * that a default image URL is set if one is not provided.
     *
     * @param entity The User entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Set a default imageUrl using a dummy image if not already provided
            entity.imageUrl = entity.imageUrl || (0, utils_1.getUserDummyImage)(entity);
        }
        catch (error) {
            console.error('UserSubscriber: Error during the beforeEntityCreate process:', error);
        }
    }
    /**
     * Called after the entity is loaded from the database.
     *
     * @param entity The User entity that has been loaded.
     */
    async afterEntityLoad(entity) {
        try {
            // Combine first name and last name into a full name, if they exist.
            entity.name = [entity.firstName, entity.lastName].filter(Boolean).join(' ');
            // Set isEmailVerified to true if the emailVerifiedAt property exists and has a truthy value.
            if ('emailVerifiedAt' in entity) {
                entity.isEmailVerified = !!entity.emailVerifiedAt;
            }
            // Set imageUrl from the image object's fullUrl, if available. Fall back to existing imageUrl if not.
            if (entity['image']) {
                entity.imageUrl = entity['image'].fullUrl || entity.imageUrl;
            }
        }
        catch (error) {
            // Log any errors encountered during the execution of the function.
            console.error('Error in UserSubscriber afterEntityLoad hook:', error);
        }
    }
};
exports.UserSubscriber = UserSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], UserSubscriber);
//# sourceMappingURL=user.subscriber.js.map