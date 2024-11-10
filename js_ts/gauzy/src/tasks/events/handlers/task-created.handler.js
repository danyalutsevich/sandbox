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
exports.TaskCreatedEventHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("core/context");
const commands_1 = require("integration/github/commands");
const task_created_event_1 = require("../task-created.event");
// Handles event when new task created
let TaskCreatedEventHandler = exports.TaskCreatedEventHandler = class TaskCreatedEventHandler {
    _commandBus;
    logger = new common_1.Logger('TaskCreatedEvent');
    constructor(_commandBus) {
        this._commandBus = _commandBus;
    }
    /**
     * Handles a `TaskCreatedEvent` by processing the event's input and executing a command if a project ID is present.
     *
     * @param event - The `TaskCreatedEvent` to handle.
     */
    async handle(event) {
        try {
            const { input } = event;
            const { organizationId, projectId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            // If project found
            if (projectId) {
                // Prepare a payload for the command
                const payload = {
                    tenantId,
                    organizationId,
                    projectId
                };
                await this._commandBus.execute(new commands_1.GithubTaskUpdateOrCreateCommand(input, payload));
            }
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            this.logger.error('Error while created of a new task', error.message);
            throw new common_1.HttpException(`Error while created of a new task: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TaskCreatedEventHandler = TaskCreatedEventHandler = __decorate([
    (0, cqrs_1.EventsHandler)(task_created_event_1.TaskCreatedEvent),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], TaskCreatedEventHandler);
//# sourceMappingURL=task-created.handler.js.map