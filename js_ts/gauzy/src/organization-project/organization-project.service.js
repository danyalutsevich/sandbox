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
exports.OrganizationProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const crud_1 = require("./../core/crud");
const context_1 = require("../core/context");
const database_helper_1 = require("./../database/database.helper");
const type_orm_organization_project_repository_1 = require("./repository/type-orm-organization-project.repository");
const mikro_orm_organization_project_repository_1 = require("./repository/mikro-orm-organization-project.repository");
let OrganizationProjectService = exports.OrganizationProjectService = class OrganizationProjectService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository) {
        super(typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository);
    }
    /**
     * Find employee assigned projects
     *
     * @param employeeId
     * @param options
     * @returns
     */
    async findByEmployee(employeeId, options) {
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        query.setFindOptions({
            select: {
                id: true,
                name: true,
                imageUrl: true,
                currency: true,
                billing: true,
                public: true,
                owner: true,
                taskListType: true
            }
        });
        query.innerJoin(`${query.alias}.members`, 'member');
        query.leftJoin(`${query.alias}.teams`, 'project_team');
        query.andWhere(new typeorm_1.Brackets((qb) => {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { organizationId, organizationContactId, organizationTeamId } = options;
            qb.andWhere((0, database_helper_1.prepareSQLQuery)('member.id = :employeeId'), { employeeId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            if ((0, index_1.isNotEmpty)(organizationContactId)) {
                query.andWhere(`${query.alias}.organizationContactId = :organizationContactId`, {
                    organizationContactId
                });
            }
            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                query.andWhere(`project_team.id = :organizationTeamId`, {
                    organizationTeamId
                });
            }
        }));
        return await query.getMany();
    }
    /**
     * Organization project override find all method
     *
     * @param filter
     * @returns
     */
    async findAll(options) {
        if ('where' in options) {
            const { where } = options;
            if (where.organizationContactId === 'null') {
                options.where.organizationContactId = (0, typeorm_1.IsNull)();
            }
        }
        return await super.findAll(options);
    }
    /**
     * Organization project override pagination method
     *
     * @param filter
     * @returns
     */
    async pagination(options) {
        if ('where' in options) {
            const { where } = options;
            if (where.tags) {
                options.where.tags = {
                    id: (0, typeorm_1.In)(where.tags)
                };
            }
        }
        return await super.paginate(options);
    }
    /**
     * Get organization projects associated with a specific repository.
     *
     * @param repositoryId - The ID of the repository.
     * @param options - An object containing organization, tenant, and integration information.
     * @returns A Promise that resolves to an array of organization projects.
     */
    async getProjectsByGithubRepository(repositoryId, options) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId() || options.tenantId;
            const { organizationId, projectId, integrationId } = options;
            // Attempt to retrieve the organization projects by the provided parameters.
            const projects = await this.typeOrmRepository.find({
                where: {
                    ...(projectId ? { id: projectId } : {}),
                    organizationId,
                    tenantId,
                    repository: {
                        repositoryId,
                        integrationId,
                        organizationId,
                        tenantId,
                        isActive: true,
                        isArchived: false,
                        hasSyncEnabled: true
                    },
                    isActive: true,
                    isArchived: false
                }
            });
            return projects;
        }
        catch (error) {
            return [];
        }
    }
    /**
     * Find synchronized organization projects with options and count their associated issues.
     *
     * @param options - Query and pagination options (optional).
     * @returns A paginated list of synchronized organization projects with associated issue counts.
     */
    async findSyncedProjects(options) {
        // Create a query builder for the `OrganizationProject` entity
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        // Set find options (skip, take, and relations)
        query.skip(options && options.skip ? options.take * (options.skip - 1) : 0);
        query.take(options && options.take ? options.take : 10);
        // Join with the `Repository` entity and left join with `Issue` entity
        query.innerJoinAndSelect(`${query.alias}.repository`, 'repository');
        query.leftJoin('repository.issues', 'issue');
        // Select and count issues, and group the result by project and repository
        query.addSelect('COUNT(issue.id)', 'issueCount');
        query.groupBy(`${query.alias}.id, repository.id`);
        // Define where conditions for the query
        query.where((qb) => {
            const tenantId = context_1.RequestContext.currentTenantId();
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                tenantId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"repository"."tenantId" = :tenantId`), {
                tenantId
            });
            if (options?.where) {
                for (const key of Object.keys(options.where)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."${key}" = :${key}`), { [key]: options.where[key] });
                }
                for (const key of Object.keys(options.where)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"repository"."${key}" = :${key}`), { [key]: options.where[key] });
                }
            }
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."repositoryId" IS NOT NULL`));
        });
        // Log the SQL query (for debugging)
        // console.log(await query.getRawMany());
        // Execute the query and return the paginated result
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
};
exports.OrganizationProjectService = OrganizationProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository,
        mikro_orm_organization_project_repository_1.MikroOrmOrganizationProjectRepository])
], OrganizationProjectService);
//# sourceMappingURL=organization-project.service.js.map