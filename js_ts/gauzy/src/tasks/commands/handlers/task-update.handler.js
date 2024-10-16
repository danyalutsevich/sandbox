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
exports.TaskUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("core/context");
const task_service_1 = require("../../task.service");
const task_update_command_1 = require("../task-update.command");
const task_updated_event_1 = require("./../../events/task-updated.event");
let TaskUpdateHandler = exports.TaskUpdateHandler = class TaskUpdateHandler {
    _eventBus;
    _taskService;
    logger = new common_1.Logger('TaskUpdateHandler');
    constructor(_eventBus, _taskService) {
        this._eventBus = _eventBus;
        this._taskService = _taskService;
    }
    async execute(command) {
        const { id, input, triggeredEvent } = command;
        return await this.update(id, input, triggeredEvent);
    }
    /**
     * Update task, if already exist
     *
     * @param id
     * @param request
     * @returns
     */
    async update(id, request, triggeredEvent) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
            const task = await this._taskService.findOneByIdString(id);
            if (request.projectId && request.projectId !== task.projectId) {
                const { organizationId, projectId } = task;
                // Get the maximum task number for the project
                const maxNumber = await this._taskService.getMaxTaskNumberByProject({
                    tenantId,
                    organizationId,
                    projectId
                });
                // Update the task with the new project and task number
                await this._taskService.update(id, {
                    projectId,
                    number: maxNumber + 1
                });
            }
            // Update the task with the provided data
            const updatedTask = await this._taskService.create({
                ...request,
                id
            });
            // The "2 Way Sync Triggered Event" for Synchronization
            if (triggeredEvent) {
                this._eventBus.publish(new task_updated_event_1.TaskUpdatedEvent(updatedTask));
            }
            return updatedTask;
        }
        catch (error) {
            this.logger.error(`Error while updating task: ${error.message}`, error.message);
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.TaskUpdateHandler = TaskUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(task_update_command_1.TaskUpdateCommand),
    __metadata("design:paramtypes", [cqrs_1.EventBus,
        task_service_1.TaskService])
], TaskUpdateHandler);
//# sourceMappingURL=task-update.handler.js.map