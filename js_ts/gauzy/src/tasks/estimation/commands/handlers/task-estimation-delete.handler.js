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
exports.TaskEstimationDeleteHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const cqrs_2 = require("@nestjs/cqrs");
const __1 = require("..");
const task_estimation_service_1 = require("../../task-estimation.service");
const task_estimation_delete_command_1 = require("../task-estimation-delete.command");
let TaskEstimationDeleteHandler = exports.TaskEstimationDeleteHandler = class TaskEstimationDeleteHandler {
    _taskEstimationService;
    commandBus;
    constructor(_taskEstimationService, commandBus) {
        this._taskEstimationService = _taskEstimationService;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { id } = command;
        return await this.delete(id);
    }
    /**
     * Delete task estimation, if already exist
     *
     * @param id
     * @returns
     */
    async delete(id) {
        try {
            const taskEstimation = await this._taskEstimationService.findOneByIdString(id);
            const deleteResponse = await this._taskEstimationService.delete(id);
            await this.commandBus.execute(new __1.TaskEstimationCalculateCommand(taskEstimation.taskId));
            return deleteResponse;
        }
        catch (error) {
            console.log('Error while deleting task estimation', error?.message);
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskEstimationDeleteHandler = TaskEstimationDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(task_estimation_delete_command_1.TaskEstimationDeleteCommand),
    __metadata("design:paramtypes", [task_estimation_service_1.TaskEstimationService,
        cqrs_2.CommandBus])
], TaskEstimationDeleteHandler);
//# sourceMappingURL=task-estimation-delete.handler.js.map