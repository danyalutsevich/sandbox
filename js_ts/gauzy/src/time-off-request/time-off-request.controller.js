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
exports.TimeOffRequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const time_off_request_entity_1 = require("./time-off-request.entity");
const time_off_request_service_1 = require("./time-off-request.service");
const commands_1 = require("./commands");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
let TimeOffRequestController = exports.TimeOffRequestController = class TimeOffRequestController extends crud_1.CrudController {
    timeOffRequestService;
    commandBus;
    constructor(timeOffRequestService, commandBus) {
        super(timeOffRequestService);
        this.timeOffRequestService = timeOffRequestService;
        this.commandBus = commandBus;
    }
    async pagination(options) {
        return await this.timeOffRequestService.pagination(options);
    }
    /**
     * UPDATE time off request approved
     *
     * @param id
     * @returns
     */
    async timeOffRequestApproved(id) {
        return this.commandBus.execute(new commands_1.TimeOffStatusCommand(id, index_1.StatusTypesEnum.APPROVED));
    }
    /**
     * UPDATE time off request denied
     *
     * @param id
     * @returns
     */
    async timeOffRequestDenied(id) {
        return this.commandBus.execute(new commands_1.TimeOffStatusCommand(id, index_1.StatusTypesEnum.DENIED));
    }
    /**
     * GET all time off requests
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.timeOffRequestService.getAllTimeOffRequests(relations, findInput);
    }
    /**
     * CREATE new time off request/holiday
     *
     * @param entity
     * @param options
     * @returns
     */
    async create(entity) {
        return this.timeOffRequestService.create(entity);
    }
    /**
     * UPDATE time off request by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return this.timeOffRequestService.updateTimeOffByAdmin(id, entity);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_TIME_OFF_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], TimeOffRequestController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Time off request approved' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Approved time off request',
        type: time_off_request_entity_1.TimeOffRequest
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.RoleGuard, guards_1.PermissionGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.TIME_OFF_EDIT),
    (0, common_1.Put)('approval/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeOffRequestController.prototype, "timeOffRequestApproved", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Time off request denied' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Denied time off request',
        type: time_off_request_entity_1.TimeOffRequest
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.RoleGuard, guards_1.PermissionGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.TIME_OFF_EDIT),
    (0, common_1.Put)('denied/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeOffRequestController.prototype, "timeOffRequestDenied", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all time off requests.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found time off requests',
        type: time_off_request_entity_1.TimeOffRequest
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_TIME_OFF_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeOffRequestController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new time off request / holiday record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The new time off request / holiday record created'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.TIME_OFF_EDIT),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeOffRequestController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Time off request update' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found request time off',
        type: time_off_request_entity_1.TimeOffRequest
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.TIME_OFF_EDIT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TimeOffRequestController.prototype, "update", null);
exports.TimeOffRequestController = TimeOffRequestController = __decorate([
    (0, swagger_1.ApiTags)('TimeOffRequest'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [time_off_request_service_1.TimeOffRequestService,
        cqrs_1.CommandBus])
], TimeOffRequestController);
//# sourceMappingURL=time-off-request.controller.js.map