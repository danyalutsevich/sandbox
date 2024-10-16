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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationTaskSyncHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const context_1 = require("core/context");
const internal_1 = require("core/entities/internal");
const automation_task_sync_command_1 = require("./../automation-task.sync.command");
const task_service_1 = require("./../../task.service");
const task_entity_1 = require("./../../task.entity");
const type_orm_integration_map_repository_1 = require("../../../integration-map/repository/type-orm-integration-map.repository");
const type_orm_task_status_repository_1 = require("tasks/statuses/repository/type-orm-task-status.repository");
const type_orm_task_repository_1 = require("tasks/repository/type-orm-task.repository");
let AutomationTaskSyncHandler = exports.AutomationTaskSyncHandler = class AutomationTaskSyncHandler {
    typeOrmTaskRepository;
    typeOrmTaskStatusRepository;
    typeOrmIntegrationMapRepository;
    _taskService;
    constructor(typeOrmTaskRepository, typeOrmTaskStatusRepository, typeOrmIntegrationMapRepository, _taskService) {
        this.typeOrmTaskRepository = typeOrmTaskRepository;
        this.typeOrmTaskStatusRepository = typeOrmTaskStatusRepository;
        this.typeOrmIntegrationMapRepository = typeOrmIntegrationMapRepository;
        this._taskService = _taskService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const { sourceId, integrationId, organizationId, entity } = input;
            const { projectId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            const taskStatus = await this.typeOrmTaskStatusRepository.findOneBy({
                tenantId,
                organizationId,
                projectId,
                name: entity.status
            });
            entity.taskStatus = taskStatus;
            try {
                // Check if an integration map already exists for the issue
                const integrationMap = await this.typeOrmIntegrationMapRepository.findOneByOrFail({
                    entity: command.entity,
                    sourceId,
                    integrationId,
                    organizationId,
                    tenantId
                });
                // Try to find the corresponding task
                try {
                    await this._taskService.findOneByIdString(integrationMap.gauzyId);
                    // Update the corresponding task with the new input data
                    await this.updateTask(integrationMap.gauzyId, {
                        ...entity,
                        projectId,
                        organizationId,
                        tenantId
                    });
                }
                catch (error) {
                    // Create a new task with the provided entity data
                    await this.createTask({
                        projectId,
                        organizationId,
                        tenantId
                    }, {
                        ...entity,
                        id: integrationMap.gauzyId
                    });
                }
                // Return the integration map
                return integrationMap;
            }
            catch (error) {
                // Create a new task with the provided entity data
                const task = await this.createTask({
                    projectId,
                    organizationId,
                    tenantId
                }, entity);
                // Create a new integration map for the issue
                return await this.typeOrmIntegrationMapRepository.save(this.typeOrmIntegrationMapRepository.create({
                    gauzyId: task.id,
                    entity: command.entity,
                    integrationId,
                    sourceId,
                    organizationId,
                    tenantId
                }));
            }
        }
        catch (error) {
            console.log('Failed to sync in issues and labels', error.message);
        }
    }
    /**
     * Creates a new task within a project.
     *
     * @param options - An object containing parameters for task creation.
     * @returns A Promise that resolves to the newly created task.
     */
    async createTask(options, entity) {
        try {
            // Retrieve the maximum task number for the project
            const maxNumber = await this._taskService.getMaxTaskNumberByProject(options);
            // Create a new task with the provided entity data
            const newTask = this.typeOrmTaskRepository.create({
                ...entity,
                number: maxNumber + 1,
                organizationId: options.organizationId,
                tenantId: options.tenantId
            });
            // Save the new task
            const createdTask = await this.typeOrmTaskRepository.save(newTask);
            return createdTask;
        }
        catch (error) {
            // Handle and log errors, and return a rejected promise or throw an exception.
            console.error('Error automation syncing a task:', error);
        }
    }
    /**
     * Updates a task with new data.
     *
     * @param id - The ID of the task to update.
     * @param entity - The new data for the task.
     * @returns A Promise that resolves to the updated task.
     */
    async updateTask(id, entity) {
        try {
            // Find the existing task by its ID
            const existingTask = await this._taskService.findOneByIdString(id);
            if (!existingTask) {
                return;
            }
            // Update the existing task with the new entity data
            this.typeOrmTaskRepository.merge(existingTask, entity);
            // Save the updated task
            const updatedTask = await this.typeOrmTaskRepository.save(existingTask);
            return updatedTask;
        }
        catch (error) {
            // Handle and log errors, and return a rejected promise or throw an exception.
            console.error('Error automation syncing a task:', error);
        }
    }
};
exports.AutomationTaskSyncHandler = AutomationTaskSyncHandler = __decorate([
    (0, cqrs_1.CommandHandler)(automation_task_sync_command_1.AutomationTaskSyncCommand),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.TaskStatus)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.IntegrationMap)),
    __metadata("design:paramtypes", [typeof (_a = typeof type_orm_task_repository_1.TypeOrmTaskRepository !== "undefined" && type_orm_task_repository_1.TypeOrmTaskRepository) === "function" ? _a : Object, typeof (_b = typeof type_orm_task_status_repository_1.TypeOrmTaskStatusRepository !== "undefined" && type_orm_task_status_repository_1.TypeOrmTaskStatusRepository) === "function" ? _b : Object, type_orm_integration_map_repository_1.TypeOrmIntegrationMapRepository,
        task_service_1.TaskService])
], AutomationTaskSyncHandler);
//# sourceMappingURL=automation-task.sync.handler.js.map