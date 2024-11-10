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
exports.CandidatePersonalQualitiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const candidate_personal_qualities_entity_1 = require("./candidate-personal-qualities.entity");
const candidate_personal_qualities_service_1 = require("./candidate-personal-qualities.service");
const commands_1 = require("./commands");
let CandidatePersonalQualitiesController = exports.CandidatePersonalQualitiesController = class CandidatePersonalQualitiesController extends crud_1.CrudController {
    candidatePersonalQualitiesService;
    commandBus;
    constructor(candidatePersonalQualitiesService, commandBus) {
        super(candidatePersonalQualitiesService);
        this.candidatePersonalQualitiesService = candidatePersonalQualitiesService;
        this.commandBus = commandBus;
    }
    /**
     * GET candidate personal qualities by interview id
     *
     * @param interviewId
     * @returns
     */
    async findByInterviewId(interviewId) {
        return this.candidatePersonalQualitiesService.getPersonalQualitiesByInterviewId(interviewId);
    }
    /**
     * DELETE bulk candidate personal qualities by id
     *
     * @param id
     * @param data
     * @returns
     */
    async deleteBulk(id, data) {
        const { personalQualities = null } = data;
        return this.commandBus.execute(new commands_1.CandidatePersonalQualitiesBulkDeleteCommand(id, personalQualities));
    }
    /**
     * CREATE bulk candidate personal qualities
     *
     * @param body
     * @returns
     */
    async createBulk(body) {
        const { interviewId = null, personalQualities = [] } = body;
        return this.commandBus.execute(new commands_1.CandidatePersonalQualitiesBulkCreateCommand(interviewId, personalQualities));
    }
    /**
     * GET all candidate personal qualities
     *
     * @param data
     * @returns
     */
    findAll(data) {
        const { findInput, relations } = data;
        return this.candidatePersonalQualitiesService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE candidate personal quality
     *
     * @param data
     * @returns
     */
    async create(data) {
        return this.candidatePersonalQualitiesService.create(data);
    }
    /**
     * DELETE candidate personal qualities by id
     *
     * @param id
     * @returns
     */
    delete(id) {
        return this.candidatePersonalQualitiesService.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Get)('interview/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatePersonalQualitiesController.prototype, "findByInterviewId", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Delete)('bulk/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CandidatePersonalQualitiesController.prototype, "deleteBulk", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidatePersonalQualitiesController.prototype, "createBulk", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidate personal qualities.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate personal qualities',
        type: candidate_personal_qualities_entity_1.CandidatePersonalQualities
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidatePersonalQualitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidatePersonalQualitiesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidatePersonalQualitiesController.prototype, "delete", null);
exports.CandidatePersonalQualitiesController = CandidatePersonalQualitiesController = __decorate([
    (0, swagger_1.ApiTags)('CandidatePersonalQuality'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_personal_qualities_service_1.CandidatePersonalQualitiesService,
        cqrs_1.CommandBus])
], CandidatePersonalQualitiesController);
//# sourceMappingURL=candidate-personal-qualities.controller.js.map