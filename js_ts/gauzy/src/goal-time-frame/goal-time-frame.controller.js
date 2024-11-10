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
exports.GoalTimeFrameController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const goal_time_frame_entity_1 = require("./goal-time-frame.entity");
const swagger_1 = require("@nestjs/swagger");
const goal_time_frame_service_1 = require("./goal-time-frame.service");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const dto_1 = require("./dto");
let GoalTimeFrameController = exports.GoalTimeFrameController = class GoalTimeFrameController extends crud_1.CrudController {
    goalTimeFrameService;
    constructor(goalTimeFrameService) {
        super(goalTimeFrameService);
        this.goalTimeFrameService = goalTimeFrameService;
    }
    async findAll(data) {
        const { findInput } = data;
        return this.goalTimeFrameService.findAll({
            where: { ...findInput }
        });
    }
    async create(entity) {
        return this.goalTimeFrameService.create(entity);
    }
    async getByName(name) {
        return this.goalTimeFrameService.findAll({ where: { name: name } });
    }
    async update(id, entity) {
        try {
            return await this.goalTimeFrameService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        return this.goalTimeFrameService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all Goal Time Frames' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found all Time Frames'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Time Frame found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalTimeFrameController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Goal Time Frame' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Time Frame added successfully',
        type: goal_time_frame_entity_1.GoalTimeFrame
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateGoalTimeFrameDTO]),
    __metadata("design:returntype", Promise)
], GoalTimeFrameController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Goal Time Frames with name' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found all Time Frames'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No Time Frame found'
    }),
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalTimeFrameController.prototype, "getByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateGoalTimeFrameDTO]),
    __metadata("design:returntype", Promise)
], GoalTimeFrameController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalTimeFrameController.prototype, "delete", null);
exports.GoalTimeFrameController = GoalTimeFrameController = __decorate([
    (0, swagger_1.ApiTags)('GoalTimeFrame'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [goal_time_frame_service_1.GoalTimeFrameService])
], GoalTimeFrameController);
//# sourceMappingURL=goal-time-frame.controller.js.map