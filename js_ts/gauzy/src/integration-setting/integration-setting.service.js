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
exports.IntegrationSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const integration_setting_entity_1 = require("./integration-setting.entity");
const type_orm_integration_setting_repository_1 = require("./repository/type-orm-integration-setting.repository");
const mikro_orm_integration_setting_repository_1 = require("./repository/mikro-orm-integration-setting.repository");
let IntegrationSettingService = exports.IntegrationSettingService = class IntegrationSettingService extends crud_1.TenantAwareCrudService {
    typeOrmIntegrationSettingRepository;
    mikroOrmIntegrationSettingRepository;
    constructor(typeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository) {
        super(typeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository);
        this.typeOrmIntegrationSettingRepository = typeOrmIntegrationSettingRepository;
        this.mikroOrmIntegrationSettingRepository = mikroOrmIntegrationSettingRepository;
    }
    /**
     * Bulk update or create integration settings for a specific integration.
     *
     * @param integrationId - The identifier of the integration for which settings are updated or created.
     * @param input - An array of integration settings or a single integration setting to update or create.
     * @returns {Promise<IIntegrationSetting[]>} - A promise that resolves with an array of updated or created integration settings.
     */
    async bulkUpdateOrCreate(integrationId, input) {
        try {
            // Delete existing settings for the given integration
            await this.delete({ integrationId });
            // Prepare an array of settings to be saved
            const settings = Array.isArray(input) ? input : [input];
            // Save the new settings to the database
            return await this.typeOrmIntegrationSettingRepository.save(settings);
        }
        catch (error) {
            // Handle any errors that occur during the bulk update or create process
            console.error('Bulk update or create of integration settings failed:', error);
        }
    }
};
exports.IntegrationSettingService = IntegrationSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(integration_setting_entity_1.IntegrationSetting)),
    __metadata("design:paramtypes", [type_orm_integration_setting_repository_1.TypeOrmIntegrationSettingRepository,
        mikro_orm_integration_setting_repository_1.MikroOrmIntegrationSettingRepository])
], IntegrationSettingService);
//# sourceMappingURL=integration-setting.service.js.map