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
exports.GoalTemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const goal_template_service_1 = require("./goal-template.service");
const crud_1 = require("./../core/crud");
const goal_template_entity_1 = require("./goal-template.entity");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let GoalTemplateController = exports.GoalTemplateController = class GoalTemplateController extends crud_1.CrudController {
    goalTemplateService;
    constructor(goalTemplateService) {
        super(goalTemplateService);
        this.goalTemplateService = goalTemplateService;
    }
    /**
     * GET all goal templates
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { findInput } = data;
        return this.goalTemplateService.findAll({
            relations: ['keyResults', 'keyResults.kpi'],
            where: { ...findInput }
        });
    }
    /**
     * CREATE goal template
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return this.goalTemplateService.create(entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find goal templates.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found goal templates',
        type: goal_template_entity_1.GoalTemplate
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
], GoalTemplateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Goal Template' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Goal Template Created successfully',
        type: goal_template_entity_1.GoalTemplate
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [goal_template_entity_1.GoalTemplate]),
    __metadata("design:returntype", Promise)
], GoalTemplateController.prototype, "create", null);
exports.GoalTemplateController = GoalTemplateController = __decorate([
    (0, swagger_1.ApiTags)('GoalTemplates'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [goal_template_service_1.GoalTemplateService])
], GoalTemplateController);
//# sourceMappingURL=goal-template.controller.js.map