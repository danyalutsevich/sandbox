"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiORMCreateQueryBuilder = exports.createQueryBuilder = void 0;
const typeorm_1 = require("typeorm");
const knex_1 = require("@mikro-orm/knex");
const utils_1 = require("../../../core/utils");
const typeorm_query_builder_1 = require("./typeorm-query-builder");
const mikro_orm_query_builder_1 = require("./mikro-orm-query-builder");
/**
 * Creates a query builder for a given repository, supporting both TypeORM and MikroORM.
 *
 * @param repository - A TypeORM `Repository` or a MikroORM `EntityRepository`.
 * @returns A `TypeOrmQueryBuilder` or `MikroOrmQueryBuilder` depending on the repository type.
 * @throws Error if the repository is neither TypeORM nor MikroORM.
 */
function createQueryBuilder(repository, alias) {
    if (repository instanceof typeorm_1.Repository) {
        return new typeorm_query_builder_1.TypeOrmQueryBuilder(repository);
    }
    else if (repository instanceof knex_1.EntityRepository) {
        return new mikro_orm_query_builder_1.MikroOrmQueryBuilder(repository);
    }
    throw new Error('Unsupported repository orm-type');
}
exports.createQueryBuilder = createQueryBuilder;
/**
 * Generates a query builder specific to the chosen ORM type (TypeORM or MikroORM).
 *
 * @param repository - A repository instance, either TypeORM `Repository` or MikroORM `EntityRepository`.
 * @param ormType - Specifies the ORM type using `MultiORMEnum`, defaulting to TypeORM.
 * @returns A query builder (`TypeOrmQueryBuilder` or `MikroOrmQueryBuilder`) based on the specified ORM.
 * @throws Error if an unsupported `ormType` is provided.
 */
function multiORMCreateQueryBuilder(repository, ormType = utils_1.MultiORMEnum.TypeORM, alias) {
    switch (ormType) {
        case utils_1.MultiORMEnum.MikroORM:
            return new mikro_orm_query_builder_1.MikroOrmQueryBuilder(repository, alias);
        case utils_1.MultiORMEnum.TypeORM:
            return new typeorm_query_builder_1.TypeOrmQueryBuilder(repository);
        default:
            throw new Error(`Unsupported orm type "${ormType}"`);
    }
}
exports.multiORMCreateQueryBuilder = multiORMCreateQueryBuilder;
//# sourceMappingURL=query-builder.factory.js.map