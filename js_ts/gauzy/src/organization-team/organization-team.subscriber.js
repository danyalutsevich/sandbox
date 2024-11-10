"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamSubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const context_1 = require("../core/context");
const utils_1 = require("../core/utils");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const organization_team_entity_1 = require("./organization-team.entity");
let OrganizationTeamSubscriber = exports.OrganizationTeamSubscriber = class OrganizationTeamSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to OrganizationTeam events.
     */
    listenTo() {
        return organization_team_entity_1.OrganizationTeam;
    }
    /**
     * Called after an OrganizationTeam entity is loaded from the database. This method updates
     * the entity by setting the prefix and updating the logo URL if an image is available.
     *
     * @param entity The OrganizationTeam entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Set or update the prefix
            entity.prefix = entity.prefix ? entity.prefix.toUpperCase() : entity.name?.substring(0, 3).toUpperCase();
            // Update the logo URL if an image is available
            if (entity.image && entity.image.fullUrl) {
                entity.logo = entity.image.fullUrl;
            }
        }
        catch (error) {
            console.error('OrganizationTeamSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before an OrganizationTeam entity is inserted into the database. This method sets the
     * creator ID, generates a slug for the profile link, and assigns a default logo if necessary.
     *
     * @param entity The OrganizationTeam entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-insertion processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Assign the current user's ID as the creator
            entity.createdById = context_1.RequestContext.currentUserId();
            // Generate a slug for the profile link
            if (entity.profile_link || entity.name) {
                entity.profile_link = (0, index_1.sluggable)(`${entity.profile_link || entity.name}`);
            }
            // Set a default logo if not provided
            if (!entity.logo && entity.name) {
                entity.logo = (0, utils_1.getDummyImage)(330, 300, entity.name.charAt(0).toUpperCase());
            }
        }
        catch (error) {
            console.error('OrganizationTeamSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
    /**
     * Called before an OrganizationTeam entity is updated in the database. This method updates
     * the slug for the profile link based on the team's name.
     *
     * @param entity The OrganizationTeam entity that is about to be updated.
     * @returns {Promise<void>} A promise that resolves when the pre-update processing is complete.
     */
    async beforeEntityUpdate(entity) {
        try {
            // Update the profile link slug if the name is provided
            if (entity.name) {
                entity.profile_link = (0, index_1.sluggable)(entity.name);
            }
        }
        catch (error) {
            console.error('OrganizationTeamSubscriber: An error occurred during the beforeEntityUpdate process:', error);
        }
    }
};
exports.OrganizationTeamSubscriber = OrganizationTeamSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationTeamSubscriber);
//# sourceMappingURL=organization-team.subscriber.js.map