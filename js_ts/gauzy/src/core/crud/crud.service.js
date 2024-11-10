"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// Original license: MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Original copyright: Copyright (c) 2018 Sumanth Chinthagunta
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const internal_1 = require("../entities/internal");
const query_builder_factory_1 = require("../../core/orm/query-builder/query-builder.factory");
const utils_1 = require("./../../core/utils");
const utils_2 = require("./utils");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
class CrudService {
    typeOrmRepository;
    mikroOrmRepository;
    constructor(typeOrmRepository, mikroOrmRepository) {
        this.typeOrmRepository = typeOrmRepository;
        this.mikroOrmRepository = mikroOrmRepository;
    }
    /**
     * Get the table name from the repository metadata.
     * @returns {string} The table name.
     */
    get tableName() {
        return this.typeOrmRepository.metadata.tableName;
    }
    /**
     * Get the ORM type.
     * @returns {MultiORM} The ORM type.
     */
    get ormType() {
        return ormType;
    }
    /**
     * Creates an ORM-specific query builder for the repository, supporting MikroORM and TypeORM.
     *
     * @param alias - Optional alias for the primary table in the query.
     * @returns An `IQueryBuilder<T>` instance suitable for the repository's ORM type.
     * @throws Error if the ORM type is not implemented.
     */
    createQueryBuilder(alias) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                return (0, query_builder_factory_1.multiORMCreateQueryBuilder)(this.mikroOrmRepository, this.ormType, alias);
            case utils_1.MultiORMEnum.TypeORM:
                return (0, query_builder_factory_1.multiORMCreateQueryBuilder)(this.typeOrmRepository, this.ormType, alias);
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Count the number of entities based on the provided options.
     *
     * @param options - Options for counting entities.
     * @returns A Promise that resolves to the count of entities.
     */
    async count(options) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                return await this.mikroOrmRepository.count(where, mikroOptions);
            case utils_1.MultiORMEnum.TypeORM:
                const typeormOptions = (0, utils_2.parseTypeORMFindCountOptions)(options);
                return await this.typeOrmRepository.count(typeormOptions);
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Counts entities that match given options.
     * Useful for pagination.
     *
     * @param options
     * @returns
     */
    async countBy(options) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({ where: options });
                return await this.mikroOrmRepository.count(where, mikroOptions);
            case utils_1.MultiORMEnum.TypeORM:
                const typeormOptions = (0, utils_2.parseTypeORMFindCountOptions)({ where: options });
                return await this.typeOrmRepository.count(typeormOptions);
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        let total;
        let items;
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                [items, total] = await this.mikroOrmRepository.findAndCount(where, mikroOptions);
                items = items.map((entity) => this.serialize(entity));
                break;
            case utils_1.MultiORMEnum.TypeORM:
                [items, total] = await this.typeOrmRepository.findAndCount(options);
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        return { items, total };
    }
    /**
     * Finds entities that match given find options.
     *
     * @param options
     * @returns
     */
    async find(options) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                const items = await this.mikroOrmRepository.find(where, mikroOptions);
                return items.map((entity) => this.serialize(entity));
            case utils_1.MultiORMEnum.TypeORM:
                return await this.typeOrmRepository.find(options);
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Finds entities that match given find options.
     * Also counts all entities that match given conditions,
     * But includes pagination settings
     *
     * @param options
     * @returns
     */
    async paginate(options) {
        try {
            let total;
            let items;
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    [items, total] = await this.mikroOrmRepository.findAndCount(where, mikroOptions);
                    items = items.map((entity) => this.serialize(entity));
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    [items, total] = await this.typeOrmRepository.findAndCount({
                        skip: options && options.skip ? options.take * (options.skip - 1) : 0,
                        take: options && options.take ? options.take : 10,
                        /**
                         * Specifies what relations should be loaded.
                         *
                         * @deprecated
                         */
                        ...(options && options.join ? { join: options.join } : {}),
                        ...(options && options.select ? { select: options.select } : {}),
                        ...(options && options.relations ? { relations: options.relations } : {}),
                        ...(options && options.where ? { where: options.where } : {}),
                        ...(options && options.order ? { order: options.order } : {})
                    });
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            return { items, total };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error);
        }
    }
    /*
    |--------------------------------------------------------------------------
    | @FindOneOrFail
    |--------------------------------------------------------------------------
    */
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with error.
     *
     * @param id
     * @param options
     * @returns
     */
    async findOneOrFailByIdString(id, options) {
        try {
            let record;
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    record = await this.mikroOrmRepository.findOneOrFail((0, utils_1.concatIdToWhere)(id, where), mikroOptions);
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    options = options;
                    record = await this.typeOrmRepository.findOneOrFail({
                        where: {
                            id,
                            ...(options && options.where ? options.where : {})
                        },
                        ...(options && options.select ? { select: options.select } : {}),
                        ...(options && options.relations ? { relations: options.relations } : []),
                        ...(options && options.order ? { order: options.order } : {})
                    });
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            return {
                success: true,
                record: this.serialize(record)
            };
        }
        catch (error) {
            return {
                success: false,
                error
            };
        }
    }
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    async findOneOrFailByOptions(options) {
        try {
            let record;
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    record = await this.mikroOrmRepository.findOneOrFail(where, mikroOptions);
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    record = await this.typeOrmRepository.findOneOrFail(options);
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            return {
                success: true,
                record: this.serialize(record)
            };
        }
        catch (error) {
            return {
                success: false,
                error
            };
        }
    }
    /**
     * Finds first entity that matches given where condition.
     * If entity was not found in the database - rejects with error.
     *
     * @param options
     * @returns
     */
    async findOneOrFailByWhereOptions(options) {
        try {
            let record;
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    record = await this.mikroOrmRepository.findOneOrFail(where, mikroOptions);
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    record = await this.typeOrmRepository.findOneByOrFail(options);
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            return {
                success: true,
                record: this.serialize(record)
            };
        }
        catch (error) {
            return {
                success: false,
                error
            };
        }
    }
    /*
    |--------------------------------------------------------------------------
    | @FindOne
    |--------------------------------------------------------------------------
    */
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - returns null.
     *
     * @param id {string}
     * @param options
     * @returns
     */
    async findOneByIdString(id, options) {
        let record;
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                record = await this.mikroOrmRepository.findOne((0, utils_1.concatIdToWhere)(id, where), mikroOptions);
                break;
            case utils_1.MultiORMEnum.TypeORM:
                options = options;
                record = await this.typeOrmRepository.findOne({
                    where: {
                        id,
                        ...(options && options.where ? options.where : {})
                    },
                    ...(options && options.select ? { select: options.select } : {}),
                    ...(options && options.relations ? { relations: options.relations } : []),
                    ...(options && options.order ? { order: options.order } : {}),
                    ...(options && options.withDeleted ? { withDeleted: options.withDeleted } : {}),
                });
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        if (!record) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
        return this.serialize(record);
    }
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    async findOneByOptions(options) {
        let record;
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                record = await this.mikroOrmRepository.findOne(where, mikroOptions);
                break;
            case utils_1.MultiORMEnum.TypeORM:
                record = await this.typeOrmRepository.findOne(options);
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        if (!record) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
        return this.serialize(record);
    }
    /**
     * Finds first entity that matches given where condition.
     * If entity was not found in the database - returns null.
     *
     * @param options
     * @returns
     */
    async findOneByWhereOptions(options) {
        let record;
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({ where: options });
                record = await this.mikroOrmRepository.findOne(where, mikroOptions);
                break;
            case utils_1.MultiORMEnum.TypeORM:
                record = await this.typeOrmRepository.findOneBy(options);
                break;
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
        if (!record) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
        return this.serialize(record);
    }
    /**
     * Creates a new entity or updates an existing one based on the provided entity data.
     *
     * @param entity The partial entity data for creation or update.
     * @param createOptions Options for the creation of the entity in MikroORM.
     * @param upsertOptions Options for the upsert operation in MikroORM.
     * @returns The created or updated entity.
     */
    async create(partialEntity, createOptions = {
        /** This option disables the strict typing which requires all mandatory properties to have value, it has no effect on runtime */
        partial: true,
        /** Creates a managed entity instance instead, bypassing the constructor call */
        managed: true
    }, assignOptions = {
        updateNestedEntities: false,
        onlyOwnProperties: true
    }) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    try {
                        if (partialEntity['id']) {
                            // Try to load the existing entity
                            const entity = await this.mikroOrmRepository.findOne(partialEntity['id']);
                            if (entity) {
                                // If the entity has an ID, perform an upsert operation
                                this.mikroOrmRepository.assign(entity, partialEntity, assignOptions);
                                await this.mikroOrmRepository.flush();
                                return this.serialize(entity);
                            }
                        }
                        // If the entity doesn't have an ID, it's new and should be persisted
                        // Create a new entity using MikroORM
                        const newEntity = this.mikroOrmRepository.create(partialEntity, createOptions);
                        // Persist new entity and flush
                        await this.mikroOrmRepository.persistAndFlush(newEntity); // This will also persist the relations
                        return this.serialize(newEntity);
                    }
                    catch (error) {
                        console.error('Error during mikro orm create crud transaction:', error);
                    }
                case utils_1.MultiORMEnum.TypeORM:
                    const newEntity = this.typeOrmRepository.create(partialEntity);
                    return await this.typeOrmRepository.save(newEntity);
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        }
        catch (error) {
            console.error('Error in crud service create method:', error);
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     *
     * @param entity
     * @returns
     */
    async save(entity) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    return await this.mikroOrmRepository.upsert(entity);
                case utils_1.MultiORMEnum.TypeORM:
                    return await this.typeOrmRepository.save(entity);
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        }
        catch (error) {
            console.error('Error in crud service save method:', error);
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     *
     * @param id
     * @param partialEntity
     * @returns
     */
    async update(id, partialEntity) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    let where;
                    if (typeof id === 'string') {
                        where = { id };
                    }
                    else {
                        where = id;
                    }
                    const row = partialEntity;
                    const updatedRow = await this.mikroOrmRepository.nativeUpdate(where, row);
                    return { affected: updatedRow };
                case utils_1.MultiORMEnum.TypeORM:
                    return await this.typeOrmRepository.update(id, partialEntity);
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Deletes a record based on the given criteria.
     * Criteria can be an ID (string or number) or a complex object with conditions.
     * Supports multiple ORM types, and throws if the ORM type is unsupported.
     *
     * @param criteria - Identifier or condition to delete specific record(s).
     * @returns {Promise<DeleteResult>} - Result indicating the number of affected records.
     */
    async delete(criteria) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    // Determine the appropriate filter for MikroORM based on the criteria type
                    let filter;
                    if (typeof criteria === 'object') {
                        filter = criteria;
                    }
                    else {
                        filter = { id: criteria };
                    }
                    // Convert the filter to MikroORM-specific where and options
                    let { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({ where: filter });
                    // Execute delete operation with MikroORM
                    const affected = await this.mikroOrmRepository.nativeDelete(where, mikroOptions);
                    return { affected };
                case utils_1.MultiORMEnum.TypeORM:
                    return await this.typeOrmRepository.delete(criteria);
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
        }
        catch (error) {
            throw new common_1.NotFoundException(`The record was not found`, error);
        }
    }
    /**
     * Softly deletes entities by a given criteria.
     * This method sets a flag or timestamp indicating the entity is considered deleted.
     * It does not actually remove the entity from the database, allowing for recovery or audit purposes.
     *
     * @param criteria - Entity ID or condition to identify which entities to soft-delete.
     * @param options - Additional options for the operation.
     * @returns {Promise<UpdateResult | DeleteResult>} - Result indicating success or failure.
     */
    async softDelete(criteria) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    // Determine the appropriate filter for MikroORM based on the criteria type
                    let filter;
                    if (typeof criteria === 'object') {
                        filter = criteria;
                    }
                    else {
                        filter = { id: criteria };
                    }
                    // Convert the filter to MikroORM-specific where and options
                    let { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({ where: filter });
                    // Find the entity and perform soft delete
                    const entity = await this.mikroOrmRepository.findOne(where, mikroOptions);
                    await this.mikroOrmRepository.removeAndFlush(entity);
                    // Return the serialized version of the soft-deleted entity
                    return this.serialize(entity);
                case utils_1.MultiORMEnum.TypeORM:
                    // Perform soft delete using TypeORM
                    return await this.typeOrmRepository.softDelete(criteria);
                default:
                    throw new Error(`Soft delete not implemented for ORM type: ${this.ormType}`);
            }
        }
        catch (error) {
            throw new common_1.NotFoundException(`The record was not found or could not be soft-deleted`, error);
        }
    }
    /**
     * Softly removes an entity from the database.
     *
     * This method handles soft removal of a given entity using different ORM strategies, based on the configured ORM type.
     * - For MikroORM, it uses the `removeAndFlush` method to ensure that the soft deletion is properly persisted.
     * - For TypeORM, it utilizes the `softRemove` method to perform a soft deletion.
     * If the ORM type is not supported, an error is thrown.
     *
     * @param id - The unique identifier of the entity to be softly removed.
     * @param options - Optional parameters for finding the entity (commonly used with TypeORM).
     * @param saveOptions - Additional save options for the ORM operation (specific to TypeORM).
     * @returns A promise that resolves to the softly removed entity.
     */
    async softRemove(id, options, saveOptions) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM: {
                    // Convert the filter to MikroORM-specific where and options
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    const entity = await this.mikroOrmRepository.findOne((0, utils_1.concatIdToWhere)(id, where), mikroOptions);
                    // Use "em.remove" for MikroORM with a transactional approach to ensure changes are persisted properly
                    await this.mikroOrmRepository.removeAndFlush(entity);
                    // Return the serialized version of the soft-deleted entity
                    return this.serialize(entity);
                }
                case utils_1.MultiORMEnum.TypeORM: {
                    // Ensure the employee exists before attempting soft deletion
                    const entity = await this.findOneByIdString(id, options);
                    // TypeORM soft removes entities via its repository
                    return await this.typeOrmRepository.softRemove(entity, saveOptions);
                }
                default:
                    throw new Error(`Unsupported database type: ${this.ormType}`);
            }
        }
        catch (error) {
            // If any error occurs, rethrow it as a NotFoundException with additional context.
            throw new common_1.NotFoundException(`An error occurred during soft removal: ${error.message}`, error);
        }
    }
    /**
     * Soft-recover a previously soft-deleted entity.
     *
     * Depending on the ORM, this method restores a soft-deleted entity by resetting its deletion indicator.
     *
     * @param entity - The soft-deleted entity to recover.
     * @param options - Optional settings for database save operations.
     * @returns A promise that resolves with the recovered entity.
     */
    async softRecover(id, options, saveOptions) {
        try {
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM: {
                    // Convert the filter to MikroORM-specific where and options
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    // Find the soft-deleted entity with relations
                    const entity = await this.mikroOrmRepository.findOne((0, utils_1.concatIdToWhere)(id, where), mikroOptions);
                    // Reset the soft-delete flag to "recover" the entity
                    (0, core_1.wrap)(entity).assign({ deletedAt: null });
                    // Ensure related entities are recovered based on the input object
                    await this.ensureRelatedEntitiesRecovered(entity, mikroOptions.populate, this.mikroOrmRepository);
                    // Persist all changes to ensure recovery is complete
                    await this.mikroOrmRepository.persistAndFlush(entity);
                    // Return the restored entity, serialized if needed
                    return this.serialize(entity);
                }
                case utils_1.MultiORMEnum.TypeORM: {
                    // Ensure the entity exists before attempting soft recover
                    const entity = await this.findOneByIdString(id, options);
                    // Use TypeORM's recover method to restore the entity
                    return await this.typeOrmRepository.recover(entity, saveOptions);
                }
                default:
                    throw new Error(`Unsupported database type: ${this.ormType}`);
            }
        }
        catch (error) {
            // If any error occurs, rethrow it as a NotFoundException with additional context.
            throw new common_1.NotFoundException(`An error occurred during restoring entity: ${error.message}`);
        }
    }
    /**
     * Ensure related entities are recovered based on the input object and populate options.
     *
     * @param entity - The main entity to which the relations belong.
     * @param mikroOptionsPopulate - Array of relation names to populate and recover.
     * @param repository - The repository used for persistence.
     */
    async ensureRelatedEntitiesRecovered(entity, mikroOptionsPopulate, repository) {
        // Loop through the relations to ensure soft-deleted entities are recovered
        await Promise.all(mikroOptionsPopulate.map(async (populate) => {
            const relation = entity[populate];
            if (relation) {
                if (relation instanceof core_1.Collection) {
                    // If it's a collection, recover soft-deleted entities within it
                    await this.recoverCollections(relation, repository);
                }
                else {
                    // If it's a single relation, recover it directly
                    (0, core_1.wrap)(relation).assign({ deletedAt: null });
                }
            }
        }));
        // Persist the changes to ensure recovery is saved to the database
        await repository.persistAndFlush(entity);
    }
    /**
     * Recovers soft-deleted entities within a given MikroORM collection
     * and persists the changes to the database.
     *
     * @param collection - The MikroORM collection to process.
     * @param repository - The repository used to persist changes to the database.
     * @returns The original collection with soft-deleted entities recovered, or undefined if the collection is not initialized.
     */
    async recoverCollections(collection, repository) {
        // Return early if the collection is not initialized
        if (!collection.isInitialized()) {
            return;
        }
        // Loop through the collection and recover soft-deleted entities
        collection.map((item) => {
            if (item instanceof internal_1.SoftDeletableBaseEntity) {
                // If the entity is soft-deleted, reset the 'deletedAt' field to recover it
                (0, core_1.wrap)(item).assign({ deletedAt: null });
            }
        });
        // Persist the changes to the database
        if (repository) {
            await repository.persistAndFlush(collection);
        }
        // Return the collection with recovered entities
        return collection;
    }
    /**
     * Serializes the provided entity based on the ORM type.
     * @param entity The entity to be serialized.
     * @returns The serialized entity.
     */
    serialize(entity) {
        if (this.ormType === utils_1.MultiORMEnum.MikroORM) {
            // If using MikroORM, use wrap(entity).toJSON() for serialization
            return (0, core_1.wrap)(entity).toJSON();
        }
        // If using other ORM types, return the entity as is
        return entity;
    }
}
exports.CrudService = CrudService;
//# sourceMappingURL=crud.service.js.map