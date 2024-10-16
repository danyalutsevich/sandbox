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
exports.TaskVersionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const index_1 = require("../../../plugins/config/dist/index");
const task_status_priority_size_service_1 = require("../task-status-priority-size.service");
const context_1 = require("../../core/context");
const utils_1 = require("../../core/utils");
const version_entity_1 = require("./version.entity");
const default_global_versions_1 = require("./default-global-versions");
const mikro_orm_task_version_repository_1 = require("./repository/mikro-orm-task-version.repository");
const type_orm_task_version_repository_1 = require("./repository/type-orm-task-version.repository");
let TaskVersionService = exports.TaskVersionService = class TaskVersionService extends task_status_priority_size_service_1.TaskStatusPrioritySizeService {
    typeOrmTaskVersionRepository;
    mikroOrmTaskVersionRepository;
    knexConnection;
    constructor(typeOrmTaskVersionRepository, mikroOrmTaskVersionRepository, knexConnection) {
        super(typeOrmTaskVersionRepository, mikroOrmTaskVersionRepository, knexConnection);
        this.typeOrmTaskVersionRepository = typeOrmTaskVersionRepository;
        this.mikroOrmTaskVersionRepository = mikroOrmTaskVersionRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * GET versions by filters
     * If parameters not match, retrieve global versions
     *
     * @param params
     * @returns
     */
    async fetchAll(params) {
        try {
            if (this.ormType == utils_1.MultiORMEnum.TypeORM && (0, index_1.isPostgres)()) {
                return await super.fetchAllByKnex(params);
            }
            else {
                return await super.fetchAll(params);
            }
        }
        catch (error) {
            console.log('Failed to retrieve task versions. Ensure that the provided parameters are valid and complete.', error);
            throw new common_1.BadRequestException('Failed to retrieve task versions. Ensure that the provided parameters are valid and complete.', error);
        }
    }
    /**
     * Few Versions can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await super.delete(id, {
            where: {
                isSystem: false
            },
        });
    }
    /**
     * Create bulk versions for specific tenants
     *
     * @param tenants '
     */
    async bulkCreateTenantsVersions(tenants) {
        const versions = [];
        for (const tenant of tenants) {
            for (const version of default_global_versions_1.DEFAULT_GLOBAL_VERSIONS) {
                versions.push(new version_entity_1.TaskVersion({
                    ...version,
                    icon: `ever-icons/${version.icon}`,
                    isSystem: false,
                    tenant,
                }));
            }
        }
        return await this.typeOrmRepository.save(versions);
    }
    /**
     * Create bulk versions for specific organization
     *
     * @param organization
     */
    async bulkCreateOrganizationVersions(organization) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { items = [] } = await super.fetchAll({ tenantId });
            const versions = [];
            for (const item of items) {
                const { tenantId, name, value, description, icon, color } = item;
                const version = new version_entity_1.TaskVersion({
                    tenantId,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    organization,
                    isSystem: false,
                });
                versions.push(version);
            }
            return await this.typeOrmRepository.save(versions);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create bulk versions for specific organization entity
     *
     * @param entity
     * @returns
     */
    async createBulkVersionsByEntity(entity) {
        try {
            const { organizationId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId();
            const { items = [] } = await this.fetchAll({
                tenantId,
                organizationId
            });
            const versions = [];
            for (const item of items) {
                const { name, value, description, icon, color } = item;
                const version = await this.create({
                    ...entity,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    isSystem: false,
                });
                versions.push(version);
            }
            return versions;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskVersionService = TaskVersionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(version_entity_1.TaskVersion)),
    __param(2, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [type_orm_task_version_repository_1.TypeOrmTaskVersionRepository,
        mikro_orm_task_version_repository_1.MikroOrmTaskVersionRepository, Function])
], TaskVersionService);
//# sourceMappingURL=version.service.js.map