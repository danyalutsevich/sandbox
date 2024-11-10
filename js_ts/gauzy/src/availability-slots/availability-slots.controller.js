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
exports.AvailabilitySlotsController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const availability_slots_entity_1 = require("./availability-slots.entity");
const availability_slots_service_1 = require("./availability-slots.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
let AvailabilitySlotsController = exports.AvailabilitySlotsController = class AvailabilitySlotsController extends crud_1.CrudController {
    availabilitySlotsService;
    commandBus;
    constructor(availabilitySlotsService, commandBus) {
        super(availabilitySlotsService);
        this.availabilitySlotsService = availabilitySlotsService;
        this.commandBus = commandBus;
    }
    /**
     * CREATE slots in bulk
     *
     * @param entity
     * @returns
     */
    async createBulkAvailabilitySlot(entity) {
        return await this.commandBus.execute(new commands_1.AvailabilitySlotsBulkCreateCommand(entity));
    }
    /**
     * GET all availability slots
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.availabilitySlotsService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE new availability slot
     *
     * @param entity
     * @param options
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.AvailabilitySlotsCreateCommand(entity));
    }
    /**
     * UPDATE availability slot by id
     *
     * @param id
     * @param entity
     * @param options
     * @returns
     */
    async update(id, entity) {
        return this.availabilitySlotsService.create({
            id,
            ...entity
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create slots in bulk' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The records have been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('/bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AvailabilitySlotsController.prototype, "createBulkAvailabilitySlot", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all availability slots' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found availability slots',
        type: availability_slots_entity_1.AvailabilitySlot
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvailabilitySlotsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvailabilitySlotsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AvailabilitySlotsController.prototype, "update", null);
exports.AvailabilitySlotsController = AvailabilitySlotsController = __decorate([
    (0, swagger_1.ApiTags)('AvailabilitySlots'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [availability_slots_service_1.AvailabilitySlotsService,
        cqrs_1.CommandBus])
], AvailabilitySlotsController);
//# sourceMappingURL=availability-slots.controller.js.map