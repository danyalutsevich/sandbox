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
exports.TaskEstimationCalculateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const task_estimation_calculate_command_1 = require("../task-estimation-calculate.command");
const task_estimation_service_1 = require("../../task-estimation.service");
const task_service_1 = require("../../../task.service");
let TaskEstimationCalculateHandler = exports.TaskEstimationCalculateHandler = class TaskEstimationCalculateHandler {
    _taskEstimationService;
    _taskService;
    constructor(_taskEstimationService, _taskService) {
        this._taskEstimationService = _taskEstimationService;
        this._taskService = _taskService;
    }
    async execute(command) {
        try {
            const { id: taskId } = command;
            const taskEstimations = await this._taskEstimationService.findAll({
                where: {
                    taskId,
                },
            });
            const totalEstimation = taskEstimations.items.reduce((sum, current) => sum + current.estimate, 0);
            const averageEstimation = Math.ceil(totalEstimation / taskEstimations.items.length);
            await this._taskService.update(taskId, {
                estimate: averageEstimation,
            });
        }
        catch (error) {
            console.log('Error while creating task estimation', error?.message);
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskEstimationCalculateHandler = TaskEstimationCalculateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(task_estimation_calculate_command_1.TaskEstimationCalculateCommand),
    __metadata("design:paramtypes", [task_estimation_service_1.TaskEstimationService,
        task_service_1.TaskService])
], TaskEstimationCalculateHandler);
//# sourceMappingURL=task-estimation-calculate.handler.js.map