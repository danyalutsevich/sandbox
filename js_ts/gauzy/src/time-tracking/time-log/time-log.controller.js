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
exports.TimeLogController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const time_log_service_1 = require("./time-log.service");
const decorators_1 = require("./../../shared/decorators");
const guards_1 = require("./../../shared/guards");
const pipes_1 = require("./../../shared/pipes");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
const pipes_2 = require("./pipes");
const commands_1 = require("./commands");
let TimeLogController = exports.TimeLogController = class TimeLogController {
    timeLogService;
    commandBus;
    constructor(timeLogService, commandBus) {
        this.timeLogService = timeLogService;
        this.commandBus = commandBus;
    }
    /**
     * Get conflicting timer logs based on the provided entity.
     * @param entity The entity with information for checking conflicts.
     * @returns An array of conflicting timer logs.
     */
    async getConflict(request) {
        return await this.commandBus.execute(new commands_1.IGetConflictTimeLogCommand(request));
    }
    /**
     * Get daily report for timer logs based on the provided options.
     * @param options The options for retrieving the daily report.
     * @returns The daily report for timer logs.
     */
    async getDailyReport(options) {
        return await this.timeLogService.getDailyReport(options);
    }
    /**
     * Get chart data for the daily report of timer logs based on the provided options.
     * @param options The options for retrieving the daily report chart data.
     * @returns The chart data for the daily report of timer logs.
     */
    async getDailyReportChartData(options) {
        return await this.timeLogService.getDailyReportCharts(options);
    }
    /**
     * Get report data for the owed amount based on the provided options.
     * @param options The options for retrieving the owed amount report data.
     * @returns The report data for the owed amount.
     */
    async getOwedAmountReport(options) {
        return await this.timeLogService.getOwedAmountReport(options);
    }
    /**
     * Get chart data for the owed amount report based on the provided options.
     * @param options The options for retrieving the owed amount report chart data.
     * @returns The chart data for the owed amount report.
     */
    async getOwedAmountReportChartData(options) {
        return await this.timeLogService.getOwedAmountReportCharts(options);
    }
    /**
     * Get the weekly report for timer logs based on the provided options.
     * @param options The options for retrieving the weekly report.
     * @returns The weekly report for timer logs if found, otherwise null.
     */
    async getWeeklyReport(options) {
        return await this.timeLogService.getWeeklyReport(options);
    }
    /**
     * Get the time limit report for timer logs based on the provided options.
     * @param options The options for retrieving the time limit report.
     * @returns The time limit report for timer logs if found, otherwise null.
     */
    async getTimeLimitReport(options) {
        return await this.timeLogService.getTimeLimit(options);
    }
    /**
     * Get project budget limit based on the provided options.
     * @param options The options for retrieving the project budget limit.
     * @returns The project budget limit if found, otherwise null.
     */
    async getProjectBudgetLimit(options) {
        return await this.timeLogService.getProjectBudgetLimit(options);
    }
    /**
     * Retrieve the client budget limit based on the provided options.
     * @param options The options for retrieving the client budget limit.
     * @returns The client budget limit if found; otherwise, null.
     */
    async clientBudgetLimit(options) {
        return await this.timeLogService.getClientBudgetLimit(options);
    }
    /**
     * Get timer logs based on provided options.
     * @param options The options for querying timer logs.
     * @returns An array of timer logs.
     */
    async getLogs(options) {
        return await this.timeLogService.getTimeLogs(options);
    }
    /**
     * Find time log by ID
     * @param id The ID of the time log.
     * @param options Additional options for finding the time log.
     * @returns The found time log.
     */
    async findById(id, options) {
        return await this.timeLogService.findOneByIdString(id, options);
    }
    /**
     * Add manual time
     * @param entity The data for creating a manual time log.
     * @returns The created manual time log.
     */
    async addManualTime(entity) {
        return await this.timeLogService.addManualTime(entity);
    }
    /**
     * Update time log
     * @param id The ID of the time log entry to be updated.
     * @param entity The updated data for the manual time log.
     * @returns The updated time log entry.
     */
    async updateManualTime(id, entity) {
        return await this.timeLogService.updateManualTime(id, entity);
    }
    /**
     * Delete time log
     * @param deleteQuery The query parameters for deleting time logs.
     */
    async deleteTimeLog(deleteQuery) {
        return await this.timeLogService.deleteTimeLogs(deleteQuery);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Timer Logs Conflict' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved conflicting timer logs',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('conflict'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getConflict", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Timer Log by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the daily report'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No records found for the provided options'
    }),
    (0, common_1.Get)('report/daily'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getDailyReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Timer Log by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the chart data for the daily report'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No records found for the provided options'
    }),
    (0, common_1.Get)('report/daily-chart'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getDailyReportChartData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Owed Amount Report' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the report data for the owed amount'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('report/owed-report'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getOwedAmountReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Owed Amount Report Chart Data' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the chart data for the owed amount report'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)('report/owed-charts'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getOwedAmountReportChartData", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Weekly Report' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the weekly report for timer logs'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No records found for the specified options'
    }),
    (0, common_1.Get)('report/weekly'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getWeeklyReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Time Limit Report' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the time limit report for timer logs'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No records found for the specified options'
    }),
    (0, common_1.Get)('time-limit'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogLimitQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getTimeLimitReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Project Budget Limit' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the project budget limit.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Project budget limit not found.'
    }),
    (0, common_1.Get)('project-budget-limit'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getProjectBudgetLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Client Budget Limit' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved the client budget limit.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Client budget limit not found.'
    }),
    (0, common_1.Get)('client-budget-limit'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "clientBudgetLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Timer Logs' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully retrieved timer logs',
        isArray: true
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeLogQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add manual time' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timer has been successfully On/Off.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.OrganizationPermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALLOW_MANUAL_TIME),
    __param(0, (0, common_1.Body)(pipes_2.TimeLogBodyTransformPipe, new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateManualTimeLogDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "addManualTime", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update time log' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timer has been successfully On/Off.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(guards_1.OrganizationPermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALLOW_MODIFY_TIME),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)(pipes_2.TimeLogBodyTransformPipe, new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateManualTimeLogDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "updateManualTime", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete time log' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The time log has been successfully deleted.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.OrganizationPermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALLOW_DELETE_TIME),
    (0, common_1.Delete)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteTimeLogDTO]),
    __metadata("design:returntype", Promise)
], TimeLogController.prototype, "deleteTimeLog", null);
exports.TimeLogController = TimeLogController = __decorate([
    (0, swagger_1.ApiTags)('TimeLog'),
    (0, common_1.UseGuards)(guards_1.TenantBaseGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.TIME_TRACKER, contracts_1.PermissionsEnum.ALL_ORG_EDIT, contracts_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [time_log_service_1.TimeLogService,
        cqrs_1.CommandBus])
], TimeLogController);
//# sourceMappingURL=time-log.controller.js.map