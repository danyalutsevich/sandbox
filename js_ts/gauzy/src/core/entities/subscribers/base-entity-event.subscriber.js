"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntityEventSubscriber = void 0;
const entity_event_subsciber_1 = require("./entity-event.subsciber");
/**
 * An abstract class that provides a base implementation for IEntityEventSubscriber.
 * This class can be extended to create specific event subscribers for different entities.
 */
class BaseEntityEventSubscriber extends entity_event_subsciber_1.EntityEventSubscriber {
    /**
     * An optional method that can be implemented by subclasses.
     * It should return either a constructor function (a class) or a string
     * representing the name of the entity to which this subscriber will listen.
     * The default implementation returns undefined.
     *
     * @returns {Function | string | undefined} The entity class or its name, or undefined.
     */
    listenTo() {
        return;
    }
    /**
     * Returns the array of entities this subscriber is subscribed to.
     * If listenTo is not defined, it returns an empty array.
     *
     * @returns {EntityName<Entity>[]} An array containing the entities to which this subscriber listens.
     */
    getSubscribedEntities() {
        if (this.listenTo()) {
            return [this.listenTo()];
        }
        return [];
    }
    /**
     * Called before a new entity is persisted. Override in subclasses to define custom pre-creation logic.
     *
     * @param entity The entity that is about to be created.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    async beforeEntityCreate(entity, em) {
        // Default empty implementation
    }
    /**
     * Invoked before an entity update. Use in subclasses for specific update preparation.
     *
     * @param entity The entity being updated.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    async beforeEntityUpdate(entity, em) {
        // Default empty implementation
    }
    /**
     * Invoked after an entity update. Use in subclasses for specific update preparation.
     *
     * @param entity The entity being updated.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    async afterEntityUpdate(entity, em) {
        // Default empty implementation
    }
    /**
     * Executed after an entity is created. Subclasses can override for post-creation actions.
     *
     * @param entity The newly created entity.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    async afterEntityCreate(entity, em) {
        // Default empty implementation
    }
    /**
     * Called following the loading of an entity. Ideal for post-load processing in subclasses.
     *
     * @param entity The entity that was loaded.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    async afterEntityLoad(entity, em) {
        // Default empty implementation
    }
    /**
     * Called following the deletion of an entity. Ideal for post-deletion processing in subclasses.
     *
     * @param entity The entity that was deleted.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    async afterEntityDelete(entity, em) {
        // Default empty implementation
    }
}
exports.BaseEntityEventSubscriber = BaseEntityEventSubscriber;
//# sourceMappingURL=base-entity-event.subscriber.js.map