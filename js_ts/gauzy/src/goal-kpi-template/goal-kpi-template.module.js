"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoalKpiTemplateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalKpiTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const goal_kpi_template_controller_1 = require("./goal-kpi-template.controller");
const goal_kpi_template_service_1 = require("./goal-kpi-template.service");
const goal_kpi_template_entity_1 = require("./goal-kpi-template.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let GoalKpiTemplateModule = exports.GoalKpiTemplateModule = GoalKpiTemplateModule_1 = class GoalKpiTemplateModule {
};
exports.GoalKpiTemplateModule = GoalKpiTemplateModule = GoalKpiTemplateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/goal-kpi-template', module: GoalKpiTemplateModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([goal_kpi_template_entity_1.GoalKPITemplate]),
            nestjs_1.MikroOrmModule.forFeature([goal_kpi_template_entity_1.GoalKPITemplate]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [goal_kpi_template_controller_1.GoalKpiTemplateController],
        providers: [goal_kpi_template_service_1.GoalKpiTemplateService],
        exports: [goal_kpi_template_service_1.GoalKpiTemplateService]
    })
], GoalKpiTemplateModule);
//# sourceMappingURL=goal-kpi-template.module.js.map