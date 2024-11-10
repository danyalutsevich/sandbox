"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoalTimeFrameModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalTimeFrameModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const goal_time_frame_controller_1 = require("./goal-time-frame.controller");
const goal_time_frame_service_1 = require("./goal-time-frame.service");
const goal_time_frame_entity_1 = require("./goal-time-frame.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let GoalTimeFrameModule = exports.GoalTimeFrameModule = GoalTimeFrameModule_1 = class GoalTimeFrameModule {
};
exports.GoalTimeFrameModule = GoalTimeFrameModule = GoalTimeFrameModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/goal-time-frame', module: GoalTimeFrameModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([goal_time_frame_entity_1.GoalTimeFrame]),
            nestjs_1.MikroOrmModule.forFeature([goal_time_frame_entity_1.GoalTimeFrame]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [goal_time_frame_controller_1.GoalTimeFrameController],
        providers: [goal_time_frame_service_1.GoalTimeFrameService],
        exports: [goal_time_frame_service_1.GoalTimeFrameService]
    })
], GoalTimeFrameModule);
//# sourceMappingURL=goal-time-frame.module.js.map