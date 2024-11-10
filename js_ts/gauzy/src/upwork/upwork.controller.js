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
exports.UpworkController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const upwork_transaction_service_1 = require("./upwork-transaction.service");
const upwork_service_1 = require("./upwork.service");
const internal_1 = require("./../core/entities/internal");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let UpworkController = exports.UpworkController = class UpworkController {
    _upworkTransactionService;
    _upworkService;
    constructor(_upworkTransactionService, _upworkService) {
        this._upworkTransactionService = _upworkTransactionService;
        this._upworkService = _upworkService;
    }
    /**
     *
     * @param file
     * @param organizationDto
     * @returns
     */
    async create(file, organizationDto) {
        return await this._upworkTransactionService.handleTransactions(file, organizationDto);
    }
    /**
     *
     * @param config
     * @param organizationId
     * @returns
     */
    async getAccessTokenSecretPair(config, organizationId) {
        return await this._upworkService.getAccessTokenSecretPair(config, organizationId);
    }
    /**
     *
     * @param accessTokenDto
     * @param organizationId
     * @returns
     */
    async getAccessToken(accessTokenDto, organizationId) {
        return await this._upworkService.getAccessToken(accessTokenDto, organizationId);
    }
    /**
     *
     * @param data
     * @returns
     */
    async getWorkDiary(data) {
        return await this._upworkService.getWorkDiary(data);
    }
    /**
     *
     * @param data
     * @returns
     */
    async getContracts(data) {
        return await this._upworkService.getContractsForFreelancer(data);
    }
    /**
     *
     * @param integrationId
     * @param data
     * @returns
     */
    async getConfig(integrationId, data) {
        const { filter } = data;
        return await this._upworkService.getConfig(integrationId, filter);
    }
    /**
     *
     * @param syncContractsDto
     * @returns
     */
    async syncContracts(syncContractsDto) {
        return await this._upworkService.syncContracts(syncContractsDto);
    }
    /**
     *
     * @param dto
     * @returns
     */
    async syncContractsRelatedData(dto) {
        return await this._upworkService.syncContractsRelatedData(dto);
    }
    /**
     *
     * @param integrationId
     * @param data
     * @returns
     */
    async getReports(integrationId, data) {
        const { relations, filter } = data;
        return await this._upworkService.getReportListByIntegration(integrationId, filter, relations);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Upload Upwork transaction.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Uploaded transaction'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Freelancer not found'
    }),
    (0, common_1.Post)('/transactions'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Authorize Upwork.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Authorized Upwork'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Cannot Authorize'
    }),
    (0, common_1.Post)('/token-secret-pair/:organizationId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('organizationId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "getAccessTokenSecretPair", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Access Token.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Get Access Token'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Post)('/access-token/:organizationId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('organizationId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "getAccessToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Work Diary.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Get Work Diary'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Get)('work-diary'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "getWorkDiary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Contracts.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Get Contracts'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Get)('freelancer-contracts'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "getContracts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Config.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Get Config'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Get)('config/:integrationId'),
    __param(0, (0, common_1.Param)('integrationId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "getConfig", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sync Contracts.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Sync Contracts'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Post)('sync-contracts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "syncContracts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sync Contracts Related Data.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Sync Contracts Related Data'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Post)('sync-contracts-related-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "syncContractsRelatedData", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all expense and income for logged upwork user.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found income & expense',
        type: internal_1.Income || internal_1.Expense
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Get)('report/:integrationId'),
    __param(0, (0, common_1.Param)('integrationId', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UpworkController.prototype, "getReports", null);
exports.UpworkController = UpworkController = __decorate([
    (0, swagger_1.ApiTags)('Upwork Integrations'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [upwork_transaction_service_1.UpworkTransactionService,
        upwork_service_1.UpworkService])
], UpworkController);
//# sourceMappingURL=upwork.controller.js.map