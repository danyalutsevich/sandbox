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
exports.FeatureFlagGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cache_manager_1 = require("@nestjs/cache-manager");
const index_1 = require("../../../plugins/common/dist/index");
const feature_service_1 = require("./../../feature/feature.service");
/**
 * Feature enabled/disabled guard
 *
 * @returns
 */
let FeatureFlagGuard = exports.FeatureFlagGuard = class FeatureFlagGuard {
    cacheManager;
    _reflector;
    featureFlagService;
    constructor(cacheManager, _reflector, featureFlagService) {
        this.cacheManager = cacheManager;
        this._reflector = _reflector;
        this.featureFlagService = featureFlagService;
    }
    /**
     * Determines if the current request can be activated based on feature flag metadata.
     * @param context The execution context of the request.
     * @returns A boolean indicating whether access is allowed.
     */
    async canActivate(context) {
        // Retrieve permissions from metadata
        const targets = [
            context.getHandler(),
            context.getClass() // Returns the *type* of the controller class which the current handler belongs to.
        ];
        // Retrieve metadata for a specified key for a specified set of features
        const flag = this._reflector.getAllAndOverride(index_1.FEATURE_METADATA, targets);
        console.log('Guard: FeatureFlag checking', flag);
        const cacheKey = `featureFlag_${flag}`;
        const fromCache = await this.cacheManager.get(cacheKey);
        let isEnabled;
        if (fromCache == null) {
            isEnabled = await this.featureFlagService.isFeatureEnabled(flag);
            await this.cacheManager.set(cacheKey, isEnabled);
        }
        else {
            isEnabled = fromCache;
        }
        // Check if the feature is enabled
        if (isEnabled) {
            console.log(`Guard: FeatureFlag ${flag} enabled`);
            return true;
        }
        // If the feature is not enabled, throw a NotFoundException
        const { method, url } = context.switchToHttp().getRequest();
        throw new common_1.NotFoundException(`Cannot ${method} ${url}`);
    }
};
exports.FeatureFlagGuard = FeatureFlagGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, core_1.Reflector,
        feature_service_1.FeatureService])
], FeatureFlagGuard);
//# sourceMappingURL=feature-flag.guard.js.map