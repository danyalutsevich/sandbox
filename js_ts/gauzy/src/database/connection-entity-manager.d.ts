import { DataSource, EntityManager, EntitySchema, ObjectLiteral, ObjectType, Repository } from 'typeorm';
export declare class ConnectionEntityManager {
    private entityManager;
    constructor(entityManager: EntityManager);
    /**
     * Retrieves the raw EntityManager instance.
     *
     * @returns The raw EntityManager instance.
     */
    get rawEntityManager(): EntityManager;
    /**
     * Retrieves the raw connection from the EntityManager.
     *
     * @returns The raw connection from the EntityManager.
     */
    get rawConnection(): DataSource;
    /**
     * Returns a TypeORM repository for the specified target entity.
     *
     * @param target The target entity type or entity schema for which to retrieve the repository.
     * @returns The TypeORM repository for the specified target entity.
     */
    getRepository<Entity extends ObjectLiteral>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity>;
}
