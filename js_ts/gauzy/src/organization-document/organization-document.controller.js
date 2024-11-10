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
exports.OrganizationDocumentController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const organization_document_entity_1 = require("./organization-document.entity");
const organization_document_service_1 = require("./organization-document.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let OrganizationDocumentController = exports.OrganizationDocumentController = class OrganizationDocumentController extends crud_1.CrudController {
    organizationDocumentService;
    constructor(organizationDocumentService) {
        super(organizationDocumentService);
        this.organizationDocumentService = organizationDocumentService;
    }
    /**
     * GET all organization documents
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { findInput } = data;
        return this.organizationDocumentService.findAll({ where: findInput });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization document.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization document',
        type: organization_document_entity_1.OrganizationDocument
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
], OrganizationDocumentController.prototype, "findAll", null);
exports.OrganizationDocumentController = OrganizationDocumentController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationDocument'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_document_service_1.OrganizationDocumentService])
], OrganizationDocumentController);
//# sourceMappingURL=organization-document.controller.js.map