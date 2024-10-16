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
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const guards_1 = require("./../../shared/guards");
const decorators_1 = require("./../../shared/decorators");
const pipes_1 = require("../../shared/pipes");
const activity_service_1 = require("./activity.service");
const activity_map_service_1 = require("./activity.map.service");
const query_1 = require("./dto/query");
let ActivityController = exports.ActivityController = class ActivityController {
    activityService;
    activityMapService;
    constructor(activityService, activityMapService) {
        this.activityService = activityService;
        this.activityMapService = activityMapService;
    }
    async getActivities(options) {
        const defaultParams = {
            page: 0,
            limit: 30
        };
        options = Object.assign({}, defaultParams, options);
        return await this.activityService.getActivities(options);
    }
    async getDailyActivities(options) {
        return await this.activityService.getDailyActivities(options);
    }
    async getDailyActivitiesReport(options) {
        let activities = await this.activityService.getDailyActivitiesReport(options);
        if (options.groupBy === contracts_1.ReportGroupFilterEnum.date) {
            activities = this.activityMapService.mapByDate(activities);
        }
        else if (options.groupBy === contracts_1.ReportGroupFilterEnum.employee) {
            activities = this.activityMapService.mapByEmployee(activities);
        }
        else if (options.groupBy === contracts_1.ReportGroupFilterEnum.project) {
            activities = this.activityMapService.mapByProject(activities);
        }
        return activities;
    }
    async bulkSaveActivities(entities) {
        return await this.activityService.bulkSave(entities);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Activities' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.ActivityQueryDTO]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Daily Activities' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)('daily'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.ActivityQueryDTO]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getDailyActivities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Daily Activities' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)('report'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.ActivityQueryDTO]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getDailyActivitiesReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Save bulk Activities' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "bulkSaveActivities", null);
exports.ActivityController = ActivityController = __decorate([
    (0, swagger_1.ApiTags)('Activity'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.TIME_TRACKER, contracts_1.PermissionsEnum.TIMESHEET_EDIT_TIME),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [activity_service_1.ActivityService,
        activity_map_service_1.ActivityMapService])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map