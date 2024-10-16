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
exports.InviteSubscriber = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/contracts/dist/index");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
const invite_entity_1 = require("./invite.entity");
let InviteSubscriber = exports.InviteSubscriber = class InviteSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Invite events.
    */
    listenTo() {
        return invite_entity_1.Invite;
    }
    /**
     * Called after an Invite entity is loaded from the database. This method updates the
     * entity's status based on its expiration date.
     *
     * @param entity The Invite entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the post-load processing is complete.
     */
    async afterEntityLoad(entity) {
        try {
            if ('expireDate' in entity) {
                // Determine if the invite is expired
                entity.isExpired = entity.expireDate ? (0, moment_1.default)(entity.expireDate).isBefore((0, moment_1.default)()) : false;
            }
            // Update the status based on the expiration
            if (entity.isExpired) {
                entity.status = index_1.InviteStatusEnum.EXPIRED;
            }
        }
        catch (error) {
            console.error('InviteSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.InviteSubscriber = InviteSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], InviteSubscriber);
//# sourceMappingURL=invite.subscriber.js.map