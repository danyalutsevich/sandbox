"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityEventSubscriber = void 0;
const utils_1 = require("../../../core/utils");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
/**
 * Implements event handling for entity creation.
 * This class should be extended or integrated into your ORM event subscriber.
 */
class EntityEventSubscriber {
    /**
     * Invoked when an entity is loaded in TypeORM.
     *
     * @param entity The loaded entity.
     * @param event The load event details, if available.
     * @returns {void | Promise<any>} Can perform asynchronous operations.
     */
    async afterLoad(entity, event) {
        try {
            if (entity) {
                await this.afterEntityLoad(entity, event.manager);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in afterLoad:", error);
        }
    }
    /**
     * Invoked when an entity is loaded in MikroORM.
     *
     * @param args The event arguments provided by MikroORM.
     * @returns {void | Promise<void>} Can perform asynchronous operations.
     */
    async onLoad(args) {
        try {
            if (args.entity) {
                await this.afterEntityLoad(args.entity, args.em);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in onLoad:", error);
        }
    }
    /**
     * Handles the event before an entity is created in MikroORM.
     *
     * @param args The event arguments provided by MikroORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    async beforeCreate(args) {
        try {
            if (args.entity) {
                await this.beforeEntityCreate(args.entity, args.em);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in beforeCreate:", error);
        }
    }
    /**
     * Handles the event before an entity is inserted in TypeORM.
     *
     * @param event The insert event provided by TypeORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    async beforeInsert(event) {
        try {
            if (event.entity) {
                await this.beforeEntityCreate(event.entity, event.manager);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in beforeInsert:", error);
        }
    }
    /**
     * Handles the event after an entity has been created in MikroORM.
     *
     * @param args - The event arguments provided by MikroORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    async afterCreate(args) {
        try {
            if (args.entity) {
                await this.afterEntityCreate(args.entity, args.em);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in afterCreate:", error);
        }
    }
    /**
     * Handles the event after an entity has been inserted in TypeORM.
     *
     * @param event - The insert event provided by TypeORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    async afterInsert(event) {
        try {
            if (event.entity) {
                await this.afterEntityCreate(event.entity, event.manager);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in afterInsert:", error);
        }
    }
    /**
     * Handles the 'before update' event for both MikroORM and TypeORM entities. It determines the
     * type of ORM being used and appropriately casts the event to either EventArgs<Entity> or UpdateEvent<Entity>.
     *
     * @param event The event object which can be either EventArgs<Entity> from MikroORM or UpdateEvent<Entity> from TypeORM.
     * @returns {Promise<void>} A promise that resolves when the pre-update process is complete. Any errors during processing are caught and logged.
     */
    async beforeUpdate(event) {
        try {
            let entity;
            let entityManager;
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    entity = event.entity;
                    entityManager = event.em;
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    entity = event.entity;
                    entityManager = event.manager;
                    break;
                default:
                    throw new Error(`Unsupported ORM type: ${ormType}`);
            }
            if (entity) {
                await this.beforeEntityUpdate(entity, entityManager);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in beforeUpdate:", error);
        }
    }
    /**
     * Handles the 'after update' event for both MikroORM and TypeORM entities. It determines the
     * type of ORM being used and appropriately casts the event to either EventArgs<Entity> or UpdateEvent<Entity>.
     *
     * @param event
     * @returns {Promise<void>} A promise that resolves when the post-update process is complete. Any errors during processing are caught and logged.
     */
    async afterUpdate(event) {
        try {
            let entity;
            let entityManager;
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    entity = event.entity;
                    entityManager = event.em;
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    entity = event.entity;
                    entityManager = event.manager;
                    break;
                default:
                    throw new Error(`Unsupported ORM type: ${ormType}`);
            }
            if (entity) {
                await this.afterEntityUpdate(entity, entityManager);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in afterUpdate:", error);
        }
    }
    /**
     * Invoked when an entity is deleted in MikroORM.
     *
     * @param args The details of the delete event, including the deleted entity.
     * @returns {void | Promise<any>} Can perform asynchronous operations.
     */
    async afterDelete(event) {
        try {
            if (event.entity) {
                await this.afterEntityDelete(event.entity, event.em);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in afterDelete:", error);
        }
    }
    /**
     * Invoked when an entity is removed in TypeORM.
     *
     * @param event The remove event details, including the removed entity.
     * @returns {Promise<void>} Can perform asynchronous operations.
     */
    async afterRemove(event) {
        try {
            if (event.entity && event.entityId) {
                event.entity['id'] = event.entityId;
                await this.afterEntityDelete(event.entity, event.manager);
            }
        }
        catch (error) {
            console.error("EntityEventSubscriber: Error in afterRemove:", error);
        }
    }
}
exports.EntityEventSubscriber = EntityEventSubscriber;
//# sourceMappingURL=entity-event.subsciber.js.map