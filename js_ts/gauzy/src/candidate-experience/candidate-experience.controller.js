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
exports.CandidateExperienceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_experience_service_1 = require("./candidate-experience.service");
const candidate_experience_entity_1 = require("./candidate-experience.entity");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
let CandidateExperienceController = exports.CandidateExperienceController = class CandidateExperienceController extends crud_1.CrudController {
    candidateExperienceService;
    constructor(candidateExperienceService) {
        super(candidateExperienceService);
        this.candidateExperienceService = candidateExperienceService;
    }
    /**
     * GET candidate experiences by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this.candidateExperienceService.paginate(params);
    }
    /**
     * GET candidate experiences
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this.candidateExperienceService.findAll(params);
    }
    /**
     * CREATE candidate experience
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.candidateExperienceService.create(entity);
    }
    /**
     * UPDATE candidate experience
     *
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.candidateExperienceService.update(id, entity);
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
], CandidateExperienceController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate experience.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate experience',
        type: candidate_experience_entity_1.CandidateExperience
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
], CandidateExperienceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCandidateExperienceDTO]),
    __metadata("design:returntype", Promise)
], CandidateExperienceController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateCandidateExperienceDTO]),
    __metadata("design:returntype", Promise)
], CandidateExperienceController.prototype, "update", null);
exports.CandidateExperienceController = CandidateExperienceController = __decorate([
    (0, swagger_1.ApiTags)('CandidateExperience'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.TenantPermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_experience_service_1.CandidateExperienceService])
], CandidateExperienceController);
//# sourceMappingURL=candidate-experience.controller.js.map