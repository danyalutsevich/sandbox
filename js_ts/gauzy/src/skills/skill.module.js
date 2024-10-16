"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SkillModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const skill_service_1 = require("./skill.service");
const skill_controller_1 = require("./skill.controller");
const skill_entity_1 = require("./skill.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let SkillModule = exports.SkillModule = SkillModule_1 = class SkillModule {
};
exports.SkillModule = SkillModule = SkillModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/skills', module: SkillModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([skill_entity_1.Skill]),
            nestjs_1.MikroOrmModule.forFeature([skill_entity_1.Skill]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [skill_controller_1.SkillController],
        providers: [skill_service_1.SkillService],
        exports: [skill_service_1.SkillService]
    })
], SkillModule);
//# sourceMappingURL=skill.module.js.map