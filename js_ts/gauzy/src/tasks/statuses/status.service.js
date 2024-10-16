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
exports.TaskStatusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const uuid_1 = require("uuid");
const index_1 = require("../../../plugins/config/dist/index");
const task_status_priority_size_service_1 = require("../task-status-priority-size.service");
const context_1 = require("../../core/context");
const utils_1 = require("../../core/utils");
const status_entity_1 = require("./status.entity");
const default_global_statuses_1 = require("./default-global-statuses");
const repository_1 = require("./repository");
let TaskStatusService = exports.TaskStatusService = class TaskStatusService extends task_status_priority_size_service_1.TaskStatusPrioritySizeService {
    typeOrmTaskStatusRepository;
    mikroOrmTaskStatusRepository;
    knexConnection;
    constructor(typeOrmTaskStatusRepository, mikroOrmTaskStatusRepository, knexConnection) {
        console.log(`TaskStatusService initialized. Unique Service ID: ${(0, uuid_1.v4)()} `);
        super(typeOrmTaskStatusRepository, mikroOrmTaskStatusRepository, knexConnection);
        this.typeOrmTaskStatusRepository = typeOrmTaskStatusRepository;
        this.mikroOrmTaskStatusRepository = mikroOrmTaskStatusRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
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
            console.log('Failed to retrieve task statuses. Ensure that the provided parameters are valid and complete.', error);
            throw new common_1.BadRequestException('Failed to retrieve task statuses. Ensure that the provided parameters are valid and complete.', error);
        }
    }
    /**
     * Few Statuses can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await super.delete(id, {
            where: {
                isSystem: false
            }
        });
    }
    /**
     * Creates bulk task statuses for specific tenants.
     *
     * @param tenants An array of tenants for whom the task statuses will be created.
     * @returns A promise that resolves to an array of created task statuses.
     */
    async bulkCreateTenantsStatus(tenants) {
        try {
            // Initialize an array to store the created task statuses.
            const statuses = [];
            // Iterate over each tenant.
            for (const tenant of tenants) {
                // Iterate over each default global status.
                for (const status of default_global_statuses_1.DEFAULT_GLOBAL_STATUSES) {
                    // Create a new TaskStatus instance with modified properties.
                    const newStatus = new status_entity_1.TaskStatus({
                        ...status,
                        icon: `ever-icons/${status.icon}`,
                        isSystem: false,
                        tenant
                    });
                    // Add the new status to the array.
                    statuses.push(newStatus);
                }
            }
            // Save the created task statuses using the repository.
            return await this.typeOrmRepository.save(statuses);
        }
        catch (error) {
            // If an error occurs during the creation process, log the error.
            console.error('Error while creating task statuses', error.message);
        }
    }
    /**
     * Creates bulk task statuses for a specific organization.
     *
     * @param organization The organization for which the task statuses will be created.
     * @returns A promise that resolves to an array of created task statuses.
     */
    async bulkCreateOrganizationStatus(organization) {
        try {
            // Initialize an array to store the created task statuses.
            const statuses = [];
            // Get the current tenant ID from the request context.
            const tenantId = context_1.RequestContext.currentTenantId();
            // Find entities by parameters, filtering by tenant ID.
            const { items = [] } = await super.fetchAll({ tenantId });
            // Initialize an index variable.
            let index = 0;
            // Iterate over each found entity.
            for (const item of items) {
                // Extract relevant properties from the entity.
                const { tenantId, name, value, description, icon, color, order, isCollapsed } = item;
                // Create a new TaskStatus instance with modified properties.
                const status = new status_entity_1.TaskStatus({
                    tenantId,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    organization,
                    isSystem: false,
                    order: order || index,
                    isCollapsed
                });
                // Increment the index.
                index++;
                // Add the new status to the array.
                statuses.push(status);
            }
            // Save the created task statuses using the repository.
            return await this.typeOrmRepository.save(statuses);
        }
        catch (error) {
            // If an error occurs during the creation process, log the error.
            console.error('Error while creating task statuses for organization', error.message);
        }
    }
    /**
     * Creates bulk task statuses based on the properties of a given entity.
     *
     * @param entity A partial representation of the entity from which properties will be extracted for creating task statuses.
     * @returns A promise that resolves to an array of created task statuses.
     */
    async createBulkStatusesByEntity(entity) {
        // Extract relevant properties from the entity.
        const { organizationId } = entity;
        const tenantId = context_1.RequestContext.currentTenantId();
        try {
            // Initialize an array to store the created task statuses.
            const statuses = [];
            // Find entities by parameters, filtering by tenant ID and organization ID.
            const { items = [] } = await super.fetchAll({ tenantId, organizationId });
            // Initialize an index variable.
            let index = 0;
            // Iterate over each found entity.
            for await (const item of items) {
                // Extract properties from the entity.
                const { name, value, description, icon, color, order, isCollapsed } = item;
                // Create a new TaskStatus instance with modified properties.
                const status = await this.create({
                    ...entity,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    isSystem: false,
                    order: order || index,
                    isCollapsed
                });
                // Increment the index.
                index++;
                // Add the new status to the array.
                statuses.push(status);
            }
            // Return the array of created task statuses.
            return statuses;
        }
        catch (error) {
            // If an error occurs during the creation process, log the error.
            console.error('Error while creating task statuses', error);
        }
    }
    /**
     * Reorders a list of items based on the given ReorderDTO array.
     * @param list - An array of ReorderDTO representing the IDs and their new orders.
     * @returns An object indicating success or failure, along with the updated list.
     * @throws BadRequestException if an error occurs during reordering.
     */
    async reorder(list) {
        // Logger for tracking operations
        const logger = new common_1.Logger('TaskStatusService'); // Update with your service name
        try {
            // Loop through the list and update each item's order
            for await (const item of list) {
                logger.log(`Updating item with ID: ${item.id} to order: ${item.order}`); // Logging operation
                // Update the entity with the new order value
                if (item.id) {
                    await this.update({ id: item.id, isSystem: false }, { order: item.order });
                }
            }
            // Return a success status and the updated list
            return { success: true, list };
        }
        catch (error) {
            // Handle errors during reordering
            logger.error('Error during reordering of task statues:', error); // Log the error for debugging
            throw new common_1.BadRequestException('An error occurred while reordering task statues. Please try again.', error); // Return error
        }
    }
};
exports.TaskStatusService = TaskStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(status_entity_1.TaskStatus)),
    __param(2, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [repository_1.TypeOrmTaskStatusRepository,
        repository_1.MikroOrmTaskStatusRepository, Function])
], TaskStatusService);
//# sourceMappingURL=status.service.js.map