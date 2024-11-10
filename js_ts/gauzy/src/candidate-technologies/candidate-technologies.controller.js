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
exports.CandidateTechnologiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const candidate_technologies_service_1 = require("./candidate-technologies.service");
const candidate_technologies_entity_1 = require("./candidate-technologies.entity");
const commands_1 = require("./commands");
let CandidateTechnologiesController = exports.CandidateTechnologiesController = class CandidateTechnologiesController extends crud_1.CrudController {
    candidateTechnologiesService;
    commandBus;
    constructor(candidateTechnologiesService, commandBus) {
        super(candidateTechnologiesService);
        this.candidateTechnologiesService = candidateTechnologiesService;
        this.commandBus = commandBus;
    }
    /**
     * CREATE bulk candidate technologies
     *
     * @param body
     * @returns
     */
    async createBulkCandidateTechnoglies(body) {
        const { interviewId = null, technologies = [] } = body;
        return await this.commandBus.execute(new commands_1.CandidateTechnologiesBulkCreateCommand(interviewId, technologies));
    }
    /**
     * UPDATE bulk candidate technologies
     *
     * @param body
     * @returns
     */
    async updateBulkCandidateTechnoglies(body) {
        return await this.commandBus.execute(new commands_1.CandidateTechnologiesBulkUpdateCommand(body));
    }
    /**
     * GET candidate technology by feedback id
     *
     * @param interviewId
     * @returns
     */
    async findByInterviewId(interviewId) {
        return await this.candidateTechnologiesService.getTechnologiesByInterviewId(interviewId);
    }
    /**
     * DELETE bulk candidate technology by id
     *
     * @param id
     * @param data
     * @returns
     */
    async deleteBulkTechnologies(id, data) {
        const { technologies = null } = data;
        return await this.commandBus.execute(new commands_1.CandidateTechnologiesBulkDeleteCommand(id, technologies));
    }
    /**
     * GET all candidate technologies
     *
     * @param data
     * @returns
     */
    findAll(data) {
        const { findInput, relations } = data;
        return this.candidateTechnologiesService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * CREATE candidate technologies
     *
     * @param body
     * @returns
     */
    async create(body) {
        return this.candidateTechnologiesService.create(body);
    }
    /**
     * DELETE candidate technologies by id
     *
     * @param id
     * @returns
     */
    delete(id) {
        return this.candidateTechnologiesService.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateTechnologiesController.prototype, "createBulkCandidateTechnoglies", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Put)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CandidateTechnologiesController.prototype, "updateBulkCandidateTechnoglies", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Get)('interview/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateTechnologiesController.prototype, "findByInterviewId", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Delete)('bulk/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CandidateTechnologiesController.prototype, "deleteBulkTechnologies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all candidate technologies.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate technologies',
        type: candidate_technologies_entity_1.CandidateTechnologies
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
], CandidateTechnologiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [candidate_technologies_entity_1.CandidateTechnologies]),
    __metadata("design:returntype", Promise)
], CandidateTechnologiesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.RoleGuard),
    (0, decorators_1.Roles)(index_1.RolesEnum.CANDIDATE, index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateTechnologiesController.prototype, "delete", null);
exports.CandidateTechnologiesController = CandidateTechnologiesController = __decorate([
    (0, swagger_1.ApiTags)('CandidateTechnology'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_technologies_service_1.CandidateTechnologiesService,
        cqrs_1.CommandBus])
], CandidateTechnologiesController);
//# sourceMappingURL=candidate-technologies.controller.js.map