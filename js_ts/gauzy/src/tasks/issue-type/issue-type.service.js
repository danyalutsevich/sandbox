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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTypeService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const issue_type_entity_1 = require("./issue-type.entity");
const task_status_priority_size_service_1 = require("./../task-status-priority-size.service");
const default_global_issue_types_1 = require("./default-global-issue-types");
const context_1 = require("./../../core/context");
const mikro_orm_issue_type_repository_1 = require("./repository/mikro-orm-issue-type.repository");
const type_orm_issue_type_repository_1 = require("./repository/type-orm-issue-type.repository");
let IssueTypeService = exports.IssueTypeService = class IssueTypeService extends task_status_priority_size_service_1.TaskStatusPrioritySizeService {
    typeOrmIssueTypeRepository;
    mikroOrmIssueTypeRepository;
    knexConnection;
    constructor(typeOrmIssueTypeRepository, mikroOrmIssueTypeRepository, knexConnection) {
        super(typeOrmIssueTypeRepository, mikroOrmIssueTypeRepository, knexConnection);
        this.typeOrmIssueTypeRepository = typeOrmIssueTypeRepository;
        this.mikroOrmIssueTypeRepository = mikroOrmIssueTypeRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * Few issue types can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await super.delete(id, {
            where: { isSystem: false }
        });
    }
    /**
     * Fetches issue types based on specified parameters.
     *
     * @param params - Parameters for finding issue types (IIssueTypeFindInput).
     * @returns A Promise resolving to an object with items (array of issue types) and total count.
     * @throws Error if no records are found or an error occurs during the query.
     */
    async fetchAll(params) {
        try {
            /**
             * Find at least one record or get global records
             */
            const cqb = this.typeOrmIssueTypeRepository.createQueryBuilder(this.tableName);
            cqb.where((qb) => {
                this.getFilterQuery(qb, params);
            });
            await cqb.getOneOrFail();
            /**
             * Find task issue types for given params
             */
            const query = this.typeOrmIssueTypeRepository.createQueryBuilder(this.tableName);
            query.where((qb) => {
                this.getFilterQuery(qb, params);
            });
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            console.log('Invalid request parameter: Some required parameters are missing or incorrect', error);
            return await this.getDefaultEntities();
        }
    }
    /**
     * Create or fetch issue types for a list of tenants.
     *
     * @param tenants The list of tenants.
     * @returns A promise resolving to an array of created or fetched issue types.
     */
    async bulkCreateTenantsIssueTypes(tenants) {
        try {
            // Fetch existing issue types
            const { items = [], total } = await super.fetchAll({});
            // Define default issue types
            const defaultIssueTypes = default_global_issue_types_1.DEFAULT_GLOBAL_ISSUE_TYPES.map((issueType) => ({
                ...issueType,
                icon: `ever-icons/${issueType.icon}`,
                isSystem: false
            }));
            // Function to generate issue types based on a source array
            const generateIssueTypes = (source) => tenants.flatMap((tenant) => source.map(({ name, value, description, icon, color, isDefault, imageId = null }) => ({
                name,
                value,
                description,
                icon,
                color,
                imageId,
                tenant,
                isDefault,
                isSystem: false
            })));
            // Generate the array of issue types based on existing or default values
            const issueTypes = total > 0 ? generateIssueTypes(items) : generateIssueTypes(defaultIssueTypes);
            // Save the created or fetched issue types to the repository and return the result.
            return await this.typeOrmRepository.save(issueTypes);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create or fetch issue types for the specified tenants. Some required parameters are missing or incorrect.', error);
        }
    }
    /**
     * Create bulk issue types for organization
     *
     * @param organization
     */
    async bulkCreateOrganizationIssueType(organization) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { items = [] } = await super.fetchAll({ tenantId });
            // Use map to generate issue types for each item.
            const issueTypes = items.map((item) => new issue_type_entity_1.IssueType({
                tenantId,
                name: item.name,
                value: item.value,
                description: item.description,
                icon: item.icon,
                color: item.color,
                imageId: item.imageId,
                isDefault: item.isDefault,
                organization,
                isSystem: false
            }));
            return await this.typeOrmRepository.save(issueTypes);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create or fetch issue types for the specified tenants. Some required parameters are missing or incorrect.', error);
        }
    }
    /**
     * Create bulk issue types for a specific organization entity.
     *
     * @param entity - Partial input for creating issue types (Partial<IIssueTypeCreateInput>).
     * @returns A Promise resolving to an array of created issue types (IIssueType[]).
     * @throws HttpException if an error occurs during the creation process.
     */
    async createBulkIssueTypeByEntity(entity) {
        try {
            const { organizationId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId();
            // Fetch items based on tenant and organizationId
            const { items = [] } = await super.fetchAll({ tenantId, organizationId });
            // Use Promise.all to concurrently create issue types for each item
            // Wait for all issue types to be created and resolve the promises
            const issueTypes = await Promise.all(items.map(async (item) => {
                const { name, value, description, icon, color, imageId, isDefault } = item;
                // Create and return the issue type
                return await this.create({
                    ...entity,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    imageId,
                    isDefault,
                    isSystem: false
                });
            }));
            return issueTypes;
        }
        catch (error) {
            // If an error occurs, throw an HttpException with a more specific message.
            throw new common_1.HttpException('Failed to create bulk issue types for the organization entity.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Marks an issue type as default and updates other issue types accordingly.
     *
     * @param id The ID of the issue type to mark as default.
     * @param input An object containing input parameters, including organization, team, and project IDs.
     * @returns A Promise that resolves to an array of updated issue types.
     */
    async markAsDefault(id, input) {
        try {
            const { organizationId, organizationTeamId, projectId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            // Find the issue type by ID
            const issueType = await this.findOneByIdString(id, { where: { isSystem: false } });
            // Update the issue type to mark it as default
            issueType.isDefault = true;
            // Define options to find issue types to update
            const findOptions = {
                ...(organizationId ? { organizationId } : {}),
                ...(organizationTeamId ? { organizationTeamId } : {}),
                ...(projectId ? { projectId } : {}),
                tenantId,
                isSystem: false
            };
            // Update other issue types to mark them as non-default
            await super.update(findOptions, { isDefault: false });
            // Save the updated issue type
            await super.save(issueType);
            // Fetch and return all issue types based on the specified parameters
            const { items = [] } = await super.fetchAll({
                tenantId,
                organizationId,
                organizationTeamId,
                projectId
            });
            return items;
        }
        catch (error) {
            // If an error occurs, throw a BadRequestException
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.IssueTypeService = IssueTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [type_orm_issue_type_repository_1.TypeOrmIssueTypeRepository,
        mikro_orm_issue_type_repository_1.MikroOrmIssueTypeRepository, Function])
], IssueTypeService);
//# sourceMappingURL=issue-type.service.js.map