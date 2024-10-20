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
exports.TaskEstimationCreateHandler = void 0;
;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const cqrs_2 = require("@nestjs/cqrs");
const task_estimation_create_command_1 = require("./../task-estimation-create.command");
const task_estimation_service_1 = require("../../task-estimation.service");
const task_estimation_calculate_command_1 = require("./../task-estimation-calculate.command");
let TaskEstimationCreateHandler = exports.TaskEstimationCreateHandler = class TaskEstimationCreateHandler {
    _taskEstimationService;
    commandBus;
    constructor(_taskEstimationService, commandBus) {
        this._taskEstimationService = _taskEstimationService;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { input } = command;
        let taskEstimationAlreadyPresent;
        try {
            taskEstimationAlreadyPresent =
                await this._taskEstimationService.findOneByWhereOptions({
                    tenantId: input.tenantId,
                    organizationId: input.organizationId,
                    taskId: input.taskId,
                    employeeId: input.employeeId,
                });
        }
        catch (error) {
            console.log('Error while fetching task estimation', error?.message);
        }
        if (taskEstimationAlreadyPresent) {
            throw new common_1.BadRequestException('Record for this member is already present');
        }
        try {
            const taskEstimation = await this._taskEstimationService.create(input);
            await this.commandBus.execute(new task_estimation_calculate_command_1.TaskEstimationCalculateCommand(input.taskId));
            return taskEstimation;
        }
        catch (error) {
            console.log('Error while creating task estimation', error?.message);
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskEstimationCreateHandler = TaskEstimationCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(task_estimation_create_command_1.TaskEstimationCreateCommand),
    __metadata("design:paramtypes", [task_estimation_service_1.TaskEstimationService,
        cqrs_2.CommandBus])
], TaskEstimationCreateHandler);
//# sourceMappingURL=task-estimation-create.handler.js.map