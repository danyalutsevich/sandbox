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
exports.CandidateFeedbacksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_feedbacks_entity_1 = require("./candidate-feedbacks.entity");
const candidate_feedbacks_service_1 = require("./candidate-feedbacks.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
let CandidateFeedbacksController = exports.CandidateFeedbacksController = class CandidateFeedbacksController extends crud_1.CrudController {
    candidateFeedbacksService;
    commandBus;
    constructor(candidateFeedbacksService, commandBus) {
        super(candidateFeedbacksService);
        this.candidateFeedbacksService = candidateFeedbacksService;
        this.commandBus = commandBus;
    }
    /**
     * GET feedback by interview id
     *
     * @param interviewId
     * @returns
     */
    async findByInterviewId(interviewId) {
        return this.candidateFeedbacksService.getFeedbacksByInterviewId(interviewId);
    }
    /**
     * DELETE feedback by interview id
     *
     * @param interviewId
     * @param feedbackId
     * @returns
     */
    async deleteFeedback(interviewId, feedbackId) {
        return await this.commandBus.execute(new commands_1.FeedbackDeleteCommand(feedbackId, interviewId));
    }
    /**
     * GET candidate feedback count
     *
     * @param filter
     * @returns
     */
    async getCount(options) {
        return await this.candidateFeedbacksService.countBy(options);
    }
    /**
     * GET candidate feedbacks by pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter) {
        return this.candidateFeedbacksService.paginate(filter);
    }
    /**
     * GET all candidate feedbacks
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations = [], findInput = null } = data;
        return this.candidateFeedbacksService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * GET candidate feedback by id
     *
     * @param id
     * @returns
     */
    async findById(id) {
        return this.candidateFeedbacksService.findOneByIdString(id);
    }
    /**
     * CREATE candidate feedback
     *
     * @param body
     * @returns
     */
    async create(body) {
        return this.candidateFeedbacksService.create(body);
    }
    /**
     * UPDATE candidate feedback by id
     *
     * @param id
     * @param body
     * @returns
     */
    async update(id, body) {
        return this.commandBus.execute(new commands_1.FeedbackUpdateCommand(id, body));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find feedbacks By Interview Id.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate feedbacks',
        type: candidate_feedbacks_entity_1.CandidateFeedback
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.PermissionGuard)
    // TO DO
    // @Permissions(PermissionsEnum.ORG_CANDIDATES_FEEDBACK_EDIT) TO DO
    ,
    (0, common_1.Get)('interview/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateFeedbacksController.prototype, "findByInterviewId", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_FEEDBACK_EDIT),
    (0, common_1.Delete)('interview/:interviewId/:feedbackId'),
    __param(0, (0, common_1.Param)('interviewId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Param)('feedbackId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CandidateFeedbacksController.prototype, "deleteFeedback", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidate feedbacks counts in the same tenant' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidates feedback count'
    }),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateFeedbacksController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidate feedbacks in the same tenant using pagination.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidates in the tenant',
        type: candidate_feedbacks_entity_1.CandidateFeedback
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
], CandidateFeedbacksController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate feedback.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate feedback',
        type: candidate_feedbacks_entity_1.CandidateFeedback
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
], CandidateFeedbacksController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find candidate feedback by id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate feedback',
        type: candidate_feedbacks_entity_1.CandidateFeedback
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateFeedbacksController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_FEEDBACK_EDIT),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateFeedbacksController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_FEEDBACK_EDIT),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CandidateFeedbacksController.prototype, "update", null);
exports.CandidateFeedbacksController = CandidateFeedbacksController = __decorate([
    (0, swagger_1.ApiTags)('CandidateFeedback'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_feedbacks_service_1.CandidateFeedbacksService,
        cqrs_1.CommandBus])
], CandidateFeedbacksController);
//# sourceMappingURL=candidate-feedbacks.controller.js.map