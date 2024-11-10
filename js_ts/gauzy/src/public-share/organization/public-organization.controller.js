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
exports.PublicOrganizationController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../../plugins/common/dist/index");
const pipes_1 = require("../../shared/pipes");
const dto_1 = require("./../../core/dto");
const public_transform_interceptor_1 = require("./../public-transform.interceptor");
const public_organization_query_dto_1 = require("./dto/public-organization-query.dto");
const public_organization_service_1 = require("./public-organization.service");
const queries_1 = require("./queries");
let PublicOrganizationController = exports.PublicOrganizationController = class PublicOrganizationController {
    queryBus;
    publicOrganizationService;
    constructor(queryBus, publicOrganizationService) {
        this.queryBus = queryBus;
        this.publicOrganizationService = publicOrganizationService;
    }
    /**
     * GET public clients in the specific organization
     *
     * @param options
     * @returns
     */
    async findPublicClientsByOrganization(options) {
        return await this.queryBus.execute(new queries_1.FindPublicClientsByOrganizationQuery(options));
    }
    /**
     * GET public clients counts in the specific organization
     *
     * @param options
     * @returns
     */
    async findPublicClientCountsByOrganization(options) {
        return await this.publicOrganizationService.findPublicClientCountsByOrganization(options);
    }
    /**
     * GET public clients counts in the specific organization
     *
     * @param options
     * @returns
     */
    async findPublicProjectCountsByOrganization(options) {
        return await this.publicOrganizationService.findPublicProjectCountsByOrganization(options);
    }
    /**
     * GET organization by profile link
     *
     * @param profile_link
     * @returns
     */
    async findOneByProfileLink(params, options) {
        return await this.queryBus.execute(new queries_1.FindPublicOrganizationQuery(params, options.relations));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find public information for all clients in the organization.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found clients in the organization'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, common_1.Get)('client'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TenantOrganizationBaseDTO]),
    __metadata("design:returntype", Promise)
], PublicOrganizationController.prototype, "findPublicClientsByOrganization", null);
__decorate([
    (0, common_1.Get)('client/count'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TenantOrganizationBaseDTO]),
    __metadata("design:returntype", Promise)
], PublicOrganizationController.prototype, "findPublicClientCountsByOrganization", null);
__decorate([
    (0, common_1.Get)('project/count'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TenantOrganizationBaseDTO]),
    __metadata("design:returntype", Promise)
], PublicOrganizationController.prototype, "findPublicProjectCountsByOrganization", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Organization by profile link.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':profile_link/:id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, public_organization_query_dto_1.PublicOrganizationQueryDTO]),
    __metadata("design:returntype", Promise)
], PublicOrganizationController.prototype, "findOneByProfileLink", null);
exports.PublicOrganizationController = PublicOrganizationController = __decorate([
    (0, index_1.Public)(),
    (0, common_1.UseInterceptors)(public_transform_interceptor_1.PublicTransformInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        public_organization_service_1.PublicOrganizationService])
], PublicOrganizationController);
//# sourceMappingURL=public-organization.controller.js.map