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
exports.DailyPlanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const crud_1 = require("../../core/crud");
const pipes_1 = require("../../shared/pipes");
const daily_plan_entity_1 = require("./daily-plan.entity");
const daily_plan_service_1 = require("./daily-plan.service");
const dto_1 = require("./dto");
const guards_1 = require("../../shared/guards");
const decorators_1 = require("../../shared/decorators");
let DailyPlanController = exports.DailyPlanController = class DailyPlanController extends crud_1.CrudController {
    dailyPlanService;
    constructor(dailyPlanService) {
        super(dailyPlanService);
        this.dailyPlanService = dailyPlanService;
    }
    /**
     * GET my daily plans
     *
     * @param options
     * @returns
     */
    async getMyPlans(params) {
        return await this.dailyPlanService.getMyPlans(params);
    }
    /**
     * GET daily plans for a given employee
     *
     * @param options
     * @param employeeId
     * @returns
     */
    async getEmployeeDailyPlans(employeeId, params) {
        return await this.dailyPlanService.getDailyPlansByEmployee(params, employeeId);
    }
    /**
     * GET daily plans for a given task
     *
     * @param options
     * @param taskId
     * @returns
     */
    async getDailyPlansForTaskId(taskId, params) {
        return await this.dailyPlanService.getDailyPlansByTask(params, taskId);
    }
    /**
     * Add a task to a specified daily plan.
     *
     * @param planId - The unique identifier of the daily plan to which the task will be added.
     * @param input - An object containing details about the task to add, including task ID, employee ID, and organization ID.
     * @returns The updated daily plan with the newly added task.
     */
    async addTaskToDailyPlan(planId, input // Data for updating the daily plan
    ) {
        // Call the service method to add a task to the daily plan
        return await this.dailyPlanService.addTaskToPlan(planId, input);
    }
    /**
     * Remove a task from a specified daily plan.
     *
     * @param planId - The ID of the daily plan from which a task will be removed.
     * @param taskId - The ID of the task to be removed from the daily plan.
     * @param params - Additional query parameters for pagination or filtering.
     * @returns The updated daily plan after the task is removed.
     */
    async removeTaskFromDailyPlan(planId, input // Data for updating the daily plan
    ) {
        // Call the service to remove the task from the daily plan
        return await this.dailyPlanService.removeTaskFromPlan(planId, input);
    }
    /**
     * GET daily plans
     *
     * @param options
     * @returns
     */
    async get(params) {
        return await this.dailyPlanService.getAllPlans(params);
    }
    /**
     * CREATE Daily Plan
     * @param entity Data to create or update the DailyPlan
     */
    async create(entity) {
        return await this.dailyPlanService.createDailyPlan(entity);
    }
    /**
     * UPDATE Daily Plan
     * @param entity - An object with data to update.
     * @param id - The ID of the daily plan from which a task will be removed.
     * @returns the updated daily plan or the update result from typeorm
     * @memberof DailyPlanController
     */
    async update(id, entity) {
        return await this.dailyPlanService.updateDailyPlan(id, entity);
    }
    /**
     * DELETE plan
     *
     * @param {IDailyPlan['id']} planId
     * @returns
     * @memberof DailyPlanController
     */
    async delete(planId) {
        return await this.dailyPlanService.deletePlan(planId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find my daily plans.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found plans',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Record found'
    }),
    (0, common_1.Get)('me'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "getMyPlans", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find employee daily plans.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found plans',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Record found'
    }),
    (0, common_1.Get)('employee/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "getEmployeeDailyPlans", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find task daily plans.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found plans',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Record found'
    }),
    (0, common_1.Get)('task/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "getDailyPlansForTaskId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Add a task to daily plan'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Task added successfully.',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No record found with the given ID.'
    }),
    (0, common_1.Post)(':id/task') // Route for adding a task to a daily plan
    ,
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "addTaskToDailyPlan", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a task from daily plan'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Task successfully removed from the daily plan.',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No record found with the given ID.'
    }),
    (0, common_1.Put)(':id/task') // Endpoint for removing a task from a daily plan
    ,
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "removeTaskFromDailyPlan", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find daily plans.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found plans',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Record found'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "get", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new Daily Plan' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Daily Plan has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The request body must contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDailyPlanDTO]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update daily plan'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Plan updated',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Record found'
    }),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateDailyPlanDTO]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete Daily plan'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Plan deleted',
        type: daily_plan_entity_1.DailyPlan
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Record found'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DailyPlanController.prototype, "delete", null);
exports.DailyPlanController = DailyPlanController = __decorate([
    (0, swagger_1.ApiTags)('Daily Plan'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [daily_plan_service_1.DailyPlanService])
], DailyPlanController);
//# sourceMappingURL=daily-plan.controller.js.map