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
exports.TimeSheetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const contracts_1 = require("../../../plugins/contracts");
const timesheet_service_1 = require("./timesheet.service");
const guards_1 = require("./../../shared/guards");
const pipes_1 = require("./../../shared/pipes");
const decorators_1 = require("./../../shared/decorators");
const query_1 = require("./dto/query");
const commands_1 = require("./commands");
let TimeSheetController = exports.TimeSheetController = class TimeSheetController {
    commandBus;
    timeSheetService;
    constructor(commandBus, timeSheetService) {
        this.commandBus = commandBus;
        this.timeSheetService = timeSheetService;
    }
    /**
     * GET timesheet counts in the same tenant
     *
     * @param options
     * @returns
     */
    async getTimesheetCount(options) {
        try {
            return await this.timeSheetService.getTimeSheetCount(options);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * UPDATE timesheet status
     *
     * @param entity
     * @returns
     */
    async updateTimesheetStatus(entity) {
        return await this.commandBus.execute(new commands_1.TimesheetUpdateStatusCommand(entity));
    }
    /**
     * UPDATE timesheet submit status
     *
     * @param entity
     * @returns
     */
    async submitTimeSheet(entity) {
        return await this.commandBus.execute(new commands_1.TimesheetSubmitCommand(entity));
    }
    /**
     * GET all timesheet in same tenant
     *
     * @param options
     * @returns
     */
    async get(options) {
        try {
            return await this.timeSheetService.getTimeSheets(options);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Find timesheet by id
     *
     * @param id
     * @returns
     */
    async findById(id) {
        try {
            return await this.timeSheetService.findOneByIdString(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get timesheet Count' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get timesheet Count'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)('/count'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimesheetQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeSheetController.prototype, "getTimesheetCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update timesheet' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timesheet has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Put)('/status'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.UpdateTimesheetStatusDTO]),
    __metadata("design:returntype", Promise)
], TimeSheetController.prototype, "updateTimesheetStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Submit timesheet' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The timesheet has been successfully submit.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Put)('/submit'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.SubmitTimesheetStatusDTO]),
    __metadata("design:returntype", Promise)
], TimeSheetController.prototype, "submitTimeSheet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get timesheet' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get timesheet'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimesheetQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeSheetController.prototype, "get", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find timesheet by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found timesheet by id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeSheetController.prototype, "findById", null);
exports.TimeSheetController = TimeSheetController = __decorate([
    (0, swagger_1.ApiTags)('TimeSheet'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.CAN_APPROVE_TIMESHEET),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, timesheet_service_1.TimeSheetService])
], TimeSheetController);
//# sourceMappingURL=timesheet.controller.js.map