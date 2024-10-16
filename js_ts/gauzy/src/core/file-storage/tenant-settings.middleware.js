"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettingsMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const tenant_setting_service_1 = require("../../tenant/tenant-setting/tenant-setting.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let TenantSettingsMiddleware = exports.TenantSettingsMiddleware = class TenantSettingsMiddleware {
    cacheManager;
    tenantSettingService;
    logging = true;
    constructor(cacheManager, tenantSettingService) {
        this.cacheManager = cacheManager;
        this.tenantSettingService = tenantSettingService;
    }
    /**
     *
     * @param _request
     * @param _response
     * @param next
     */
    async use(_request, _response, next) {
        try {
            const authHeader = _request.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                // Decode JWT token
                const decodedToken = jwt.decode(token);
                let tenantSettings = {};
                if (decodedToken && decodedToken.tenantId) {
                    if (this.logging) {
                        console.log('Getting Tenant settings from Cache for tenantId: %s', decodedToken.tenantId);
                    }
                    const cacheKey = 'tenantSettings_' + decodedToken.tenantId;
                    tenantSettings = await this.cacheManager.get(cacheKey);
                    if (!tenantSettings) {
                        if (this.logging) {
                            console.log('Tenant settings NOT loaded from Cache for tenantId: %s', decodedToken.tenantId);
                        }
                        // Fetch tenant settings based on the decoded tenantId
                        tenantSettings = await this.tenantSettingService.get({
                            where: {
                                tenantId: decodedToken.tenantId
                            }
                        });
                        if (tenantSettings) {
                            const ttl = 5 * 60 * 1000; // 5 min caching period for Tenants Settings
                            await this.cacheManager.set(cacheKey, tenantSettings, ttl);
                            if (this.logging) {
                                console.log('Tenant settings loaded from DB and stored in Cache for tenantId: %s', decodedToken.tenantId);
                            }
                        }
                    }
                    else {
                        if (this.logging) {
                            console.log('Tenant settings loaded from Cache for tenantId: %s', decodedToken.tenantId);
                        }
                    }
                }
                if (tenantSettings) {
                    // Attach tenantSettings to the request object
                    _request['tenantSettings'] = tenantSettings;
                }
            }
        }
        catch (error) {
            console.log('Error while getting Tenant settings: %s', error?.message);
            console.log(_request.path, _request.url);
        }
        next();
    }
};
exports.TenantSettingsMiddleware = TenantSettingsMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, tenant_setting_service_1.TenantSettingService])
], TenantSettingsMiddleware);
//# sourceMappingURL=tenant-settings.middleware.js.map