"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoalGeneralSettingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalGeneralSettingModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const goal_general_setting_controller_1 = require("./goal-general-setting.controller");
const goal_general_setting_entity_1 = require("./goal-general-setting.entity");
const goal_general_setting_service_1 = require("./goal-general-setting.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let GoalGeneralSettingModule = exports.GoalGeneralSettingModule = GoalGeneralSettingModule_1 = class GoalGeneralSettingModule {
};
exports.GoalGeneralSettingModule = GoalGeneralSettingModule = GoalGeneralSettingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/goal-general-setting', module: GoalGeneralSettingModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([goal_general_setting_entity_1.GoalGeneralSetting]),
            nestjs_1.MikroOrmModule.forFeature([goal_general_setting_entity_1.GoalGeneralSetting]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [goal_general_setting_controller_1.GoalGeneralSettingController],
        providers: [goal_general_setting_service_1.GoalGeneralSettingService],
        exports: [goal_general_setting_service_1.GoalGeneralSettingService]
    })
], GoalGeneralSettingModule);
//# sourceMappingURL=goal-general-setting.module.js.map