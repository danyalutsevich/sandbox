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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/config/dist/index");
const crud_service_1 = require("../core/crud/crud.service");
const type_orm_feature_repository_1 = require("./repository/type-orm-feature.repository");
const mikro_orm_feature_repository_1 = require("./repository/mikro-orm-feature.repository");
let FeatureService = exports.FeatureService = class FeatureService extends crud_service_1.CrudService {
    typeOrmFeatureRepository;
    mikroOrmFeatureRepository;
    constructor(typeOrmFeatureRepository, mikroOrmFeatureRepository) {
        super(typeOrmFeatureRepository, mikroOrmFeatureRepository);
        this.typeOrmFeatureRepository = typeOrmFeatureRepository;
        this.mikroOrmFeatureRepository = mikroOrmFeatureRepository;
    }
    /**
     * Retrieves top-level features (those with no parent) from the database. Allows specifying related entities
     * to be included in the result. Features are ordered by their creation time in ascending order.
     *
     * @param relations An array of strings indicating which related entities to include in the result.
     * @returns A promise resolving to a paginated response containing top-level IFeature objects.
     */
    async getParentFeatures(relations = []) {
        return await super.findAll({
            where: {
                parentId: (0, typeorm_1.IsNull)()
            },
            relations,
            order: {
                createdAt: 'ASC'
            }
        });
    }
    /**
     * Checks if the specified feature flag is enabled.
     * @param flag The feature flag to check.
     * @returns A boolean indicating whether the feature flag is enabled.
     */
    async isFeatureEnabled(flag) {
        try {
            const featureFlag = await super.findOneByWhereOptions({ code: flag });
            return featureFlag.isEnabled;
        }
        catch (error) {
            // Feature flag not found, fallback to default value
            return !!index_1.gauzyToggleFeatures[flag];
        }
    }
};
exports.FeatureService = FeatureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_feature_repository_1.TypeOrmFeatureRepository,
        mikro_orm_feature_repository_1.MikroOrmFeatureRepository])
], FeatureService);
//# sourceMappingURL=feature.service.js.map