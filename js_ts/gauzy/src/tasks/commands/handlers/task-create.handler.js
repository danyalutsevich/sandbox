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
exports.TaskCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const context_1 = require("./../../../core/context");
const organization_project_service_1 = require("./../../../organization-project/organization-project.service");
const task_created_event_1 = require("./../../events/task-created.event");
const task_create_command_1 = require("./../task-create.command");
const task_service_1 = require("../../task.service");
let TaskCreateHandler = exports.TaskCreateHandler = class TaskCreateHandler {
    _eventBus;
    _taskService;
    _organizationProjectService;
    logger = new common_1.Logger('TaskCreateCommand');
    constructor(_eventBus, _taskService, _organizationProjectService) {
        this._eventBus = _eventBus;
        this._taskService = _taskService;
        this._organizationProjectService = _organizationProjectService;
    }
    async execute(command) {
        try {
            const { input, triggeredEvent } = command;
            let { organizationId, project } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            /** If project found then use project name as a task prefix */
            if (input.projectId) {
                const { projectId } = input;
                project = await this._organizationProjectService.findOneByIdString(projectId);
            }
            const projectId = project ? project.id : null;
            const taskPrefix = project ? project.name.substring(0, 3) : null;
            const maxNumber = await this._taskService.getMaxTaskNumberByProject({
                tenantId,
                organizationId,
                projectId,
            });
            const createdTask = await this._taskService.create({
                ...input,
                number: maxNumber + 1,
                prefix: taskPrefix,
                tenantId,
                organizationId,
            });
            // The "2 Way Sync Triggered Event" for Synchronization
            if (triggeredEvent) {
                this._eventBus.publish(new task_created_event_1.TaskCreatedEvent(createdTask));
            }
            return createdTask;
        }
        catch (error) {
            this.logger.error(`Error while creating task: ${error.message}`, error.message);
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.TaskCreateHandler = TaskCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(task_create_command_1.TaskCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.EventBus,
        task_service_1.TaskService,
        organization_project_service_1.OrganizationProjectService])
], TaskCreateHandler);
//# sourceMappingURL=task-create.handler.js.map