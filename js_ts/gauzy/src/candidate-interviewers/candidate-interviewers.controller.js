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
exports.CandidateInterviewersController = void 0;
const candidate_interviewers_entity_1 = require("./candidate-interviewers.entity");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_interviewers_service_1 = require("./candidate-interviewers.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
let CandidateInterviewersController = exports.CandidateInterviewersController = class CandidateInterviewersController extends crud_1.CrudController {
    candidateInterviewersService;
    commandBus;
    constructor(candidateInterviewersService, commandBus) {
        super(candidateInterviewersService);
        this.candidateInterviewersService = candidateInterviewersService;
        this.commandBus = commandBus;
    }
    /**
     * CREATE bulk candidate interviewers
     *
     * @param body
     * @returns
     */
    async createBulk(body) {
        return await this.commandBus.execute(new commands_1.CandidateInterviewersBulkCreateCommand(body));
    }
    /**
     * GET candidate interviewers by interview id
     *
     * @param interviewId
     * @returns
     */
    async findByInterviewId(interviewId) {
        return await this.candidateInterviewersService.getInterviewersByInterviewId(interviewId);
    }
    /**
     * DELETE bulk interviewer by interview id
     *
     * @param id
     * @returns
     */
    async deleteBulkByInterviewId(id) {
        return await this.commandBus.execute(new commands_1.CandidateInterviewersInterviewBulkDeleteCommand(id));
    }
    /**
     * DELETE candidate interviewers by bulk employee ids
     *
     * @param data
     * @returns
     */
    async deleteBulkByEmployeeId(data) {
        const { deleteInput = null } = data;
        return this.commandBus.execute(new commands_1.CandidateInterviewersEmployeeBulkDeleteCommand(deleteInput));
    }
    /**
     * GET all candidate interviewers
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { findInput = null } = data;
        return this.candidateInterviewersService.findAll({ where: findInput });
    }
    /**
     * CREATE candidate interviewer
     *
     * @param body
     * @returns
     */
    async create(body) {
        return this.candidateInterviewersService.create(body);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create interviewers in Bulk' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Interviewers have been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewersController.prototype, "createBulk", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find Interviewers By Interview Id.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interviewers',
        type: candidate_interviewers_entity_1.CandidateInterviewers
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_INTERVIEWERS_VIEW),
    (0, common_1.Get)('interview/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateInterviewersController.prototype, "findByInterviewId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete Interviewers By Interview Id.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interviewers',
        type: candidate_interviewers_entity_1.CandidateInterviewers
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Delete)('interview/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateInterviewersController.prototype, "deleteBulkByInterviewId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete Interviewers By employeeId.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interviewers',
        type: candidate_interviewers_entity_1.CandidateInterviewers
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Delete)('deleteBulkByEmployeeId'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewersController.prototype, "deleteBulkByEmployeeId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate interviewers.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate interviewers',
        type: candidate_interviewers_entity_1.CandidateInterviewers
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_INTERVIEWERS_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create new record interviewers'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Success Add Interviewers',
        type: candidate_interviewers_entity_1.CandidateInterviewers
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateInterviewersController.prototype, "create", null);
exports.CandidateInterviewersController = CandidateInterviewersController = __decorate([
    (0, swagger_1.ApiTags)('CandidateInterviewer'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_INTERVIEWERS_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_interviewers_service_1.CandidateInterviewersService,
        cqrs_1.CommandBus])
], CandidateInterviewersController);
//# sourceMappingURL=candidate-interviewers.controller.js.map