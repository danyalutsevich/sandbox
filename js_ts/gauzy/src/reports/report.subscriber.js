"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const report_entity_1 = require("./report.entity");
const file_storage_1 = require("./../core/file-storage");
const base_entity_event_subscriber_1 = require("../core/entities/subscribers/base-entity-event.subscriber");
let ReportSubscriber = exports.ReportSubscriber = class ReportSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Report events.
    */
    listenTo() {
        return report_entity_1.Report;
    }
    /**
     * Called after a Report entity is loaded from the database. This method updates
     * the entity by setting the image URL using the FileStorage provider.
     *
     * @param entity The Report entity that has been loaded.
     * @returns {Promise<void>} A promise that resolves when the URL updating process is complete.
     */
    async afterEntityLoad(entity) {
        try {
            // Update the imageUrl if an image property is present
            if (entity.image) {
                const store = new file_storage_1.FileStorage().setProvider(index_1.FileStorageProviderEnum.LOCAL);
                entity.imageUrl = await store.getProviderInstance().url(entity.image);
            }
        }
        catch (error) {
            console.error(`ReportSubscriber: An error occurred during the afterEntityLoad process for report ID ${entity.id}:`, error);
        }
    }
};
exports.ReportSubscriber = ReportSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ReportSubscriber);
//# sourceMappingURL=report.subscriber.js.map