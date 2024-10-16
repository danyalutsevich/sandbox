"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoalModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const goal_controller_1 = require("./goal.controller");
const goal_entity_1 = require("./goal.entity");
const goal_service_1 = require("./goal.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let GoalModule = exports.GoalModule = GoalModule_1 = class GoalModule {
};
exports.GoalModule = GoalModule = GoalModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/goals', module: GoalModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([goal_entity_1.Goal]),
            nestjs_1.MikroOrmModule.forFeature([goal_entity_1.Goal]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [goal_controller_1.GoalController],
        providers: [goal_service_1.GoalService],
        exports: [goal_service_1.GoalService]
    })
], GoalModule);
//# sourceMappingURL=goal.module.js.map