import { EventSubscriber } from "typeorm";
import { getConfig } from '../../../plugins/config/dist/index';
import { isJsObject, IDBConnectionOptions } from '../../../plugins/common/dist/index';
import { BaseEntityEventSubscriber } from "../../core/entities/subscribers/base-entity-event.subscriber";
import { Screenshot } from "./screenshot.entity";
import { FileStorage } from "./../../core/file-storage";
import { isSqliteDB } from "./../../core/utils";
import {
    MikroOrmEntityManager,
    MultiOrmEntityManager,
    TypeOrmEntityManager
} from "../../core/entities/subscribers/entity-event-subscriber.types";

// Helper function to convert options
function convertToIDBConnectionOptions(options: any): Partial<IDBConnectionOptions> {
    // Manually convert or map properties from options to Partial<IDBConnectionOptions>
    // Here we assume that options have properties similar to IDBConnectionOptions
    // Adjust this function according to the actual structure of your options

    return {
        // Add necessary properties here
        // Example:
        type: options.type,
        database: options.database,
        // Continue mapping other relevant properties
    };
}

@EventSubscriber()
export class ScreenshotSubscriber extends BaseEntityEventSubscriber<Screenshot> {

    listenTo() {
        return Screenshot;
    }

    async beforeEntityCreate(entity: Screenshot, em?: MultiOrmEntityManager): Promise<void> {
        try {
            if (!(entity instanceof Screenshot)) {
                return;
            }
            if (em instanceof TypeOrmEntityManager) {
                const options = convertToIDBConnectionOptions(em.connection.options || getConfig().dbConnectionOptions);

                if (isSqliteDB(options) && isJsObject(entity.apps)) {
                    try {
                        entity.apps = JSON.stringify(entity.apps);
                    } catch (error) {
                        entity.apps = JSON.stringify([]);
                    }
                }
            } else if (em instanceof MikroOrmEntityManager) {
                console.log(em.getConnection());
            }
        } catch (error) {
            console.error('ScreenshotSubscriber: An error occurred during the beforeEntityCreate process:', error.message);
        }
    }

    async beforeEntityUpdate(entity: Screenshot, em?: MultiOrmEntityManager): Promise<void> {
        try {
            if (!(entity instanceof Screenshot)) {
                return;
            }
            if (em instanceof TypeOrmEntityManager) {
                const options = convertToIDBConnectionOptions(em.connection.options || getConfig().dbConnectionOptions);

                if (isSqliteDB(options) && isJsObject(entity.apps)) {
                    try {
                        entity.apps = JSON.stringify(entity.apps);
                    } catch (error) {
                        entity.apps = JSON.stringify([]);
                    }
                }
            } else if (em instanceof MikroOrmEntityManager) {
                console.log(em.getConnection());
            }
        } catch (error) {
            console.error('ScreenshotSubscriber: An error occurred during the beforeEntityUpdate process:', error.message);
        }
    }

    async afterEntityLoad(entity: Screenshot, em?: MultiOrmEntityManager): Promise<void> {
        try {
            if (!(entity instanceof Screenshot)) {
                return;
            }
            if (em instanceof TypeOrmEntityManager) {
                const { storageProvider, file, thumb, apps } = entity;
                const store = new FileStorage().setProvider(storageProvider);
                const instance = store.getProviderInstance();

                const [fullUrl, thumbUrl] = await Promise.all([
                    instance.url(file),
                    instance.url(thumb)
                ]);
                entity.fullUrl = fullUrl;
                entity.thumbUrl = thumbUrl;

                const options = convertToIDBConnectionOptions(em.connection.options || getConfig().dbConnectionOptions);

                if (isSqliteDB(options) && typeof apps === 'string') {
                    try {
                        entity.apps = JSON.parse(apps);
                    } catch (error) {
                        console.error('ScreenshotSubscriber: JSON parse error during the afterEntityLoad process:', error);
                        entity.apps = [];
                    }
                }
            } else if (em instanceof MikroOrmEntityManager) {
                console.log(em.getConnection());
            }
        } catch (error) {
            console.error('ScreenshotSubscriber: An error occurred during the afterEntityLoad process:', error.message);
        }
    }

    async afterEntityDelete(entity: Screenshot): Promise<void> {
        try {
            if (!(entity instanceof Screenshot)) {
                return;
            }
            const { id: entityId, storageProvider, file, thumb } = entity;

            console.log(`BEFORE SCREENSHOT ENTITY WITH ID ${entityId} REMOVED`);

            const instance = new FileStorage().setProvider(storageProvider).getProviderInstance();

            await Promise.all([
                file && instance.deleteFile(file),
                thumb && instance.deleteFile(thumb)
            ]);
        } catch (error) {
            console.error(`ScreenshotSubscriber: Error deleting files for entity ID ${entity?.id}:`, error.message);
        }
    }
}
