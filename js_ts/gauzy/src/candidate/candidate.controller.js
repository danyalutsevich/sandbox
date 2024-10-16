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
exports.CandidateController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_service_1 = require("./candidate.service");
const candidate_entity_1 = require("./candidate.entity");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let CandidateController = exports.CandidateController = class CandidateController extends crud_1.CrudController {
    candidateService;
    commandBus;
    constructor(candidateService, commandBus) {
        super(candidateService);
        this.candidateService = candidateService;
        this.commandBus = commandBus;
    }
    /**
     * CREATE bulk candidate
     *
     * @param body
     * @param languageCode
     * @returns
     */
    async createBulk(entity, themeLanguage, languageCode, originUrl) {
        return await this.commandBus.execute(new commands_1.CandidateBulkCreateCommand(entity.list, themeLanguage || languageCode, originUrl));
    }
    /**
     * GET candidate counts
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.candidateService.countBy(options);
    }
    /**
     * GET candidates by pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this.candidateService.pagination(options);
    }
    /**
     * GET all candidates
     *
     * @param data
     * @returns
     */
    async findAll(options) {
        return await this.candidateService.findAll(options);
    }
    /**
     * GET candidate by id
     * @param id
     * @param data
     * @returns
     */
    async findById(id, params) {
        return await this.candidateService.findOneByIdString(id, params);
    }
    /**
     * CREATE new candidate
     *
     * @param body
     * @returns
     */
    async create(entity, languageCode, originUrl) {
        return await this.commandBus.execute(new commands_1.CandidateCreateCommand(entity, languageCode, originUrl));
    }
    /**
     * UPDATE Candidate By Id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.CandidateUpdateCommand({ id, ...entity }));
    }
    /**
     * Hired candidate user and migrate to employee user
     * UPDATE Candidate By Id
     *
     * @param id
     * @returns
     */
    async updateHiredStatus(id) {
        return await this.commandBus.execute(new commands_1.CandidateHiredCommand(id));
    }
    /**
     * Rejected candidate user
     * UPDATE Candidate By Id
     *
     * @param id
     * @returns
     */
    async updateRejectedStatus(id) {
        return await this.commandBus.execute(new commands_1.CandidateRejectedCommand(id));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create records in Bulk' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Records have been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('/bulk'),
    __param(0, (0, common_1.Body)(pipes_1.BulkBodyLoadTransformPipe, new common_1.ValidationPipe({
        transform: true
    }))),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __param(3, (0, common_1.Headers)('origin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CandidateBulkInputDTO, String, String, String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "createBulk", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidates counts in the same tenant' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidates count'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "getCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidates in the same tenant using pagination.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidates in the tenant',
        type: candidate_entity_1.Candidate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidates in the same tenant.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidates in the tenant',
        type: candidate_entity_1.Candidate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Candidate by id ' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record',
        type: candidate_entity_1.Candidate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_VIEW),
    (0, common_1.Get)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, crud_1.OptionParams]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __param(2, (0, common_1.Headers)('origin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCandidateDTO, String, String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
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
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateCandidateDTO]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record and migrate candidate to employee user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
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
    (0, common_1.Put)(':id/hired'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "updateHiredStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update candidate status as Rejected' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
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
    (0, common_1.Put)(':id/rejected'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "updateRejectedStatus", null);
exports.CandidateController = CandidateController = __decorate([
    (0, swagger_1.ApiTags)('Candidate'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService, cqrs_1.CommandBus])
], CandidateController);
//# sourceMappingURL=candidate.controller.js.map