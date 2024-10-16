"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitySubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../../plugins/common/dist/index");
const index_2 = require("../../../plugins/config/dist/index");
const base_entity_event_subscriber_1 = require("../../core/entities/subscribers/base-entity-event.subscriber");
const activity_entity_1 = require("./activity.entity");
let ActivitySubscriber = exports.ActivitySubscriber = class ActivitySubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Activity events.
    */
    listenTo() {
        return activity_entity_1.Activity;
    }
    /**
     * Called before an Activity entity is inserted or created in the database.
     * This method prepares the entity for insertion, particularly by serializing the metaData property to a JSON string
     * for SQLite databases.
     *
     * @param entity The Activity entity that is about to be created.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity) {
        try {
            // Check if the database is SQLite and the entity's metaData is a JavaScript object
            if (((0, index_2.isSqlite)() || (0, index_2.isBetterSqlite3)()) && (0, index_1.isJsObject)(entity.metaData)) {
                entity.metaData = JSON.stringify(entity.metaData);
            }
        }
        catch (error) {
            // In case of error during JSON serialization, reset metaData to an empty object
            entity.metaData = JSON.stringify({});
            console.error('ActivitySubscriber: Error during the beforeEntityCreate process:', error);
        }
    }
};
exports.ActivitySubscriber = ActivitySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ActivitySubscriber);
//# sourceMappingURL=activity.subscriber.js.map