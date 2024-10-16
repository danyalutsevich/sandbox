"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateSkillModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateSkillModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const candidate_skill_entity_1 = require("./candidate-skill.entity");
const candidate_skill_service_1 = require("./candidate-skill.service");
const candidate_skill_controller_1 = require("./candidate-skill.controller");
let CandidateSkillModule = exports.CandidateSkillModule = CandidateSkillModule_1 = class CandidateSkillModule {
};
exports.CandidateSkillModule = CandidateSkillModule = CandidateSkillModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-skills', module: CandidateSkillModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_skill_entity_1.CandidateSkill]),
            nestjs_1.MikroOrmModule.forFeature([candidate_skill_entity_1.CandidateSkill]),
            role_permission_module_1.RolePermissionModule
        ],
        providers: [candidate_skill_service_1.CandidateSkillService],
        controllers: [candidate_skill_controller_1.CandidateSkillController],
        exports: [candidate_skill_service_1.CandidateSkillService]
    })
], CandidateSkillModule);
//# sourceMappingURL=candidate-skill.module.js.map