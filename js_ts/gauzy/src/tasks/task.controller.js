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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./../shared/dto");
const crud_1 = require("./../core/crud");
const task_entity_1 = require("./task.entity");
const task_service_1 = require("./task.service");
const commands_1 = require("./commands");
const dto_2 = require("./dto");
let TaskController = exports.TaskController = class TaskController extends crud_1.CrudController {
    taskService;
    commandBus;
    constructor(taskService, commandBus) {
        super(taskService);
        this.taskService = taskService;
        this.commandBus = commandBus;
    }
    /**
     * GET task count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.taskService.countBy(options);
    }
    /**
     * GET tasks by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this.taskService.pagination(params);
    }
    /**
     * GET maximum task number
     *
     * @param options
     * @returns
     */
    async getMaxTaskNumberByProject(options) {
        return await this.taskService.getMaxTaskNumberByProject(options);
    }
    /**
     * GET my tasks
     *
     * @param params
     * @returns
     */
    async findMyTasks(params) {
        return await this.taskService.getMyTasks(params);
    }
    /**
     * GET employee tasks
     *
     * @param params
     * @returns
     */
    async findEmployeeTask(params) {
        return await this.taskService.getEmployeeTasks(params);
    }
    /**
     * GET my team tasks
     *
     * @param params
     * @returns
     */
    async findTeamTasks(params) {
        return await this.taskService.findTeamTasks(params);
    }
    async findById(id, params) {
        return this.taskService.findById(id, params);
    }
    /**
     * GET tasks by employee
     *
     * @param employeeId
     * @param findInput
     * @returns
     */
    async getAllTasksByEmployee(employeeId, params) {
        return await this.taskService.getAllTasksByEmployee(employeeId, params);
    }
    async findAll(params) {
        return await this.taskService.findAll(params);
    }
    async create(entity) {
        return await this.commandBus.execute(new commands_1.TaskCreateCommand(entity));
    }
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.TaskUpdateCommand(id, entity));
    }
    async delete(id) {
        return await this.taskService.delete(id);
    }
    async deleteEmployeeFromTasks(employeeId, organizationTeamId) {
        return await this.taskService.unassignEmployeeFromTeamTasks(employeeId, organizationTeamId);
    }
};
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('count'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CountQueryDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getCount", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find maximum task number.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found maximum task number',
        type: task_entity_1.Task
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('max-number'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TaskMaxNumberQueryDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getMaxTaskNumberByProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find my tasks.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tasks',
        type: task_entity_1.Task
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('me'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findMyTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find employee tasks.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tasks',
        type: task_entity_1.Task
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('employee'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findEmployeeTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find my team tasks.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tasks',
        type: task_entity_1.Task
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('team'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findTeamTasks", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.GetTaskByIdDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find Employee Task.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found Employee Task',
        type: task_entity_1.Task
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)('employee/:id'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTasksByEmployee", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all tasks.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tasks',
        type: task_entity_1.Task
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create a task' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TASK_ADD),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CreateTaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing task' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TASK_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.UpdateTaskDTO]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TASK_DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TASK_EDIT),
    (0, common_1.Delete)('employee/:employeeId'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('employeeId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('organizationTeamId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteEmployeeFromTasks", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('Tasks'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [task_service_1.TaskService, cqrs_1.CommandBus])
], TaskController);
//# sourceMappingURL=task.controller.js.map