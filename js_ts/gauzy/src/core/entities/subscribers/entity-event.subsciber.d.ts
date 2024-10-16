import { EventArgs, EventSubscriber as MikroEntitySubscriberInterface } from '@mikro-orm/core';
import { InsertEvent, LoadEvent, RemoveEvent, EntitySubscriberInterface as TypeOrmEntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { MultiOrmEntityManager } from './entity-event-subscriber.types';
/**
 * Implements event handling for entity creation.
 * This class should be extended or integrated into your ORM event subscriber.
 */
export declare abstract class EntityEventSubscriber<Entity> implements MikroEntitySubscriberInterface<Entity>, TypeOrmEntitySubscriberInterface<Entity> {
    /**
     * Invoked when an entity is loaded in TypeORM.
     *
     * @param entity The loaded entity.
     * @param event The load event details, if available.
     * @returns {void | Promise<any>} Can perform asynchronous operations.
     */
    afterLoad(entity: Entity, event?: LoadEvent<Entity>): Promise<void>;
    /**
     * Invoked when an entity is loaded in MikroORM.
     *
     * @param args The event arguments provided by MikroORM.
     * @returns {void | Promise<void>} Can perform asynchronous operations.
     */
    onLoad(args: EventArgs<Entity>): Promise<void>;
    /**
     * Abstract method for processing after an entity is loaded. Implement in subclasses for custom behavior.
     *
     * @param entity The entity that has been loaded.
     * @param em The EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    protected abstract afterEntityLoad(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Handles the event before an entity is created in MikroORM.
     *
     * @param args The event arguments provided by MikroORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    beforeCreate(args: EventArgs<Entity>): Promise<void>;
    /**
     * Handles the event before an entity is inserted in TypeORM.
     *
     * @param event The insert event provided by TypeORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    beforeInsert(event: InsertEvent<Entity>): Promise<void>;
    /**
     * Abstract method for pre-creation logic of an entity. Implement in subclasses for custom actions.
     *
     * @param entity The entity that is about to be updated.
     * @param em The EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    protected abstract beforeEntityCreate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Handles the event after an entity has been created in MikroORM.
     *
     * @param args - The event arguments provided by MikroORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    afterCreate(args: EventArgs<Entity>): Promise<void>;
    /**
     * Handles the event after an entity has been inserted in TypeORM.
     *
     * @param event - The insert event provided by TypeORM.
     * @returns {Promise<void>} - Can perform asynchronous operations.
     */
    afterInsert(event: InsertEvent<Entity>): Promise<void>;
    /**
     * Abstract method for post-creation actions on an entity. Override in subclasses to define behavior.
     *
     * @param entity The entity that is about to be created.
     * @param em The EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    protected abstract afterEntityCreate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Handles the 'before update' event for both MikroORM and TypeORM entities. It determines the
     * type of ORM being used and appropriately casts the event to either EventArgs<Entity> or UpdateEvent<Entity>.
     *
     * @param event The event object which can be either EventArgs<Entity> from MikroORM or UpdateEvent<Entity> from TypeORM.
     * @returns {Promise<void>} A promise that resolves when the pre-update process is complete. Any errors during processing are caught and logged.
     */
    beforeUpdate(event: EventArgs<Entity> | UpdateEvent<Entity>): Promise<void>;
    /**
     * Abstract method for actions before updating an entity. Override in subclasses for specific logic.
     *
     * @param entity The entity that is about to be updated.
     * @param em The EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    protected abstract beforeEntityUpdate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Handles the 'after update' event for both MikroORM and TypeORM entities. It determines the
     * type of ORM being used and appropriately casts the event to either EventArgs<Entity> or UpdateEvent<Entity>.
     *
     * @param event
     * @returns {Promise<void>} A promise that resolves when the post-update process is complete. Any errors during processing are caught and logged.
     */
    afterUpdate(event: EventArgs<Entity> | UpdateEvent<Entity>): Promise<void>;
    /**
     * Abstract method for actions after updating an entity. Override in subclasses for specific logic.
     *
     * @param entity The entity that is about to be updated.
     * @param em The EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    protected abstract afterEntityUpdate(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Invoked when an entity is deleted in MikroORM.
     *
     * @param args The details of the delete event, including the deleted entity.
     * @returns {void | Promise<any>} Can perform asynchronous operations.
     */
    afterDelete(event: EventArgs<Entity>): Promise<void>;
    /**
     * Invoked when an entity is removed in TypeORM.
     *
     * @param event The remove event details, including the removed entity.
     * @returns {Promise<void>} Can perform asynchronous operations.
     */
    afterRemove(event: RemoveEvent<Entity>): Promise<void>;
    /**
     * Abstract method for processing after an entity is deleted. Implement in subclasses for custom behavior.
     *
     * @param entity The entity that has been deleted.
     * @param em The EntityManager, which can be either from TypeORM or MikroORM.
     * @returns {Promise<void>}
     */
    protected abstract afterEntityDelete(entity: Entity, em?: MultiOrmEntityManager): Promise<void>;
}
