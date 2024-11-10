"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoalTemplateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const goal_template_controller_1 = require("./goal-template.controller");
const goal_template_service_1 = require("./goal-template.service");
const goal_template_entity_1 = require("./goal-template.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let GoalTemplateModule = exports.GoalTemplateModule = GoalTemplateModule_1 = class GoalTemplateModule {
};
exports.GoalTemplateModule = GoalTemplateModule = GoalTemplateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/goal-templates', module: GoalTemplateModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([goal_template_entity_1.GoalTemplate]),
            nestjs_1.MikroOrmModule.forFeature([goal_template_entity_1.GoalTemplate]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [goal_template_controller_1.GoalTemplateController],
        providers: [goal_template_service_1.GoalTemplateService],
        exports: [goal_template_service_1.GoalTemplateService]
    })
], GoalTemplateModule);
//# sourceMappingURL=goal-template.module.js.map