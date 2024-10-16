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
exports.TaskSizeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const index_1 = require("../../../plugins/config/dist/index");
const context_1 = require("../../core/context");
const utils_1 = require("../../core/utils");
const task_status_priority_size_service_1 = require("../task-status-priority-size.service");
const size_entity_1 = require("./size.entity");
const default_global_sizes_1 = require("./default-global-sizes");
const type_orm_task_size_repository_1 = require("./repository/type-orm-task-size.repository");
const mikro_orm_task_size_repository_1 = require("./repository/mikro-orm-task-size.repository");
let TaskSizeService = exports.TaskSizeService = class TaskSizeService extends task_status_priority_size_service_1.TaskStatusPrioritySizeService {
    typeOrmTaskSizeRepository;
    mikroOrmTaskSizeRepository;
    knexConnection;
    constructor(typeOrmTaskSizeRepository, mikroOrmTaskSizeRepository, knexConnection) {
        super(typeOrmTaskSizeRepository, mikroOrmTaskSizeRepository, knexConnection);
        this.typeOrmTaskSizeRepository = typeOrmTaskSizeRepository;
        this.mikroOrmTaskSizeRepository = mikroOrmTaskSizeRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * Few task sizes can't be removed/delete because they are global
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
     * Find task sizes based on the provided parameters.
     * @param params - The input parameters for the task size search.
     * @returns {Promise<IPagination<ITaskSize>>} A promise resolving to the paginated list of task sizes.
     * @throws {HttpException} Thrown if there's an issue with the request parameters, such as missing or unauthorized integration.
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
            console.log('Failed to retrieve task sizes. Please ensure that all required parameters are provided correctly.', error);
            throw new common_1.BadRequestException('Failed to retrieve task sizes. Ensure that the provided parameters are valid and complete.', error);
        }
    }
    /**
     * Create bulk task sizes for tenants
     *
     * @param tenants
     */
    async bulkCreateTenantsTaskSizes(tenants) {
        try {
            const sizes = [];
            for (const tenant of tenants) {
                for (const size of default_global_sizes_1.DEFAULT_GLOBAL_SIZES) {
                    const create = this.typeOrmRepository.create({
                        ...size,
                        icon: `ever-icons/${size.icon}`,
                        tenant,
                        isSystem: false
                    });
                    sizes.push(create);
                }
            }
            return await this.typeOrmRepository.save(sizes);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create bulk task sizes for organization
     *
     * @param organization
     */
    async bulkCreateOrganizationTaskSizes(organization) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const sizes = [];
            const { items = [] } = await super.fetchAll({ tenantId });
            for (const item of items) {
                const { tenantId, name, value, description, icon, color } = item;
                const create = this.typeOrmRepository.create({
                    tenantId,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    organization,
                    isSystem: false
                });
                sizes.push(create);
            }
            return await this.typeOrmRepository.save(sizes);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create bulk task sizes for specific organization entity
     *
     * @param entity
     * @returns
     */
    async createBulkSizesByEntity(entity) {
        try {
            const { organizationId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId();
            const sizes = [];
            const { items = [] } = await super.fetchAll({ tenantId, organizationId });
            for (const item of items) {
                const { name, value, description, icon, color } = item;
                const size = await this.create({
                    ...entity,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    isSystem: false
                });
                sizes.push(size);
            }
            return sizes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskSizeService = TaskSizeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(size_entity_1.TaskSize)),
    __param(2, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [type_orm_task_size_repository_1.TypeOrmTaskSizeRepository,
        mikro_orm_task_size_repository_1.MikroOrmTaskSizeRepository, Function])
], TaskSizeService);
//# sourceMappingURL=size.service.js.map