"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusPrioritySizeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const knex_1 = require("knex");
const index_1 = require("../../plugins/common/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const mikro_orm_base_entity_repository_1 = require("../core/repository/mikro-orm-base-entity.repository");
const file_storage_1 = require("../core/file-storage");
const context_1 = require("../core/context");
const crud_1 = require("../core/crud");
const utils_1 = require("../core/utils");
const database_helper_1 = require("./../database/database.helper");
let TaskStatusPrioritySizeService = exports.TaskStatusPrioritySizeService = class TaskStatusPrioritySizeService extends crud_1.TenantAwareCrudService {
    typeOrmBaseEntityRepository;
    mikroOrmBaseEntityRepository;
    knexConnection;
    constructor(typeOrmBaseEntityRepository, mikroOrmBaseEntityRepository, knexConnection) {
        console.log(`TaskStatusPrioritySizeService initialized.`);
        super(typeOrmBaseEntityRepository, mikroOrmBaseEntityRepository);
        this.typeOrmBaseEntityRepository = typeOrmBaseEntityRepository;
        this.mikroOrmBaseEntityRepository = mikroOrmBaseEntityRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * Fetch entities based on specified parameters using Knex.js.
     * @param input - Parameters for finding entities (IFindEntityByParams).
     * @returns A Promise resolving to an object with items and total count.
     */
    async fetchAllByKnex(input) {
        try {
            // Ensure at least one record matches the specified parameters
            const first = await this.getOneOrFailByKnex(input);
            if (!first) {
                console.log(`No entities found matching the specified parameters ${JSON.stringify(input)}`);
                return await this.getDefaultEntitiesByKnex();
            }
            // Perform the Knex query to fetch entities and their count
            const items = await this.getManyAndCountByKnex(input);
            if (items.length > 0) {
                // this call depends on tenant and organization, so we can't make it global
                const store = new file_storage_1.FileStorage().setProvider(index_2.FileStorageProviderEnum.LOCAL);
                const provider = store.getProviderInstance();
                // Fetch fullIconUrl for items with an icon
                await Promise.all(items.map(async (item) => {
                    if (item.icon) {
                        item.fullIconUrl = await provider.url(item.icon);
                    }
                }));
            }
            // Calculate the total count of items
            const total = items.length;
            // Return an object containing the items and total count
            return { items, total };
        }
        catch (error) {
            console.error('Failed to retrieve entities based on the specified parameters', error);
            // If an error occurs during the query, fallback to default entities
            return await this.getDefaultEntitiesByKnex();
        }
    }
    /**
     * Retrieves entities based on the provided parameters.
     *
     * @param params - Parameters for filtering (IFindEntityByParams).
     * @returns A Promise that resolves to an object conforming to the IPagination interface.
     */
    async fetchAll(params) {
        try {
            // Destructures the organizationId, projectId, and organizationTeamId from the provided parameters.
            const { organizationId, projectId, organizationTeamId } = params;
            // Convert the where clause to FindManyOptions<BaseEntity>
            const options = {
                // Construct the where clause based on parameters
                where: {
                    tenantId: (0, index_1.isNotEmpty)(params.tenantId) ? (context_1.RequestContext.currentTenantId() || params.tenantId) : (0, typeorm_1.IsNull)(),
                    organizationId: (0, index_1.isNotEmpty)(organizationId) ? organizationId : (0, typeorm_1.IsNull)(),
                    projectId: (0, index_1.isNotEmpty)(projectId) ? projectId : (0, typeorm_1.IsNull)(),
                    organizationTeamId: (0, index_1.isNotEmpty)(organizationTeamId) ? organizationTeamId : (0, typeorm_1.IsNull)(),
                }
            };
            // Initialize variables to store the retrieved items and total count.
            let items; // Array to store retrieved items
            let total; // Variable to store total count of items
            // Determine the ORM type and execute the appropriate logic accordingly.
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    // Parse the where clause for MikroORM
                    const mikroOrmOptions = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    // Retrieve entities and their count
                    [items, total] = await this.mikroOrmRepository.findAndCount(mikroOrmOptions.where);
                    // Optionally serialize the items
                    items = items.map((item) => this.serialize(item));
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    // Retrieve entities and their count
                    [items, total] = await this.typeOrmRepository.findAndCount(options);
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            // If no entities are found, fallback to default entities
            if (total === 0) {
                return await this.getDefaultEntities();
            }
            return { items, total };
        }
        catch (error) {
            console.log(`No entities found matching the specified parameters ${JSON.stringify(params)} for ${this.ormType}: `, error?.message);
            // If an error occurs during the retrieval, fallback to default entities
            return await this.getDefaultEntities();
        }
    }
    /**
     * Retrieves default entities based on certain criteria.
     * @returns A promise resolving to an object containing items and total count.
     */
    async getDefaultEntities() {
        try {
            // Convert the where clause to FindManyOptions<FindEntityByParams>
            const options = {
                // Construct the where clause based on parameters
                where: {
                    tenantId: (0, typeorm_1.IsNull)(),
                    organizationId: (0, typeorm_1.IsNull)(),
                    projectId: (0, typeorm_1.IsNull)(),
                    organizationTeamId: (0, typeorm_1.IsNull)(),
                    isSystem: true
                }
            };
            // Initialize variables to store the retrieved items and total count.
            let items; // Array to store retrieved items
            let total; // Variable to store total count of items
            switch (this.ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    // Parse the where clause for MikroORM
                    const { where } = (0, utils_1.parseTypeORMFindToMikroOrm)(options);
                    // Retrieve entities and their count
                    [items, total] = await this.mikroOrmRepository.findAndCount(where);
                    // Optionally serialize the items
                    items = items.map((item) => this.serialize(item));
                    break;
                case utils_1.MultiORMEnum.TypeORM:
                    // Retrieve entities and their count
                    [items, total] = await this.typeOrmRepository.findAndCount(options);
                    break;
                default:
                    throw new Error(`Not implemented for ${this.ormType}`);
            }
            return { items, total };
        }
        catch (error) {
            console.error(`Error while getting base entities by ${this.ormType}`, error);
        }
    }
    /**
     * GET status filter query
     *
     * @param query
     * @param request
     * @returns
     */
    getFilterQuery(query, request) {
        const { organizationId, projectId, organizationTeamId } = request;
        /**
         * GET by tenant level
         */
        if ((0, index_1.isNotEmpty)(request.tenantId)) {
            const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
        }
        else {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" IS NULL`));
        }
        /**
         * GET by organization level
         */
        if ((0, index_1.isNotEmpty)(organizationId)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        }
        else {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" IS NULL`));
        }
        /**
         * GET by project level
         */
        if ((0, index_1.isNotEmpty)(projectId)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" = :projectId`), { projectId });
        }
        else {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IS NULL`));
        }
        /**
         * GET by team level
         */
        if ((0, index_1.isNotEmpty)(organizationTeamId)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationTeamId" = :organizationTeamId`), { organizationTeamId });
        }
        else {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationTeamId" IS NULL`));
        }
        return query;
    }
    /**
     * Creates a Knex query builder for a specific table.
     * @param knex - Knex connection instance.
     * @returns A Knex query builder for the specified table.
     */
    createKnexQueryBuilder(knex) {
        // Create and return a Knex query builder for the specified table
        return knex(this.tableName);
    }
    /**
     * Retrieves a single entity or fails if none is found using a Knex query.
     * @param knex - Knex connection instance.
     * @param request - Request parameters for filtering (IFindEntityByParams).
     * @returns A Promise that resolves to the first entity or rejects if none is found.
     */
    async getOneOrFailByKnex(request) {
        // Create a Knex query builder
        return await this.createKnexQueryBuilder(this.knexConnection)
            .modify((qb) => {
            // Apply filters based on request parameters
            this.getFilterQueryByKnex(qb, request);
            // Log the generated SQL query (for debugging purposes)
            console.log('Get One Or Fail By Knex', qb.toQuery());
        })
            .first(); // Retrieve the first result or undefined
    }
    /**
     * Retrieves entities and their count using a Knex query.
     * @param knex - Knex connection instance.
     * @param request - Request parameters for filtering (IFindEntityByParams).
     * @returns A Knex query builder with applied filters.
     */
    async getManyAndCountByKnex(request) {
        // Create a Knex query builder
        return await this.createKnexQueryBuilder(this.knexConnection).modify((qb) => {
            // Apply filters based on request parameters
            this.getFilterQueryByKnex(qb, request);
            // Log the generated SQL query (for debugging purposes)
            console.log('Get Many And Count By Knex', qb.toQuery());
        });
    }
    /**
     * Retrieves default entities using a Knex query.
     * @returns A Promise that resolves to an object conforming to the IPagination interface.
     */
    async getDefaultEntitiesByKnex() {
        // Create a Knex query builder
        const query = this.createKnexQueryBuilder(this.knexConnection);
        // Modify the query to filter default entities
        const items = await query.modify((qb) => {
            // Filter by isSystem property being true
            qb.where('isSystem', true);
            // Filter by null values for tenantId, organizationId, projectId, and organizationTeamId
            qb.whereNull('tenantId');
            qb.whereNull('organizationId');
            qb.whereNull('projectId');
            qb.whereNull('organizationTeamId');
        });
        // Calculate the total number of items retrieved from the query result
        const total = items.length;
        // Return an object containing the items and the total count, conforming to the IPagination interface
        return { items, total };
    }
    /**
     * Builds a filter query for a Knex query builder based on the provided parameters.
     * @param qb - Knex query builder.
     * @param request - Request parameters for filtering (IFindEntityByParams).
     */
    getFilterQueryByKnex(qb, request) {
        // Destructure request parameters
        const { organizationId, projectId, organizationTeamId } = request;
        // Obtain the current tenant ID from the RequestContext or fallback to the tenantId from the request
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        /**
         * GET by tenant level
         */
        if ((0, index_1.isNotEmpty)(tenantId)) {
            qb.where('tenantId', tenantId);
        }
        else {
            qb.whereNull('tenantId');
        }
        /**
         * GET by organization level
         */
        if ((0, index_1.isNotEmpty)(organizationId)) {
            qb.where('organizationId', organizationId);
        }
        else {
            qb.whereNull('organizationId');
        }
        /**
         * GET by project level
         */
        if ((0, index_1.isNotEmpty)(projectId)) {
            qb.where('projectId', projectId);
        }
        else {
            qb.whereNull('projectId');
        }
        /**
         * GET by team level
         */
        if ((0, index_1.isNotEmpty)(organizationTeamId)) {
            qb.where('organizationTeamId', organizationTeamId);
        }
        else {
            qb.whereNull('organizationTeamId');
        }
    }
};
exports.TaskStatusPrioritySizeService = TaskStatusPrioritySizeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        mikro_orm_base_entity_repository_1.MikroOrmBaseEntityRepository, Function])
], TaskStatusPrioritySizeService);
//# sourceMappingURL=task-status-priority-size.service.js.map