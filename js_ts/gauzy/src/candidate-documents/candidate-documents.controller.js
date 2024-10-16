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
exports.CandidateDocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const candidate_documents_service_1 = require("./candidate-documents.service");
const candidate_documents_entity_1 = require("./candidate-documents.entity");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("../shared/pipes");
let CandidateDocumentsController = exports.CandidateDocumentsController = class CandidateDocumentsController extends crud_1.CrudController {
    candidateDocumentsService;
    constructor(candidateDocumentsService) {
        super(candidateDocumentsService);
        this.candidateDocumentsService = candidateDocumentsService;
    }
    /**
     * GET all candidate documents
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        return await this.candidateDocumentsService.findAll({
            where: params.where
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all candidate document.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found candidate document',
        type: candidate_documents_entity_1.CandidateDocument
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_DOCUMENTS_VIEW),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], CandidateDocumentsController.prototype, "findAll", null);
exports.CandidateDocumentsController = CandidateDocumentsController = __decorate([
    (0, swagger_1.ApiTags)('CandidateDocument'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_CANDIDATES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [candidate_documents_service_1.CandidateDocumentsService])
], CandidateDocumentsController);
//# sourceMappingURL=candidate-documents.controller.js.map