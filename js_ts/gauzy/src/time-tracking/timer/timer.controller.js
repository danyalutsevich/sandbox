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
exports.TimerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_1 = require("../../../plugins/contracts");
const timer_service_1 = require("./timer.service");
const guards_1 = require("./../../shared/guards");
const decorators_1 = require("./../../shared/decorators");
const pipes_1 = require("../../shared/pipes");
const dto_1 = require("./dto");
let TimerController = exports.TimerController = class TimerController {
    timerService;
    constructor(timerService) {
        this.timerService = timerService;
    }
    /**
     * GET timer today's status
     *
     * @param query
     * @returns
     */
    async getTimerStatus(query) {
        return await this.timerService.getTimerStatus(query);
    }
    /**
     * GET timer last worked status
     *
     * @param query
     * @returns
     */
    async getTimerWorkedStatus(query) {
        return await this.timerService.getTimerWorkedStatus(query);
    }
    /**
     *
     * @param entity
     * @returns
     */
    async toggleTimer(entity) {
        return await this.timerService.toggleTimeLog(entity);
    }
    /**
     *
     * @param entity
     * @returns
     */
    async startTimer(entity) {
        console.log('----------------------------------Start Timer----------------------------------', entity);
        return await this.timerService.startTimer(entity);
    }
    /**
     *
     * @param entity
     * @returns
     */
    async stopTimer(entity) {
        console.log('----------------------------------Stop Timer----------------------------------', entity);
        return await this.timerService.stopTimer(entity);
    }
};
__decorate([
    (0, common_1.Get)('/status'),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_VIEW, contracts_1.PermissionsEnum.TIME_TRACKER),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimerStatusQueryDTO]),
    __metadata("design:returntype", Promise)
], TimerController.prototype, "getTimerStatus", null);
__decorate([
    (0, common_1.Get)('/status/worked'),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALL_ORG_VIEW, contracts_1.PermissionsEnum.TIME_TRACKER),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TimerStatusQueryDTO]),
    __metadata("design:returntype", Promise)
], TimerController.prototype, "getTimerWorkedStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Toggle timer' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timer has been successfully On/Off.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('/toggle'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StartTimerDTO]),
    __metadata("design:returntype", Promise)
], TimerController.prototype, "toggleTimer", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Start timer' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timer has been successfully On.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('/start'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StartTimerDTO]),
    __metadata("design:returntype", Promise)
], TimerController.prototype, "startTimer", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Stop timer' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timer has been successfully Off.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('/stop'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StopTimerDTO]),
    __metadata("design:returntype", Promise)
], TimerController.prototype, "stopTimer", null);
exports.TimerController = TimerController = __decorate([
    (0, swagger_1.ApiTags)('Timer Tracker'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.TIME_TRACKER),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [timer_service_1.TimerService])
], TimerController);
//# sourceMappingURL=timer.controller.js.map