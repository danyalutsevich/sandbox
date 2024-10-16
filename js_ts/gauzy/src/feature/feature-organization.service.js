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
exports.FeatureOrganizationService = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../plugins/common/dist/index");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const feature_organization_entity_1 = require("./feature-organization.entity");
const feature_service_1 = require("./feature.service");
const type_orm_feature_organization_repository_1 = require("./repository/type-orm-feature-organization.repository");
const mikro_orm_feature_organization_repository_1 = require("./repository/mikro-orm-feature-organization.repository");
let FeatureOrganizationService = exports.FeatureOrganizationService = class FeatureOrganizationService extends crud_1.TenantAwareCrudService {
    typeOrmFeatureOrganizationRepository;
    mikroOrmFeatureOrganizationRepository;
    _featureService;
    constructor(typeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository, _featureService) {
        super(typeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository);
        this.typeOrmFeatureOrganizationRepository = typeOrmFeatureOrganizationRepository;
        this.mikroOrmFeatureOrganizationRepository = mikroOrmFeatureOrganizationRepository;
        this._featureService = _featureService;
    }
    /**
     * UPDATE feature organization respective tenant by feature id
     *
     * @param input
     * @returns
     */
    async updateFeatureOrganization(entity) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { featureId, organizationId } = entity;
        // find all feature organization by feature id
        const { items: featureOrganizations, total } = await this.findAll({
            where: {
                tenantId,
                featureId,
                ...((0, index_1.isNotEmpty)(organizationId) ? { organizationId } : {})
            }
        });
        try {
            if (!total) {
                const featureOrganization = new feature_organization_entity_1.FeatureOrganization({
                    ...entity,
                    tenantId
                });
                await this.typeOrmRepository.save(featureOrganization);
            }
            else {
                featureOrganizations.map((item) => {
                    return new feature_organization_entity_1.FeatureOrganization(Object.assign(item, {
                        ...entity,
                        tenantId
                    }));
                });
                await this.typeOrmRepository.save(featureOrganizations);
            }
            return true;
        }
        catch (error) {
            console.log('Error while updating feature organization', error);
            return false;
        }
    }
    /**
     * Create/Update feature organization for relative tenants.
     *
     * @param tenants An array of ITenant instances.
     * @returns A Promise resolving to an array of IFeatureOrganization.
     */
    async updateTenantFeatureOrganizations(tenants) {
        if (!tenants.length) {
            return [];
        }
        const featureOrganizations = [];
        const features = await this._featureService.find();
        for (const feature of features) {
            const isEnabled = feature.isEnabled;
            const tenantFeatureOrganizations = tenants.map((tenant) => new feature_organization_entity_1.FeatureOrganization({
                isEnabled,
                tenant,
                feature
            }));
            featureOrganizations.push(...tenantFeatureOrganizations);
        }
        return await this.typeOrmRepository.save(featureOrganizations);
    }
};
exports.FeatureOrganizationService = FeatureOrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => feature_service_1.FeatureService))),
    __metadata("design:paramtypes", [type_orm_feature_organization_repository_1.TypeOrmFeatureOrganizationRepository,
        mikro_orm_feature_organization_repository_1.MikroOrmFeatureOrganizationRepository,
        feature_service_1.FeatureService])
], FeatureOrganizationService);
//# sourceMappingURL=feature-organization.service.js.map