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
exports.IntegrationEntitySettingTiedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const integration_entity_setting_tied_entity_1 = require("./integration-entity-setting-tied.entity");
const mikro_orm_integration_entity_setting_tied_repository_1 = require("./repository/mikro-orm-integration-entity-setting-tied.repository");
const type_orm_integration_entity_setting_tied_repository_1 = require("./repository/type-orm-integration-entity-setting-tied.repository");
let IntegrationEntitySettingTiedService = exports.IntegrationEntitySettingTiedService = class IntegrationEntitySettingTiedService extends crud_1.TenantAwareCrudService {
    typeOrmIntegrationEntitySettingTiedRepository;
    constructor(typeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository) {
        super(typeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository);
        this.typeOrmIntegrationEntitySettingTiedRepository = typeOrmIntegrationEntitySettingTiedRepository;
    }
    /**
     * Create or update bulk integration entity settings tied entities by integration.
     *
     * @param input - The integration entity setting tied input data, either a single entity or an array of entities.
     * @returns A promise that resolves to an array of created or updated IIntegrationEntitySettingTied instances.
     */
    async bulkUpdateOrCreate(input) {
        // Ensure that the input is always an array for consistency
        const settings = Array.isArray(input) ? input : [input];
        // Save the array of integration entity settings to the database
        const savedSettings = await this.typeOrmIntegrationEntitySettingTiedRepository.save(settings);
        // Return the array of created or updated integration entity settings
        return savedSettings;
    }
};
exports.IntegrationEntitySettingTiedService = IntegrationEntitySettingTiedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(integration_entity_setting_tied_entity_1.IntegrationEntitySettingTied)),
    __metadata("design:paramtypes", [type_orm_integration_entity_setting_tied_repository_1.TypeOrmIntegrationEntitySettingTiedRepository,
        mikro_orm_integration_entity_setting_tied_repository_1.MikroOrmIntegrationEntitySettingTiedRepository])
], IntegrationEntitySettingTiedService);
//# sourceMappingURL=integration-entity-setting-tied.service.js.map