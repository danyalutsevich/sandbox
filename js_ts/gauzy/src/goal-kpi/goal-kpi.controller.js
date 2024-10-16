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
exports.GoalKpiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const goal_kpi_entity_1 = require("./goal-kpi.entity");
const goal_kpi_service_1 = require("./goal-kpi.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let GoalKpiController = exports.GoalKpiController = class GoalKpiController extends crud_1.CrudController {
    goalKpiService;
    constructor(goalKpiService) {
        super(goalKpiService);
        this.goalKpiService = goalKpiService;
    }
    async findAll(data) {
        const { findInput } = data;
        return this.goalKpiService.findAll({
            where: { ...findInput },
            relations: ['lead']
        });
    }
    async create(entity) {
        return this.goalKpiService.create(entity);
    }
    async update(id, entity) {
        try {
            return await this.goalKpiService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async delete(id) {
        return this.goalKpiService.delete(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all KPI' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found all KPI'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No KPI found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoalKpiController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Goal KPI' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'KPI added successfully',
        type: goal_kpi_entity_1.GoalKPI
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_kpi_entity_1.GoalKPI]),
    __metadata("design:returntype", Promise)
], GoalKpiController.prototype, "create", null);
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
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, goal_kpi_entity_1.GoalKPI]),
    __metadata("design:returntype", Promise)
], GoalKpiController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoalKpiController.prototype, "delete", null);
exports.GoalKpiController = GoalKpiController = __decorate([
    (0, swagger_1.ApiTags)('GoalKpi'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [goal_kpi_service_1.GoalKpiService])
], GoalKpiController);
//# sourceMappingURL=goal-kpi.controller.js.map