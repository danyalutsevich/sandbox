"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamJoinRequestSubscriber = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/config/dist/index");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const organization_team_join_request_entity_1 = require("./organization-team-join-request.entity");
let OrganizationTeamJoinRequestSubscriber = exports.OrganizationTeamJoinRequestSubscriber = class OrganizationTeamJoinRequestSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
     * Indicates that this subscriber only listen to OrganizationTeamJoinRequest events.
     */
    listenTo() {
        return organization_team_join_request_entity_1.OrganizationTeamJoinRequest;
    }
    /**
     * Called after an OrganizationTeamJoinRequest entity is loaded from the database. This method checks
     * if the join request is expired based on the 'expiredAt' property and sets the 'isExpired' flag accordingly.
     *
     * @param entity The OrganizationTeamJoinRequest entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Check if the entity has an 'expiredAt' date and set the 'isExpired' flag
            entity.isExpired = entity.expiredAt ? (0, moment_1.default)(entity.expiredAt).isBefore((0, moment_1.default)()) : false;
        }
        catch (error) {
            console.error('OrganizationTeamJoinRequestSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
    /**
     * Called before an OrganizationTeamJoinRequest entity is inserted into the database. This method sets
     * the expiration date for the join request based on a predefined interval.
     *
     * @param entity The OrganizationTeamJoinRequest entity about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Set the expiredAt date by adding the predefined expiration time to the current date
            entity.expiredAt = (0, moment_1.default)().add(index_1.environment.TEAM_JOIN_REQUEST_EXPIRATION_TIME, 'seconds').toDate();
        }
        catch (error) {
            console.error('OrganizationTeamJoinRequestSubscriber: An error occurred during the beforeEntityCreate process:', error);
        }
    }
};
exports.OrganizationTeamJoinRequestSubscriber = OrganizationTeamJoinRequestSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], OrganizationTeamJoinRequestSubscriber);
//# sourceMappingURL=organization-team-join-request.subscriber.js.map