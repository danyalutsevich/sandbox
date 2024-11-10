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
exports.TimeSlotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const contracts_1 = require("../../../plugins/contracts");
const commands_1 = require("./commands");
const time_slot_service_1 = require("./time-slot.service");
const time_slot_entity_1 = require("./time-slot.entity");
const guards_1 = require("../../shared/guards");
const pipes_1 = require("./../../shared/pipes");
const decorators_1 = require("./../../shared/decorators");
const dto_1 = require("./dto");
const query_1 = require("./dto/query");
let TimeSlotController = exports.TimeSlotController = class TimeSlotController {
    timeSlotService;
    commandBus;
    constructor(timeSlotService, commandBus) {
        this.timeSlotService = timeSlotService;
        this.commandBus = commandBus;
    }
    /**
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        return await this.timeSlotService.getTimeSlots(options);
    }
    /**
     *
     * @param id
     * @param options
     * @returns
     */
    async findById(id, options) {
        return await this.timeSlotService.findOneByIdString(id, options);
    }
    /**
     *
     * @param entity
     * @returns
     */
    async create(requst) {
        return await this.commandBus.execute(new commands_1.CreateTimeSlotCommand(requst));
    }
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, request) {
        return await this.commandBus.execute(new commands_1.UpdateTimeSlotCommand(id, request));
    }
    /**
     *
     * @param query
     * @returns
     */
    async deleteTimeSlot(query) {
        return await this.commandBus.execute(new commands_1.DeleteTimeSlotCommand(query));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Time Slots' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true, transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_1.TimeSlotQueryDTO]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Time Slot By Id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Time Slot' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Time Slot' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.OrganizationPermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.ALLOW_MODIFY_TIME),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, time_slot_entity_1.TimeSlot]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete TimeSlot' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The time slot has been successfully deleted.'
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
    __metadata("design:paramtypes", [dto_1.DeleteTimeSlotDTO]),
    __metadata("design:returntype", Promise)
], TimeSlotController.prototype, "deleteTimeSlot", null);
exports.TimeSlotController = TimeSlotController = __decorate([
    (0, swagger_1.ApiTags)('TimeSlot'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(contracts_1.PermissionsEnum.TIME_TRACKER, contracts_1.PermissionsEnum.ALL_ORG_EDIT, contracts_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [time_slot_service_1.TimeSlotService, cqrs_1.CommandBus])
], TimeSlotController);
//# sourceMappingURL=time-slot.controller.js.map