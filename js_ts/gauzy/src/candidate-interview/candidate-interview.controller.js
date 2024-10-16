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
exports.CandidateInterviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_interview_entity_1 = require("./candidate-interview.entity");
const candidate_interview_service_1 = require("./candidate-interview.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
let CandidateInterviewController = exports.CandidateInterviewController = class CandidateInterviewController extends crud_1.CrudController {
    candidateInterviewService;
    constructor(candidateInterviewService) {
        super(candidateInterviewService);
        this.candidateInterviewService = candidateInterviewService;
    }
    /**
     * GET candidate interviews by candidate id
     *
     * @param id
     * @returns
     */
    async findByCandidateId(id) {
        return await this.candidateInterviewService.findByCandidateId(id);
    }
    /**
     * GET candidate interview count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.candidateInterviewService.countBy(options);
    }
    /**
     * GET candidate interviews by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        return await this.candidateInterviewService.paginate(params);
    }
    /**
     * GET candidate interviews
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this.candidateInterviewService.findAll(params);
    }
    /**
     * GET candidate interview by id
     *
     * @param id
     * @returns
     */
    async findById(id) {
        return this.candidateInterviewService.findOneByIdString(id);
    }
    /**
     * CREATE candidate interview
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this.candidateInterviewService.create(entity);
    }
    /**
     * UPDATE candidate interview by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.candidateInterviewService.update(id, entity);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find interview by candidate id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found interview',
        type: candidate_interview_entity_1.CandidateInterview
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('candidate/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "findByCandidateId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidate interviews count in the same tenant' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interviews count'
    }),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidate interviews in the same tenant using pagination.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interviews in the tenant',
        type: candidate_interview_entity_1.CandidateInterview
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate interview.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interview',
        type: candidate_interview_entity_1.CandidateInterview
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find candidate interview by id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found interview',
        type: candidate_interview_entity_1.CandidateInterview
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create new record interview'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Success Add Interview',
        type: candidate_interview_entity_1.CandidateInterview
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewController.prototype, "update", null);
exports.CandidateInterviewController = CandidateInterviewController = __decorate([
    (0, swagger_1.ApiTags)('CandidateInterview'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_INTERVIEW_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_interview_service_1.CandidateInterviewService])
], CandidateInterviewController);
//# sourceMappingURL=candidate-interview.controller.js.map