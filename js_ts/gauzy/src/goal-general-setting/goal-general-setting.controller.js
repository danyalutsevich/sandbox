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
exports.GoalGeneralSettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const goal_general_setting_entity_1 = require("./goal-general-setting.entity");
const goal_general_setting_service_1 = require("./goal-general-setting.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let GoalGeneralSettingController = exports.GoalGeneralSettingController = class GoalGeneralSettingController extends crud_1.CrudController {
    goalGeneralSettingService;
    constructor(goalGeneralSettingService) {
        super(goalGeneralSettingService);
        this.goalGeneralSettingService = goalGeneralSettingService;
    }
    async findAll(data) {
        const { findInput = null } = data;
        return this.goalGeneralSettingService.findAll({
            where: { ...findInput }
        });
    }
    async create(entity) {
        return this.goalGeneralSettingService.create(entity);
    }
    async update(id, entity) {
        try {
            //We are using create here because create calls the method save()
            //We need save() to save ManyToMany relations
            return await this.goalGeneralSettingService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalGeneralSettingController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Goal General Setting' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Goal general setting Created successfully',
        type: goal_general_setting_entity_1.GoalGeneralSetting
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateGoalGeneralSettingDTO]),
    __metadata("design:returntype", Promise)
], GoalGeneralSettingController.prototype, "create", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdateGoalGeneralSettingDTO]),
    __metadata("design:returntype", Promise)
], GoalGeneralSettingController.prototype, "update", null);
exports.GoalGeneralSettingController = GoalGeneralSettingController = __decorate([
    (0, swagger_1.ApiTags)('GoalGeneralSetting'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [goal_general_setting_service_1.GoalGeneralSettingService])
], GoalGeneralSettingController);
//# sourceMappingURL=goal-general-setting.controller.js.map