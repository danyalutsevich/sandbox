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
exports.TenantFeatureOrganizationCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const feature_organization_service_1 = require("./../../../feature/feature-organization.service");
const tenant_feature_organization_create_command_1 = require("../tenant-feature-organization.create.command");
let TenantFeatureOrganizationCreateHandler = exports.TenantFeatureOrganizationCreateHandler = class TenantFeatureOrganizationCreateHandler {
    _featureOrganizationService;
    constructor(_featureOrganizationService) {
        this._featureOrganizationService = _featureOrganizationService;
    }
    /**
     * Executes the TenantFeatureOrganizationCreateCommand. This method takes the command,
     * extracts the necessary input data, and passes it to the _featureOrganizationService
     * for processing. The service is responsible for creating or updating feature organizations
     * for tenants based on the provided input.
     *
     * @param command An instance of TenantFeatureOrganizationCreateCommand containing tenant and feature organization data.
     * @returns A Promise that resolves to an array of IFeatureOrganization, representing the updated or created feature organizations.
     */
    async execute(command) {
        const { input } = command;
        return await this._featureOrganizationService.updateTenantFeatureOrganizations(input);
    }
};
exports.TenantFeatureOrganizationCreateHandler = TenantFeatureOrganizationCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_feature_organization_create_command_1.TenantFeatureOrganizationCreateCommand),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => feature_organization_service_1.FeatureOrganizationService))),
    __metadata("design:paramtypes", [feature_organization_service_1.FeatureOrganizationService])
], TenantFeatureOrganizationCreateHandler);
//# sourceMappingURL=tenant-feature-organization.create.handler.js.map