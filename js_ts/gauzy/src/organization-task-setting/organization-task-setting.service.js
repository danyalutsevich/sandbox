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
exports.OrganizationTaskSettingService = void 0;
const common_1 = require("@nestjs/common");
const context_1 = require("./../core/context");
const crud_1 = require("../core/crud");
const repository_1 = require("./repository");
let OrganizationTaskSettingService = exports.OrganizationTaskSettingService = class OrganizationTaskSettingService extends crud_1.TenantAwareCrudService {
    typeOrmOrganizationTaskSettingRepository;
    mikroOrmOrganizationTaskSettingRepository;
    constructor(typeOrmOrganizationTaskSettingRepository, mikroOrmOrganizationTaskSettingRepository) {
        super(typeOrmOrganizationTaskSettingRepository, mikroOrmOrganizationTaskSettingRepository);
        this.typeOrmOrganizationTaskSettingRepository = typeOrmOrganizationTaskSettingRepository;
        this.mikroOrmOrganizationTaskSettingRepository = mikroOrmOrganizationTaskSettingRepository;
    }
    /**
     * Find organization task setting.
     *
     * @param options - The options to filter the organization task setting.
     * @returns A Promise resolving to the found organization task setting.
     */
    async findByOrganization(options) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { organizationId } = options;
            const whereConditions = {
                organizationId,
                tenantId,
                isActive: true,
                isArchived: false
            };
            return await this.findOneByOptions({ where: whereConditions });
        }
        catch (error) {
            // Handle errors during the retrieving operation.
            console.error('Error during organization task settings retrieval:', error.message);
        }
    }
};
exports.OrganizationTaskSettingService = OrganizationTaskSettingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmOrganizationTaskSettingRepository,
        repository_1.MikroOrmOrganizationTaskSettingRepository])
], OrganizationTaskSettingService);
//# sourceMappingURL=organization-task-setting.service.js.map