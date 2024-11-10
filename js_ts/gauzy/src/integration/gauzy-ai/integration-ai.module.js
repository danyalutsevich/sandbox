"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationAIModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../plugins/plugins/integration-ai/dist/index");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const integration_module_1 = require("./../integration.module");
const integration_tenant_module_1 = require("./../../integration-tenant/integration-tenant.module");
const integration_ai_controller_1 = require("./integration-ai.controller");
const integration_ai_service_1 = require("./integration-ai.service");
const integration_ai_middleware_1 = require("./integration-ai.middleware");
let IntegrationAIModule = exports.IntegrationAIModule = class IntegrationAIModule {
    configure(consumer) {
        consumer.apply(integration_ai_middleware_1.IntegrationAIMiddleware).forRoutes({
            path: '/employee-job',
            method: common_1.RequestMethod.GET
        }, {
            path: '/employee-job/apply',
            method: common_1.RequestMethod.POST
        }, {
            path: '/employee-job/updateApplied',
            method: common_1.RequestMethod.POST
        }, {
            path: '/employee-job/hide',
            method: common_1.RequestMethod.POST
        }, {
            path: '/employee-job/pre-process',
            method: common_1.RequestMethod.POST
        }, {
            path: '/employee-job/application/:employeeJobApplicationId',
            method: common_1.RequestMethod.GET
        }, {
            path: '/employee-job/generate-proposal/:employeeJobApplicationId',
            method: common_1.RequestMethod.POST
        }, {
            path: '/employee/job-statistics',
            method: common_1.RequestMethod.GET
        }, {
            path: '/employee/:id/job-search-status',
            method: common_1.RequestMethod.PUT
        }, {
            path: '/job-preset',
            method: common_1.RequestMethod.POST
        }, {
            path: '/job-preset',
            method: common_1.RequestMethod.GET
        }, {
            path: '/job-preset/employee/:employeeId/criterion',
            method: common_1.RequestMethod.POST
        }, {
            path: '/timesheet/screenshot',
            method: common_1.RequestMethod.POST
        });
    }
};
exports.IntegrationAIModule = IntegrationAIModule = __decorate([
    (0, common_1.Module)({
        controllers: [integration_ai_controller_1.IntegrationAIController],
        imports: [
            role_permission_module_1.RolePermissionModule,
            integration_tenant_module_1.IntegrationTenantModule,
            index_1.GauzyAIModule.forRoot(),
            (0, common_1.forwardRef)(() => integration_module_1.IntegrationModule),
            cqrs_1.CqrsModule
        ],
        providers: [integration_ai_service_1.IntegrationAIService, integration_ai_middleware_1.IntegrationAIMiddleware]
    })
], IntegrationAIModule);
//# sourceMappingURL=integration-ai.module.js.map