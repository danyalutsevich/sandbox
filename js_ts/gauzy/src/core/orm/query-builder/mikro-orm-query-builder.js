"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmQueryBuilder = void 0;
const knex_1 = require("@mikro-orm/knex");
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
class MikroOrmQueryBuilder {
    repository;
    queryAlias;
    qb;
    orderCriteria = {};
    groupByFields = [];
    havingConditions = [];
    havingParameters = [];
    get alias() {
        return this.qb.alias;
    }
    constructor(repository, queryAlias) {
        this.repository = repository;
        this.queryAlias = queryAlias;
        // this.qb = this.repository.qb(queryAlias);
        this.qb = this.repository.createQueryBuilder(queryAlias);
    }
    setQueryBuilder(qb) {
        this.qb = qb;
        return this;
    }
    getQueryBuilder() {
        return this.qb;
    }
    clone() {
        const qb = this.qb.clone();
        const cloneQb = new MikroOrmQueryBuilder(this.repository);
        cloneQb.setQueryBuilder(qb);
        return this;
    }
    subQuery() {
        //  console.log('sq_alisa', this.aliasNo);
        const subQb = new MikroOrmQueryBuilder(this.repository);
        const qb = subQb;
        return qb;
    }
    setFindOptions(findOptions) {
        const { select, where, order, skip, take, relations } = findOptions;
        if (select) {
            this.qb.select(select);
        }
        if (where) {
            this.qb.where(where);
        }
        if (order) {
            const orderBy = Object.entries(order).reduce((acc, [field, direction]) => {
                acc[field] = direction === 'ASC' ? knex_1.QueryOrder.ASC : knex_1.QueryOrder.DESC;
                return acc;
            }, {});
            this.qb.orderBy(orderBy);
        }
        if (relations) {
            this.applyRelationsToQueryBuilder(this.qb, relations);
            //    this.qb.populate(relations as any);
        }
        if (skip) {
            this.qb.offset(skip);
        }
        if (take) {
            this.qb.limit(take);
        }
        return this;
    }
    select(selection, selectionAliasName) {
        if (selectionAliasName) {
            this.qb.select(`${selection} AS ${selectionAliasName}`);
        }
        else {
            this.qb.select(selection);
        }
        return this;
    }
    distinct(isDistinct) {
        this.qb.distinct();
        return this;
    }
    addSelect(selection, selectionAliasName) {
        if (selectionAliasName) {
            this.qb.addSelect(`${selection} AS ${selectionAliasName}`);
        }
        else {
            this.qb.addSelect(selection);
        }
        return this;
    }
    from(entityTarget, aliasName) {
        if (typeof entityTarget === 'function') {
            // Handle subquery function
            const subQueryFunction = entityTarget;
            const subQuery = subQueryFunction(this.subQuery()).getKnexQuery();
            this.qb = this.repository.createQueryBuilder().from(subQuery, aliasName);
        }
        else {
            // Handle direct entity
            this.qb = this.repository.createQueryBuilder(aliasName);
        }
        return this;
    }
    addFrom(_entityTarget, _aliasName) {
        throw new Error(`Note: This is conceptual; MikrORM typically don't support multiple FROMs like typeORM. You might use this for sub-queries or additional joins instead.`);
    }
    innerJoin(propertyPath, alias, condition) {
        this.qb.innerJoin(propertyPath, alias, condition);
        return this;
    }
    innerJoinAndSelect(propertyPath, alias, condition) {
        this.qb.innerJoinAndSelect(propertyPath, alias, condition);
        return this;
    }
    leftJoin(propertyPath, alias, condition) {
        this.qb.leftJoin(propertyPath, alias, condition);
        return this;
    }
    leftJoinAndSelect(propertyPath, alias, condition) {
        this.qb.leftJoinAndSelect(propertyPath, alias, condition);
        return this;
    }
    handleWhereSubQuery(conditionFunction, whereFunction = 'where') {
        let subQuery = this.subQuery();
        let updatedQb = conditionFunction(subQuery);
        if (updatedQb === undefined) {
            updatedQb = subQuery;
        }
        if (typeof updatedQb === 'string') {
            switch (whereFunction) {
                case 'orWhere':
                    this.orWhere(updatedQb);
                    break;
                case 'andWhere':
                    this.andWhere(updatedQb);
                    break;
                default:
                    this.where(updatedQb);
                    break;
            }
        }
        else {
            const sqlQuery = updatedQb.getSql();
            const params = updatedQb.getParameters();
            const whereString = (0, utils_1.getConationFromQuery)(sqlQuery);
            if (whereString) {
                switch (whereFunction) {
                    case 'orWhere':
                        this.orWhere(whereString, params);
                        break;
                    case 'andWhere':
                        this.andWhere(whereString, params);
                        break;
                    default:
                        this.where(whereString, params);
                        break;
                }
            }
        }
    }
    handleWhereBracketsSubQuery(conditionFunction) {
        let subQuery = this.subQuery();
        let updatedQb = conditionFunction.whereFactory(subQuery);
        if (updatedQb === undefined) {
            updatedQb = subQuery;
        }
        const sqlQuery = updatedQb.getSql();
        const params = updatedQb.getParameters();
        const whereString = (0, utils_1.getConationFromQuery)(sqlQuery);
        if (whereString) {
            return [whereString, params];
        }
        else {
            return [];
        }
    }
    where(condition, parameters) {
        if (typeof condition === 'string') {
            const [mikroOrmCondition, mikroOrmParameters] = (0, utils_1.convertTypeOrmConationAndParamsToMikroOrm)(condition, parameters);
            this.qb.where(mikroOrmCondition, mikroOrmParameters);
        }
        else if (typeof condition === 'function') {
            this.handleWhereSubQuery(condition, 'where');
        }
        else if (condition instanceof typeorm_1.Brackets) {
            const [mikroOrmCondition, mikroOrmParameters] = this.handleWhereBracketsSubQuery(condition);
            if (mikroOrmCondition) {
                this.qb.where(mikroOrmCondition, mikroOrmParameters);
            }
        }
        else if (typeof condition === 'object') {
            // Handle object conditions
            this.qb.where(condition);
        }
        return this;
    }
    andWhere(condition, parameters) {
        if (typeof condition === 'string') {
            const [mikroOrmCondition, mikroOrmParameters] = (0, utils_1.convertTypeOrmConationAndParamsToMikroOrm)(condition, parameters);
            this.qb.andWhere(mikroOrmCondition, mikroOrmParameters);
        }
        else if (typeof condition === 'function') {
            this.handleWhereSubQuery(condition, 'andWhere');
        }
        else if (condition instanceof typeorm_1.Brackets) {
            const [mikroOrmCondition, mikroOrmParameters] = this.handleWhereBracketsSubQuery(condition);
            if (mikroOrmCondition) {
                this.qb.andWhere(mikroOrmCondition, mikroOrmParameters);
            }
        }
        else if (typeof condition === 'object') {
            // Handle object conditions
            this.qb.andWhere(condition);
        }
        return this;
    }
    orWhere(condition, parameters) {
        if (typeof condition === 'string') {
            const [mikroOrmCondition, mikroOrmParameters] = (0, utils_1.convertTypeOrmConationAndParamsToMikroOrm)(condition, parameters);
            this.qb.orWhere(mikroOrmCondition, mikroOrmParameters);
        }
        else if (typeof condition === 'function') {
            this.handleWhereSubQuery(condition, 'orWhere');
        }
        else if (condition instanceof typeorm_1.Brackets) {
            const [mikroOrmCondition, mikroOrmParameters] = this.handleWhereBracketsSubQuery(condition);
            if (mikroOrmCondition) {
                this.qb.orWhere(mikroOrmCondition, mikroOrmParameters);
            }
        }
        else if (typeof condition === 'object') {
            // Handle object conditions
            this.qb.orWhere(condition);
        }
        return this;
    }
    having(condition, parameters) {
        this.havingConditions = [condition]; // Reset the having conditions
        if (parameters) {
            this.havingParameters.push(...parameters);
        }
        this.applyHavingConditions();
        return this;
    }
    andHaving(condition, parameters) {
        this.havingConditions.push(condition); // Add to existing having conditions
        if (parameters) {
            this.havingParameters.push(...parameters);
        }
        this.applyHavingConditions();
        return this;
    }
    orHaving(condition, parameters) {
        // Mikro-ORM does not directly support 'orHaving', so we need to handle it manually.
        // We achieve this by wrapping existing conditions in parentheses and adding the new condition with 'OR'.
        if (this.havingConditions.length > 0) {
            const existingConditions = `(${this.havingConditions.join(' AND ')})`;
            this.havingConditions = [existingConditions, `(${condition})`]; // Combine with OR
        }
        else {
            this.havingConditions = [`(${condition})`]; // Just in case orHaving is called first
        }
        if (parameters) {
            this.havingParameters.push(...parameters);
        }
        this.applyHavingConditions();
        return this;
    }
    applyHavingConditions() {
        if (this.havingConditions.length > 0) {
            // Join all having conditions with AND and apply them to the query builder
            const combinedConditions = this.havingConditions.join(' AND ');
            this.qb.having(combinedConditions, ...this.havingParameters);
        }
    }
    groupBy(field) {
        this.groupByFields = [field]; // Reset and set new group by
        this.qb.groupBy(field);
        return this;
    }
    addGroupBy(field) {
        if (!this.groupByFields.includes(field)) {
            this.groupByFields.push(field);
            // Apply all group by fields again
            this.qb.groupBy(this.groupByFields.join(', '));
        }
        return this;
    }
    orderBy(field, order = 'ASC') {
        this.orderCriteria = { [field]: order }; // Reset and set new order criteria
        this.qb.orderBy(this.orderCriteria);
        return this;
    }
    addOrderBy(field, order = 'ASC') {
        this.orderCriteria[field] = order; // Add to existing order criteria
        this.qb.orderBy(this.orderCriteria); // Re-apply all order criteria
        return this;
    }
    limit(limit) {
        this.qb.limit(limit);
        return this;
    }
    offset(offset) {
        this.qb.offset(offset);
        return this;
    }
    take(take) {
        this.qb.limit(take);
        return this;
    }
    skip(skip) {
        this.qb.offset(skip);
        return this;
    }
    getQuery() {
        return this.qb.getQuery();
    }
    getSql() {
        return this.qb.getQuery();
    }
    getParameters() {
        return this.qb.getParams();
    }
    getCount() {
        return this.qb.getCount();
    }
    getRawMany() {
        return this.qb.execute('all', false);
    }
    getMany() {
        return this.qb.execute('all', true);
    }
    getOne() {
        return this.qb.execute('get', true);
    }
    getRawOne() {
        return this.qb.execute('get', false);
    }
    getManyAndCount() {
        return this.qb.getResultAndCount();
    }
    applyRelationsToQueryBuilder(qb, relations) {
        // A set to keep track of joined paths to avoid duplicates
        const joinedPaths = new Set();
        relations.forEach((relationPath) => {
            // Split the path to get individual relations
            const parts = relationPath.split('.');
            let currentPath = '';
            parts.forEach((part, index) => {
                // Build the path incrementally to support nested relations
                currentPath += (index ? '.' : '') + part;
                // Avoid joining the same path more than once
                if (!joinedPaths.has(currentPath)) {
                    const [parentAlias, relation] = index === 0 ? [qb.alias, part] : currentPath.split('.').slice(-2);
                    const alias = currentPath.replace(/\./g, '_'); // Replace dots with underscores to create a unique alias
                    console.log('leftJoinAndSelect', `${parentAlias}.${relation}`, alias);
                    // Apply the join; you might choose between leftJoinAndSelect or innerJoinAndSelect based on your needs
                    qb.leftJoinAndSelect(`${parentAlias}.${relation}`, alias);
                    // Mark this path as joined
                    joinedPaths.add(currentPath);
                }
            });
        });
    }
}
exports.MikroOrmQueryBuilder = MikroOrmQueryBuilder;
//# sourceMappingURL=mikro-orm-query-builder.js.map