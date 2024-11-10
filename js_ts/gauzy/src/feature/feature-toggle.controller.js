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
exports.FeatureToggleController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const unleash_client_1 = require("unleash-client");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const index_3 = require("../../plugins/config/dist/index");
const feature_entity_1 = require("./feature.entity");
const feature_service_1 = require("./feature.service");
const feature_organization_service_1 = require("./feature-organization.service");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const dto_1 = require("./../shared/dto");
const pipes_1 = require("../shared/pipes");
const commands_1 = require("./commands");
const dto_2 = require("./dto");
const feature_organization_query_dto_1 = require("./dto/feature-organization-query.dto");
const { unleashConfig } = index_3.environment;
let FeatureToggleController = exports.FeatureToggleController = class FeatureToggleController {
    _featureService;
    _featureOrganizationService;
    _commandBus;
    constructor(_featureService, _featureOrganizationService, _commandBus) {
        this._featureService = _featureService;
        this._featureOrganizationService = _featureOrganizationService;
        this._commandBus = _commandBus;
    }
    async getFeatureToggleDefinitions() {
        let featureToggles = [];
        // load toggles definitions from Unleash if it's enabled
        if (unleashConfig.url) {
            featureToggles = (0, unleash_client_1.getFeatureToggleDefinitions)();
            // only support gauzy feature and removed other
            const featureEnums = Object.values(index_1.FeatureEnum);
            if (featureToggles) {
                featureToggles = featureToggles.filter((toggle) => featureEnums.includes(toggle.name));
            }
        }
        return featureToggles;
    }
    async getParentFeatureList(options) {
        try {
            return await this._featureService.getParentFeatures(options.relations);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getFeaturesOrganization(params) {
        try {
            return await this._featureOrganizationService.findAll({
                where: {
                    ...(params.tenantId
                        ? {
                            tenantId: params.tenantId
                        }
                        : {}),
                    ...(params.organizationId
                        ? {
                            organizationId: params.organizationId
                        }
                        : {})
                },
                relations: params.relations || []
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async findAll() {
        try {
            return await this._featureService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async enabledDisabledFeature(input) {
        return await this._commandBus.execute(new commands_1.FeatureToggleUpdateCommand(input));
    }
};
__decorate([
    (0, common_1.Get)('definition'),
    (0, index_2.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureToggleController.prototype, "getFeatureToggleDefinitions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all parent features.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found feature',
        type: feature_entity_1.Feature
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Get)('parent'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RelationsQueryDTO]),
    __metadata("design:returntype", Promise)
], FeatureToggleController.prototype, "getParentFeatureList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all feature organizations.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found feature',
        type: feature_entity_1.Feature
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Get)('/organizations'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feature_organization_query_dto_1.FeatureOrganizationQueryDTO]),
    __metadata("design:returntype", Promise)
], FeatureToggleController.prototype, "getFeaturesOrganization", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all features.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found feature',
        type: feature_entity_1.Feature
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureToggleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Enabled or disabled features' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created/updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CreateFeatureToggleDTO]),
    __metadata("design:returntype", Promise)
], FeatureToggleController.prototype, "enabledDisabledFeature", null);
exports.FeatureToggleController = FeatureToggleController = __decorate([
    (0, swagger_1.ApiTags)('Feature'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [feature_service_1.FeatureService,
        feature_organization_service_1.FeatureOrganizationService,
        cqrs_1.CommandBus])
], FeatureToggleController);
//# sourceMappingURL=feature-toggle.controller.js.map