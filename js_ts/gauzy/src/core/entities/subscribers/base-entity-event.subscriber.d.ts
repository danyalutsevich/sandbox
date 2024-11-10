import { EntityName } from '@mikro-orm/core';
import { EntityEventSubscriber } from './entity-event.subsciber';
import { IEntityEventSubscriber, MultiOrmEntityManager } from './entity-event-subscriber.types';
/**
 * An abstract class that provides a base implementation for IEntityEventSubscriber.
 * This class can be extended to create specific event subscribers for different entities.
 */
export declare abstract class BaseEntityEventSubscriber<Entity = any> extends EntityEventSubscriber<Entity> implements IEntityEventSubscriber<Entity> {
    /**
     * An optional method that can be implemented by subclasses.
     * It should return either a constructor function (a class) or a string
     * representing the name of the entity to which this subscriber will listen.
     * The default implementation returns undefined.
     *
     * @returns {Function | string | undefined} The entity class or its name, or undefined.
     */
    listenTo(): Function | string | undefined;
    /**
     * Returns the array of entities this subscriber is subscribed to.
     * If listenTo is not defined, it returns an empty array.
     *
     * @returns {EntityName<Entity>[]} An array containing the entities to which this subscriber listens.
     */
    getSubscribedEntities(): EntityName<Entity>[];
    /**
     * Called before a new entity is persisted. Override in subclasses to define custom pre-creation logic.
     *
     * @param entity The entity that is about to be created.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    beforeEntityCreate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Invoked before an entity update. Use in subclasses for specific update preparation.
     *
     * @param entity The entity being updated.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    beforeEntityUpdate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Invoked after an entity update. Use in subclasses for specific update preparation.
     *
     * @param entity The entity being updated.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    afterEntityUpdate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Executed after an entity is created. Subclasses can override for post-creation actions.
     *
     * @param entity The newly created entity.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    afterEntityCreate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called following the loading of an entity. Ideal for post-load processing in subclasses.
     *
     * @param entity The entity that was loaded.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    afterEntityLoad(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called following the deletion of an entity. Ideal for post-deletion processing in subclasses.
     *
     * @param entity The entity that was deleted.
     * @param em The optional EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    afterEntityDelete(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
}
