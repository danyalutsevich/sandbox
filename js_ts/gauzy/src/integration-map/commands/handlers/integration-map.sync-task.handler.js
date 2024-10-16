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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationMapSyncTaskHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const task_service_1 = require("tasks/task.service");
const integration_map_sync_entity_command_1 = require("./../integration-map.sync-entity.command");
const integration_map_sync_task_command_1 = require("./../integration-map.sync-task.command");
const integration_map_service_1 = require("../../integration-map.service");
const context_1 = require("./../../../core/context");
const commands_1 = require("./../../../tasks/commands");
let IntegrationMapSyncTaskHandler = exports.IntegrationMapSyncTaskHandler = class IntegrationMapSyncTaskHandler {
    _commandBus;
    _integrationMapService;
    _taskService;
    constructor(_commandBus, _integrationMapService, _taskService) {
        this._commandBus = _commandBus;
        this._integrationMapService = _integrationMapService;
        this._taskService = _taskService;
    }
    /**
     * Third party project task integrated and mapped
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { triggeredEvent, input } = command;
        const { sourceId, organizationId, integrationId, entity } = input;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        try {
            // Check if an integration map already exists for the issue
            const integrationMap = await this._integrationMapService.findOneByWhereOptions({
                entity: index_1.IntegrationEntity.TASK,
                sourceId,
                integrationId,
                organizationId,
                tenantId
            });
            // Try to find the corresponding task
            try {
                await this._taskService.findOneByIdString(integrationMap.gauzyId);
                // Update the corresponding task with the new input data
                await this._commandBus.execute(new commands_1.TaskUpdateCommand(integrationMap.gauzyId, entity, triggeredEvent));
            }
            catch (error) {
                // Create a corresponding task with the new input data
                await this._commandBus.execute(new commands_1.TaskCreateCommand({
                    ...entity,
                    id: integrationMap.gauzyId
                }));
            }
            // Return the integration map
            return integrationMap;
        }
        catch (error) {
            // Handle errors and create a new task
            // Create a new task with the provided entity data
            const task = await this._commandBus.execute(new commands_1.TaskCreateCommand(entity, triggeredEvent));
            // Create a new integration map for the issue
            return await this._commandBus.execute(new integration_map_sync_entity_command_1.IntegrationMapSyncEntityCommand({
                gauzyId: task.id,
                entity: index_1.IntegrationEntity.TASK,
                integrationId,
                sourceId,
                organizationId,
                tenantId
            }));
        }
    }
};
exports.IntegrationMapSyncTaskHandler = IntegrationMapSyncTaskHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_map_sync_task_command_1.IntegrationMapSyncTaskCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_map_service_1.IntegrationMapService, typeof (_a = typeof task_service_1.TaskService !== "undefined" && task_service_1.TaskService) === "function" ? _a : Object])
], IntegrationMapSyncTaskHandler);
//# sourceMappingURL=integration-map.sync-task.handler.js.map