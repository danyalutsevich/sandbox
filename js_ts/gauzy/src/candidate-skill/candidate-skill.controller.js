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
exports.CandidateSkillController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_skill_entity_1 = require("./candidate-skill.entity");
const candidate_skill_service_1 = require("./candidate-skill.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let CandidateSkillController = exports.CandidateSkillController = class CandidateSkillController extends crud_1.CrudController {
    candidateSkillService;
    constructor(candidateSkillService) {
        super(candidateSkillService);
        this.candidateSkillService = candidateSkillService;
    }
    /**
     * GET candidate skills by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this.candidateSkillService.paginate(params);
    }
    /**
     * GET candidate skills
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this.candidateSkillService.findAll({
            where: params.where
        });
    }
    /**
     * CREATE candidate skill
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.candidateSkillService.create(entity);
    }
    /**
     * UPDATE candidate skill
     *
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.candidateSkillService.update(id, entity);
    }
};
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateSkillController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate skill.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate skill',
        type: candidate_skill_entity_1.CandidateSkill
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateSkillController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCandidateSkillDTO]),
    __metadata("design:returntype", Promise)
], CandidateSkillController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateCandidateSkillDTO]),
    __metadata("design:returntype", Promise)
], CandidateSkillController.prototype, "update", null);
exports.CandidateSkillController = CandidateSkillController = __decorate([
    (0, swagger_1.ApiTags)('CandidateSkill'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_skill_service_1.CandidateSkillService])
], CandidateSkillController);
//# sourceMappingURL=candidate-skill.controller.js.map