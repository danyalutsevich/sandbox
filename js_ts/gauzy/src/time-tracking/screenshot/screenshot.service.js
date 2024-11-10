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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../plugins/plugins/integration-ai/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const context_1 = require("./../../core/context");
const crud_1 = require("./../../core/crud");
const integration_tenant_service_1 = require("./../../integration-tenant/integration-tenant.service");
const screenshot_entity_1 = require("./screenshot.entity");
const database_helper_1 = require("./../../database/database.helper");
const type_orm_screenshot_repository_1 = require("./repository/type-orm-screenshot.repository");
const mikro_orm_screenshot_repository_1 = require("./repository/mikro-orm-screenshot.repository");
let ScreenshotService = exports.ScreenshotService = class ScreenshotService extends crud_1.TenantAwareCrudService {
    _integrationTenantService;
    _gauzyAIService;
    constructor(typeOrmScreenshotRepository, mikroOrmScreenshotRepository, _integrationTenantService, _gauzyAIService) {
        super(typeOrmScreenshotRepository, mikroOrmScreenshotRepository);
        this._integrationTenantService = _integrationTenantService;
        this._gauzyAIService = _gauzyAIService;
    }
    /**
     * DELETE screenshot by ID
     *
     * @param criteria
     * @param options
     * @returns
     */
    async deleteScreenshot(id, options) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.setFindOptions({
                where: {
                    ...(options ? options : {}),
                    id,
                    tenantId
                }
            });
            if (!context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                query.leftJoin(`${query.alias}.timeSlot`, 'time_slot');
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_slot"."employeeId" = :employeeId`), {
                    employeeId: context_1.RequestContext.currentEmployeeId()
                });
            }
            const screenshot = await query.getOneOrFail();
            return await this.typeOrmRepository.remove(screenshot);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * Analyze a screenshot using Gauzy AI service.
     * @param input - The input options for the screenshot.
     * @param data - The screenshot data.
     * @param file - The screenshot file.
     * @param callback - Optional callback function to handle the analysis result.
     * @returns Promise<ImageAnalysisResult>
     */
    async analyzeScreenshot(input, data, file, callback) {
        try {
            const { organizationId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            // Retrieve integration
            const integration = await this._integrationTenantService.getIntegrationByOptions({
                organizationId,
                tenantId,
                name: contracts_1.IntegrationEnum.GAUZY_AI
            });
            // Check if integration exists
            if (!!integration) {
                try {
                    console.log('Screenshot/Image Analyze Starting. AI Integration Tenant: %s', integration);
                    const integrationId = integration['id'];
                    // Check if employee performance analysis sync is enabled
                    await this._integrationTenantService.findIntegrationTenantByEntity({
                        integrationId,
                        organizationId,
                        entityType: contracts_1.IntegrationEntity.EMPLOYEE_PERFORMANCE
                    });
                    // Analyze image using Gauzy AI service
                    const [analysis] = await this._gauzyAIService.analyzeImage(data, file);
                    if (!analysis.success) {
                        console.log('Screenshot/Image Analyze Failed. AI Integration Tenant: %s', integration);
                    }
                    if (analysis.success && callback) {
                        // Call the callback function if provided
                        callback(analysis.data.analysis);
                    }
                    return analysis;
                }
                catch (error) {
                    console.log('Error while getting Integration for Gauzy AI', error.message);
                    return null;
                }
            }
            return null;
        }
        catch (error) {
            // If needed, consider throwing or handling the error appropriately.
            console.error('Failed to get AI Integration for provided options: %s', error?.message);
        }
    }
};
exports.ScreenshotService = ScreenshotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(screenshot_entity_1.Screenshot)),
    __metadata("design:paramtypes", [type_orm_screenshot_repository_1.TypeOrmScreenshotRepository,
        mikro_orm_screenshot_repository_1.MikroOrmScreenshotRepository,
        integration_tenant_service_1.IntegrationTenantService, typeof (_a = typeof index_1.GauzyAIService !== "undefined" && index_1.GauzyAIService) === "function" ? _a : Object])
], ScreenshotService);
//# sourceMappingURL=screenshot.service.js.map