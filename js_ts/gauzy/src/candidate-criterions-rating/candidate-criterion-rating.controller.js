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
exports.CandidateCriterionsRatingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_criterion_rating_service_1 = require("./candidate-criterion-rating.service");
const candidate_criterion_rating_entity_1 = require("./candidate-criterion-rating.entity");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
let CandidateCriterionsRatingController = exports.CandidateCriterionsRatingController = class CandidateCriterionsRatingController extends crud_1.CrudController {
    candidateCriterionsRatingService;
    commandBus;
    constructor(candidateCriterionsRatingService, commandBus) {
        super(candidateCriterionsRatingService);
        this.candidateCriterionsRatingService = candidateCriterionsRatingService;
        this.commandBus = commandBus;
    }
    /**
     * CREATE bulk candidate criterions rating
     *
     * @param body
     * @returns
     */
    async createBulk(body) {
        const { feedbackId = null, technologies = [], qualities = [] } = body;
        return await this.commandBus.execute(new commands_1.CandidateCriterionsRatingBulkCreateCommand(feedbackId, technologies, qualities));
    }
    /**
     * UPDATE bulk candidate criterions rating
     *
     * @param body
     * @returns
     */
    async updateBulk(body) {
        return await this.commandBus.execute(new commands_1.CandidateCriterionsRatingBulkUpdateCommand(body));
    }
    /**
     * GET candidate criterions rating
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this.candidateCriterionsRatingService.findAll(params);
    }
    /**
     * DELETE candidate criterions rating by feedback id
     *
     * @param feedbackId
     * @returns
     */
    async deleteBulkByFeedbackId(feedbackId) {
        return await this.commandBus.execute(new commands_1.CandidateCriterionsRatingBulkDeleteCommand(feedbackId));
    }
};
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateCriterionsRatingController.prototype, "createBulk", null);
__decorate([
    (0, common_1.Put)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateCriterionsRatingController.prototype, "updateBulk", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate criterion rating.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate criterion rating',
        type: candidate_criterion_rating_entity_1.CandidateCriterionsRating
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_INTERVIEW_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateCriterionsRatingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)('feedback/:feedbackId'),
    __param(0, (0, common_1.Param)('feedbackId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateCriterionsRatingController.prototype, "deleteBulkByFeedbackId", null);
exports.CandidateCriterionsRatingController = CandidateCriterionsRatingController = __decorate([
    (0, swagger_1.ApiTags)('CandidateCriterionRating'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_INTERVIEW_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_criterion_rating_service_1.CandidateCriterionsRatingService,
        cqrs_1.CommandBus])
], CandidateCriterionsRatingController);
//# sourceMappingURL=candidate-criterion-rating.controller.js.map