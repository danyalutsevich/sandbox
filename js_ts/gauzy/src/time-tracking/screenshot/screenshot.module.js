"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const index_1 = require("../../../plugins/plugins/integration-ai/dist/index");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const screenshot_entity_1 = require("./screenshot.entity");
const screenshot_controller_1 = require("./screenshot.controller");
const screenshot_service_1 = require("./screenshot.service");
const time_slot_module_1 = require("./../time-slot/time-slot.module");
const integration_tenant_module_1 = require("./../../integration-tenant/integration-tenant.module");
const handlers_1 = require("./commands/handlers");
let ScreenshotModule = exports.ScreenshotModule = class ScreenshotModule {
};
exports.ScreenshotModule = ScreenshotModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            screenshot_controller_1.ScreenshotController
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([screenshot_entity_1.Screenshot]),
            nestjs_1.MikroOrmModule.forFeature([screenshot_entity_1.Screenshot]),
            index_1.GauzyAIModule.forRoot(),
            role_permission_module_1.RolePermissionModule,
            (0, common_1.forwardRef)(() => time_slot_module_1.TimeSlotModule),
            integration_tenant_module_1.IntegrationTenantModule,
            cqrs_1.CqrsModule
        ],
        providers: [
            screenshot_service_1.ScreenshotService,
            ...handlers_1.CommandHandlers
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            screenshot_service_1.ScreenshotService
        ]
    })
], ScreenshotModule);
//# sourceMappingURL=screenshot.module.js.map