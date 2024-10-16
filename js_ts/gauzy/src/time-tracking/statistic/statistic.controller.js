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
exports.StatisticController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const decorators_1 = require("./../../shared/decorators");
const guards_1 = require("./../../shared/guards");
const pipes_1 = require("../../shared/pipes");
const dto_1 = require("./dto");
const statistic_service_1 = require("./statistic.service");
let StatisticController = exports.StatisticController = class StatisticController {
    statisticService;
    constructor(statisticService) {
        this.statisticService = statisticService;
    }
    /**
     * Retrieve statistics for counts based on the provided query parameters.
     * @summary Get statistics for counts.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching count statistics.
     * @returns {Promise<ICountsStatistics>} - Statistics for counts.
     */
    async getCountsStatistics(request) {
        return await this.statisticService.getCounts(request);
    }
    /**
     * Retrieve statistics for members based on the provided query parameters.
     * @summary Get statistics for members.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching member statistics.
     * @returns {Promise<IMembersStatistics[]>} - An array of statistics for members.
     */
    async getMembersStatistics(request) {
        return await this.statisticService.getMembers(request);
    }
    /**
     * Retrieve statistics for projects based on the provided query parameters.
     * @summary Get statistics for projects.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching project statistics.
     * @returns {Promise<IProjectsStatistics[]>} - An array of statistics for projects.
     */
    async getProjectsStatistics(request) {
        return await this.statisticService.getProjects(request);
    }
    /**
     * Retrieve statistics for tasks based on the provided query parameters.
     * @summary Get statistics for tasks.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching task statistics.
     * @returns {Promise<ITask[]>} - An array of statistics for tasks.
     */
    async getTasksStatistics(request) {
        return await this.statisticService.getTasks(request);
    }
    /**
     * Retrieve statistics for manual times based on the provided query parameters.
     * @summary Get statistics for manual times.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching manual times statistics.
     * @returns {Promise<IManualTimesStatistics[]>} - An array of statistics for manual times.
     */
    async getManualTimesStatistics(request) {
        return await this.statisticService.manualTimes(request);
    }
    /**
     * Retrieve statistics for employee time slots based on the provided query parameters.
     * @summary Get statistics for employee time slots.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching employee time slot statistics.
     * @returns {Promise<ITimeSlotStatistics[]>} - An array of statistics for employee time slots.
     */
    async getEmployeeTimeSlotsStatistics(request) {
        return await this.statisticService.getEmployeeTimeSlots(request);
    }
    /**
     * Get statistics for activities based on the provided query parameters.
     * @summary Retrieve statistics for activities.
     * @param {TimeTrackingStatisticQueryDTO} request - The query parameters for fetching activity statistics.
     * @returns {Promise<IActivitiesStatistics[]>} - An array of activity statistics.
     */
    async getActivitiesStatistics(request) {
        return await this.statisticService.getActivities(request);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Counts',
        description: 'Endpoint to retrieve statistics for counts based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved statistics for counts.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/counts'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getCountsStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Members',
        description: 'Endpoint to retrieve statistics for members based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved statistics for members.',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/members'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getMembersStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Projects',
        description: 'Endpoint to retrieve statistics for projects based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved statistics for projects.',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/projects'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getProjectsStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Tasks',
        description: 'Endpoint to retrieve statistics for tasks based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved statistics for tasks.',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/tasks'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getTasksStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Manual Times',
        description: 'Endpoint to retrieve statistics for manual times based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved statistics for manual times.',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/manual-times'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getManualTimesStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Employee Time Slots',
        description: 'Endpoint to retrieve statistics for employee time slots based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved statistics for employee time slots.',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/time-slots'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getEmployeeTimeSlotsStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get Statistics for Activities',
        description: 'Endpoint to retrieve statistics for activities based on the provided query parameters.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved activity statistics.',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('/activities'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimeTrackingStatisticQueryDTO]),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getActivitiesStatistics", null);
exports.StatisticController = StatisticController = __decorate([
    (0, swagger_1.ApiTags)('TimesheetStatistic'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ADMIN_DASHBOARD_VIEW, contracts_1.PermissionsEnum.TIME_TRACKER, contracts_1.PermissionsEnum.ALL_ORG_EDIT, contracts_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [statistic_service_1.StatisticService])
], StatisticController);
//# sourceMappingURL=statistic.controller.js.map