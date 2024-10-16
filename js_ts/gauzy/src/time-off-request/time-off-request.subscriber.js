"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffRequestSubscriber = void 0;
const typeorm_1 = require("typeorm");
const time_off_request_entity_1 = require("./time-off-request.entity");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let TimeOffRequestSubscriber = exports.TimeOffRequestSubscriber = class TimeOffRequestSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to TimeOffRequest events.
    */
    listenTo() {
        return time_off_request_entity_1.TimeOffRequest;
    }
    /**
     * Called after a TimeOffRequest entity is loaded from the database. This method updates
     * the entity's document URL if an associated document with a full URL is present.
     *
     * @param entity The TimeOffRequest entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Check if the entity has an associated document with a full URL and update the document URL
            if (entity.document && entity.document.fullUrl) {
                entity.documentUrl = entity.document.fullUrl;
            }
        }
        catch (error) {
            console.error('TimeOffRequestSubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.TimeOffRequestSubscriber = TimeOffRequestSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], TimeOffRequestSubscriber);
//# sourceMappingURL=time-off-request.subscriber.js.map