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
exports.EventTypeController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const commands_1 = require("./commands");
const event_type_entity_1 = require("./event-type.entity");
const event_type_service_1 = require("./event-type.service");
let EventTypeController = exports.EventTypeController = class EventTypeController extends crud_1.CrudController {
    eventTypeService;
    commandBus;
    constructor(eventTypeService, commandBus) {
        super(eventTypeService);
        this.eventTypeService = eventTypeService;
        this.commandBus = commandBus;
    }
    /**
     * GET event types counts
     *
     * @param filter
     * @returns
     */
    async getCount(options) {
        return this.eventTypeService.countBy(options);
    }
    /**
     * GET event types pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter) {
        return this.eventTypeService.paginate(filter);
    }
    /**
     * GET all event types
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.eventTypeService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * GET event type by id
     *
     * @param id
     * @param data
     * @returns
     */
    async findById(id, data) {
        const { relations = [] } = data;
        return this.eventTypeService.findOneByIdString(id, {
            relations
        });
    }
    /**
     * CREATE new event type
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.commandBus.execute(new commands_1.EventTypeCreateCommand(entity));
    }
    /**
     * UPDATE event type by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return this.eventTypeService.create({
            id,
            ...entity
        });
    }
};
__decorate([
    (0, common_1.Get)('count'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all event types' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found expense',
        type: event_type_entity_1.EventType
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
], EventTypeController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find event type by id.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Find Event type',
        type: event_type_entity_1.EventType
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "findById", null);
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
], EventTypeController.prototype, "create", null);
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
    __metadata("design:paramtypes", [String, event_type_entity_1.EventType]),
    __metadata("design:returntype", Promise)
], EventTypeController.prototype, "update", null);
exports.EventTypeController = EventTypeController = __decorate([
    (0, swagger_1.ApiTags)('EventType'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [event_type_service_1.EventTypeService, cqrs_1.CommandBus])
], EventTypeController);
//# sourceMappingURL=event-type.controller.js.map