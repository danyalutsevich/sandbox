"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmBaseEntityRepository = void 0;
const knex_1 = require("@mikro-orm/knex");
class MikroOrmBaseEntityRepository extends knex_1.EntityRepository {
    /**
     * Persists the given entity or array of entities in the database.
     * This method schedules the entities for insertion into the database but does not execute
     * the database operation immediately. It returns the EntityManager instance for further chaining.
     *
     * @param entity - The entity or array of entities to persist.
     * @returns The EntityManager instance.
     */
    persist(entity) {
        return this.em.persist(entity);
    }
    /**
     * Persists the given entity or array of entities in the database and immediately
     * executes the database operation to insert them. This method is asynchronous.
     *
     * @param entity - The entity or array of entities to persist and flush.
     */
    async persistAndFlush(entity) {
        await this.em.persistAndFlush(entity);
    }
    /**
     * Schedules the given entity for removal from the database.
     * Similar to 'persist', this method does not immediately execute the removal operation.
     * It returns the EntityManager instance for further operations or chaining.
     *
     * @param entity - The entity to remove.
     * @returns The EntityManager instance.
     */
    remove(entity) {
        return this.em.remove(entity);
    }
    /**
     * Schedules the given entity for removal and immediately executes the database operation
     * to remove it. This method is asynchronous, ensuring the entity is removed
     * from the database once the promise resolves.
     *
     * @param entity - The entity to remove and flush.
     */
    async removeAndFlush(entity) {
        await this.em.removeAndFlush(entity);
    }
    /**
     * Executes all scheduled database operations like insertions, updates, and deletions
     * that are queued in the EntityManager. This method is asynchronous and ensures
     * that all changes are persisted in the database once the promise resolves.
     */
    async flush() {
        return this.em.flush();
    }
}
exports.MikroOrmBaseEntityRepository = MikroOrmBaseEntityRepository;
//# sourceMappingURL=mikro-orm-base-entity.repository.js.map