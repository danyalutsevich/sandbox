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
exports.GoalKpiTemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const goal_kpi_template_entity_1 = require("./goal-kpi-template.entity");
const goal_kpi_template_service_1 = require("./goal-kpi-template.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let GoalKpiTemplateController = exports.GoalKpiTemplateController = class GoalKpiTemplateController extends crud_1.CrudController {
    goalKpiTemplateService;
    constructor(goalKpiTemplateService) {
        super(goalKpiTemplateService);
        this.goalKpiTemplateService = goalKpiTemplateService;
    }
    /**
     * GET all goal kpi templates
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.goalKpiTemplateService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE goal kpi template
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return this.goalKpiTemplateService.create(entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all goal kpi templates.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found goal kpi templates',
        type: goal_kpi_template_entity_1.GoalKPITemplate
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
], GoalKpiTemplateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create goal kpi template' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Goal kpi template created successfully',
        type: goal_kpi_template_entity_1.GoalKPITemplate
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_kpi_template_entity_1.GoalKPITemplate]),
    __metadata("design:returntype", Promise)
], GoalKpiTemplateController.prototype, "create", null);
exports.GoalKpiTemplateController = GoalKpiTemplateController = __decorate([
    (0, swagger_1.ApiTags)('GoalKpiTemplate'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [goal_kpi_template_service_1.GoalKpiTemplateService])
], GoalKpiTemplateController);
//# sourceMappingURL=goal-kpi-template.controller.js.map