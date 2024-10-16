"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmQueryBuilder = void 0;
class TypeOrmQueryBuilder {
    repo;
    qb;
    get alias() {
        return this.qb.alias;
    }
    constructor(repo) {
        this.repo = repo;
        this.qb = this.repo.createQueryBuilder();
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
        const cloneQb = new TypeOrmQueryBuilder(this.repo);
        cloneQb.setQueryBuilder(qb);
        return this;
    }
    subQuery() {
        const subQuery = this.qb.subQuery();
        return subQuery;
    }
    distinct(isDistinct = true) {
        this.qb.distinct(isDistinct);
        return this;
    }
    setFindOptions(findOptions) {
        this.qb.setFindOptions(findOptions);
        return this;
    }
    select(selection, selectionAliasName) {
        this.qb.select(selection, selectionAliasName);
        return this;
    }
    addSelect(selection, selectionAliasName) {
        this.qb.addSelect(selection, selectionAliasName);
        return this;
    }
    from(entityTarget, aliasName) {
        this.qb.from(entityTarget, aliasName);
        return this;
    }
    addFrom(entityTarget, aliasName) {
        this.qb.addFrom(entityTarget, aliasName);
        return this;
    }
    innerJoin(relation, alias, condition) {
        this.qb.innerJoin(relation, alias, condition);
        return this;
    }
    innerJoinAndSelect(relation, alias, condition) {
        this.qb.innerJoinAndSelect(relation, alias, condition);
        return this;
    }
    leftJoin(relation, alias, condition) {
        this.qb.leftJoin(relation, alias, condition);
        return this;
    }
    leftJoinAndSelect(relation, alias, condition) {
        this.qb.leftJoinAndSelect(relation, alias, condition);
        return this;
    }
    where(condition, parameters) {
        this.qb.where(condition, parameters);
        return this;
    }
    andWhere(condition, parameters) {
        this.qb.andWhere(condition, parameters);
        return this;
    }
    orWhere(condition, parameters) {
        this.qb.orWhere(condition, parameters);
        return this;
    }
    having(having, parameters) {
        this.qb.having(having, parameters);
        return this;
    }
    ;
    andHaving(having, parameters) {
        this.qb.andHaving(having, parameters);
        return this;
    }
    ;
    orHaving(having, parameters) {
        this.qb.orHaving(having, parameters);
        return this;
    }
    ;
    groupBy(groupBy) {
        this.qb.groupBy(groupBy);
        return this;
    }
    ;
    addGroupBy(groupBy) {
        this.qb.addGroupBy(groupBy);
        return this;
    }
    ;
    orderBy(sort, order, nulls) {
        this.qb.orderBy(sort, order, nulls);
        return this;
    }
    ;
    addOrderBy(sort, order, nulls) {
        this.qb.addOrderBy(sort, order, nulls);
        return this;
    }
    ;
    limit(limit) {
        this.qb.limit(limit);
        return this;
    }
    ;
    offset(offset) {
        this.qb.offset(offset);
        return this;
    }
    ;
    take(take) {
        this.qb.take(take);
        return this;
    }
    ;
    skip(skip) {
        this.qb.skip(skip);
        return this;
    }
    ;
    getQuery() {
        return this.qb.getQuery();
    }
    getSql() {
        return this.qb.getSql();
    }
    getParameters() {
        return this.qb.getParameters();
    }
    getCount() {
        return this.qb.getCount();
    }
    getMany() {
        return this.qb.getMany();
    }
    getRawMany() {
        return this.qb.getRawMany();
    }
    getOne() {
        return this.qb.getOne();
    }
    getRawOne() {
        return this.qb.getRawOne();
    }
    getManyAndCount() {
        return this.qb.getManyAndCount();
    }
}
exports.TypeOrmQueryBuilder = TypeOrmQueryBuilder;
//# sourceMappingURL=typeorm-query-builder.js.map