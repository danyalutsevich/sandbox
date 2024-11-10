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
exports.IntegrationEntitySettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const integration_entity_setting_entity_1 = require("./integration-entity-setting.entity");
const mikro_orm_integration_entity_setting_repository_1 = require("./repository/mikro-orm-integration-entity-setting.repository");
const type_orm_integration_entity_setting_repository_1 = require("./repository/type-orm-integration-entity-setting.repository");
let IntegrationEntitySettingService = exports.IntegrationEntitySettingService = class IntegrationEntitySettingService extends crud_1.TenantAwareCrudService {
    typeOrmIntegrationEntitySettingRepository;
    constructor(typeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository) {
        super(typeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository);
        this.typeOrmIntegrationEntitySettingRepository = typeOrmIntegrationEntitySettingRepository;
    }
    /**
     * Get integration entity settings by integration ID.
     *
     * @param integrationId - The ID of the integration.
     * @returns A promise resolving to an array of integration entity settings.
     */
    async getIntegrationEntitySettings(integrationId) {
        return await super.findAll({
            where: {
                integrationId
            },
            relations: {
                integration: true,
                tiedEntities: true
            }
        });
    }
    /**
     * Create or update integration entity settings in bulk by integration.
     *
     * @param input - An individual IIntegrationEntitySetting or an array of IIntegrationEntitySetting objects to be created or updated.
     * @returns A promise resolving to an array of created or updated IIntegrationEntitySetting objects.
     */
    async bulkUpdateOrCreate(input) {
        // Prepare an array of settings to be saved
        const settings = Array.isArray(input) ? input : [input];
        // Save the new settings to the database
        return await this.typeOrmIntegrationEntitySettingRepository.save(settings);
    }
};
exports.IntegrationEntitySettingService = IntegrationEntitySettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(integration_entity_setting_entity_1.IntegrationEntitySetting)),
    __metadata("design:paramtypes", [type_orm_integration_entity_setting_repository_1.TypeOrmIntegrationEntitySettingRepository,
        mikro_orm_integration_entity_setting_repository_1.MikroOrmIntegrationEntitySettingRepository])
], IntegrationEntitySettingService);
//# sourceMappingURL=integration-entity-setting.service.js.map