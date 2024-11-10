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
exports.TaskPriorityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const index_1 = require("../../../plugins/config/dist/index");
const context_1 = require("../../core/context");
const utils_1 = require("../../core/utils");
const task_status_priority_size_service_1 = require("../task-status-priority-size.service");
const priority_entity_1 = require("./priority.entity");
const default_global_priorities_1 = require("./default-global-priorities");
const mikro_orm_task_priority_repository_1 = require("./repository/mikro-orm-task-priority.repository");
const type_orm_task_priority_repository_1 = require("./repository/type-orm-task-priority.repository");
let TaskPriorityService = exports.TaskPriorityService = class TaskPriorityService extends task_status_priority_size_service_1.TaskStatusPrioritySizeService {
    typeOrmTaskPriorityRepository;
    mikroOrmTaskPriorityRepository;
    knexConnection;
    constructor(typeOrmTaskPriorityRepository, mikroOrmTaskPriorityRepository, knexConnection) {
        super(typeOrmTaskPriorityRepository, mikroOrmTaskPriorityRepository, knexConnection);
        this.typeOrmTaskPriorityRepository = typeOrmTaskPriorityRepository;
        this.mikroOrmTaskPriorityRepository = mikroOrmTaskPriorityRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * Few task priorities can't be removed/delete because they are global
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
     * GET priorities by filters
     * If parameters not match, retrieve global task priorities
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
            console.log('Failed to retrieve task priorities. Ensure that the provided parameters are valid and complete.', error);
            throw new common_1.BadRequestException('Failed to retrieve task priorities. Ensure that the provided parameters are valid and complete.', error);
        }
    }
    /**
     * Create bulk task priorities for tenants
     *
     * @param tenants '
     */
    async bulkCreateTenantsTaskPriorities(tenants) {
        try {
            const priorities = [];
            for (const tenant of tenants) {
                for (const priority of default_global_priorities_1.DEFAULT_GLOBAL_PRIORITIES) {
                    const create = this.typeOrmRepository.create({
                        ...priority,
                        icon: `ever-icons/${priority.icon}`,
                        tenant,
                        isSystem: false
                    });
                    priorities.push(create);
                }
            }
            return await this.typeOrmRepository.save(priorities);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create bulk task priorities for organization
     *
     * @param organization
     */
    async bulkCreateOrganizationTaskPriorities(organization) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const priorities = [];
            const { items = [] } = await super.fetchAll({ tenantId });
            for (const item of items) {
                const { name, value, description, icon, color } = item;
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
                priorities.push(create);
            }
            return await this.typeOrmRepository.save(priorities);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create bulk task priorities for specific organization entity
     *
     * @param entity
     * @returns
     */
    async createBulkPrioritiesByEntity(entity) {
        try {
            const { organizationId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId();
            const priorities = [];
            const { items = [] } = await super.fetchAll({ tenantId, organizationId });
            for (const item of items) {
                const { name, value, description, icon, color } = item;
                const priority = await this.create({
                    ...entity,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    isSystem: false
                });
                priorities.push(priority);
            }
            return priorities;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskPriorityService = TaskPriorityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(priority_entity_1.TaskPriority)),
    __param(2, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [type_orm_task_priority_repository_1.TypeOrmTaskPriorityRepository,
        mikro_orm_task_priority_repository_1.MikroOrmTaskPriorityRepository, Function])
], TaskPriorityService);
//# sourceMappingURL=priority.service.js.map