"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportHistorySubscriber = void 0;
const typeorm_1 = require("typeorm");
const file_storage_1 = require("./../../core/file-storage");
const base_entity_event_subscriber_1 = require("../../core/entities/subscribers/base-entity-event.subscriber");
const import_history_entity_1 = require("./import-history.entity");
let ImportHistorySubscriber = exports.ImportHistorySubscriber = class ImportHistorySubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to ImportHistory events.
    */
    listenTo() {
        return import_history_entity_1.ImportHistory;
    }
    /**
     * Called after an ImportHistory entity is loaded from the database. This method updates
     * the entity by setting the full URL using the FileStorage provider based on the entity's path.
     *
     * @param entity The ImportHistory entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            if (entity instanceof import_history_entity_1.ImportHistory) {
                const provider = new file_storage_1.FileStorage().getProvider();
                // Ensure that the entity has a valid path before attempting to generate the URL
                if (entity.path) {
                    entity.fullUrl = await provider.url(entity.path);
                }
            }
        }
        catch (error) {
            console.error('ImportHistorySubscriber: An error occurred during the afterEntityLoad process:', error);
        }
    }
};
exports.ImportHistorySubscriber = ImportHistorySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ImportHistorySubscriber);
//# sourceMappingURL=import-history.subscriber.js.map