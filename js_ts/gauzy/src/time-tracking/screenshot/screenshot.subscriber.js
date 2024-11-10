"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotSubscriber = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/common/dist/index");
const base_entity_event_subscriber_1 = require("../../core/entities/subscribers/base-entity-event.subscriber");
const screenshot_entity_1 = require("./screenshot.entity");
const file_storage_1 = require("./../../core/file-storage");
const utils_1 = require("./../../core/utils");
const entity_event_subscriber_types_1 = require("../../core/entities/subscribers/entity-event-subscriber.types");
let ScreenshotSubscriber = exports.ScreenshotSubscriber = class ScreenshotSubscriber extends base_entity_event_subscriber_1.BaseEntityEventSubscriber {
    /**
    * Indicates that this subscriber only listen to Screenshot events.
    */
    listenTo() {
        return screenshot_entity_1.Screenshot;
    }
    /**
     * Called before a Screenshot entity is created in the database.
     * This method prepares the entity for creation, including handling database-specific logic such as converting certain properties to JSON
     * strings for SQLite databases when using TypeORM.
     *
     * @param entity The Screenshot entity about to be created.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. Used for additional database operations if necessary.
     * @returns {Promise<void>} A promise that resolves when the pre-creation processing is complete.
     */
    async beforeEntityCreate(entity, em) {
        try {
            if (!(entity instanceof screenshot_entity_1.Screenshot)) {
                return; // Early exit if the entity is not a Screenshot
            }
            // Handle TypeORM specific logic
            if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                const options = em.connection.options || (0, index_1.getConfig)().dbConnectionOptions;
                // If the database is SQLite and the entity has an 'apps' property, convert it to a JSON string
                if ((0, utils_1.isSqliteDB)(options) && (0, index_2.isJsObject)(entity.apps)) {
                    try {
                        entity.apps = JSON.stringify(entity.apps);
                    }
                    catch (error) {
                        // Handle the error appropriately, set a default value or take another action.
                        entity.apps = JSON.stringify([]);
                    }
                }
            }
            // Handle MikroORM specific logic
            else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                // Placeholder for any MikroORM-specific logic, if needed
                console.log(em.getConnection());
            }
        }
        catch (error) {
            console.error('ScreenshotSubscriber: An error occurred during the beforeEntityCreate process:', error.message);
        }
    }
    /**
     * Called before a Screenshot entity is updated in the database.
     * This method prepares the entity for update, including converting certain properties to JSON strings for specific database types.
     *
     * @param entity The Screenshot entity about to be updated.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. Used for additional database operations if necessary.
     * @returns {Promise<void>} A promise that resolves when the pre-update processing is complete.
     */
    async beforeEntityUpdate(entity, em) {
        try {
            if (!(entity instanceof screenshot_entity_1.Screenshot)) {
                return; // Early exit if the entity is not a Screenshot
            }
            // Handle TypeORM specific logic
            if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                const options = em.connection.options || (0, index_1.getConfig)().dbConnectionOptions;
                // If the database is SQLite and the entity has an 'apps' property, convert it to a JSON string
                if ((0, utils_1.isSqliteDB)(options) && (0, index_2.isJsObject)(entity.apps)) {
                    try {
                        entity.apps = JSON.stringify(entity.apps);
                    }
                    catch (error) {
                        // Handle the error appropriately, set a default value or take another action.
                        entity.apps = JSON.stringify([]);
                    }
                }
            }
            // Handle MikroORM specific logic
            else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                // Placeholder for any MikroORM-specific logic, if needed
                console.log(em.getConnection());
            }
        }
        catch (error) {
            console.error('ScreenshotSubscriber: An error occurred during the beforeEntityUpdate process:', error.message);
        }
    }
    /**
     * Called after a Screenshot entity is loaded from the database. This method performs additional
     * processing such as retrieving file URLs from a storage provider and handling specific data formats based on the database type.
     *
     * @param entity The loaded Screenshot entity.
     * @param em An optional entity manager which can be either from TypeORM or MikroORM. Used for additional database operations if necessary.
     * @returns {Promise<void>} A promise that resolves when the additional processing is complete.
     */
    async afterEntityLoad(entity, em) {
        try {
            if (!(entity instanceof screenshot_entity_1.Screenshot)) {
                return; // Early exit if the entity is not a Screenshot
            }
            // Handle TypeORM specific logic
            if (em instanceof entity_event_subscriber_types_1.TypeOrmEntityManager) {
                const { storageProvider, file, thumb, apps } = entity;
                const store = new file_storage_1.FileStorage().setProvider(storageProvider);
                const instance = store.getProviderInstance();
                // Retrieve URLs concurrently
                const [fullUrl, thumbUrl] = await Promise.all([
                    instance.url(file),
                    instance.url(thumb)
                ]);
                entity.fullUrl = fullUrl;
                entity.thumbUrl = thumbUrl;
                // Additional logic for specific database types
                const options = em.connection.options || (0, index_1.getConfig)().dbConnectionOptions;
                // If the database is SQLite and the entity has an 'apps' property, convert it to a JSON string
                if ((0, utils_1.isSqliteDB)(options) && typeof apps === 'string') {
                    try {
                        entity.apps = JSON.parse(apps);
                    }
                    catch (error) {
                        console.error('ScreenshotSubscriber: JSON parse error during the afterEntityLoad process:', error);
                        entity.apps = [];
                    }
                }
            }
            // Handle MikroORM specific logic
            else if (em instanceof entity_event_subscriber_types_1.MikroOrmEntityManager) {
                // Placeholder for any MikroORM-specific logic, if needed
                console.log(em.getConnection());
            }
        }
        catch (error) {
            console.error('ScreenshotSubscriber: An error occurred during the afterEntityLoad process:', error.message);
        }
    }
    /**
     * Called after a Screenshot entity is deleted from the database.
     * This method handles the deletion of associated files (both the main file and its thumbnail) from the storage system.
     *
     * @param entity The Screenshot entity that was deleted.
     * @returns {Promise<void>} A promise that resolves when the file deletion operations are complete.
     */
    async afterEntityDelete(entity) {
        try {
            if (!(entity instanceof screenshot_entity_1.Screenshot)) {
                return; // Early exit if the entity is not a Screenshot
            }
            const { id: entityId, storageProvider, file, thumb } = entity;
            console.log(`BEFORE SCREENSHOT ENTITY WITH ID ${entityId} REMOVED`);
            // Initialize the file storage instance with the provided storage provider.
            const instance = new file_storage_1.FileStorage().setProvider(storageProvider).getProviderInstance();
            // Deleting both the main file and the thumbnail, if they exist.
            await Promise.all([
                file && instance.deleteFile(file),
                thumb && instance.deleteFile(thumb)
            ]);
        }
        catch (error) {
            console.error(`ScreenshotSubscriber: Error deleting files for entity ID ${entity?.id}:`, error.message);
        }
    }
};
exports.ScreenshotSubscriber = ScreenshotSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], ScreenshotSubscriber);
//# sourceMappingURL=screenshot.subscriber.js.map