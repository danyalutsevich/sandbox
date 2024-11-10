"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateExperienceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateExperienceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_experience_entity_1 = require("./candidate-experience.entity");
const candidate_experience_service_1 = require("./candidate-experience.service");
const candidate_experience_controller_1 = require("./candidate-experience.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidateExperienceModule = exports.CandidateExperienceModule = CandidateExperienceModule_1 = class CandidateExperienceModule {
};
exports.CandidateExperienceModule = CandidateExperienceModule = CandidateExperienceModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-experience', module: CandidateExperienceModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_experience_entity_1.CandidateExperience]),
            nestjs_1.MikroOrmModule.forFeature([candidate_experience_entity_1.CandidateExperience]),
            role_permission_module_1.RolePermissionModule
        ],
        providers: [candidate_experience_service_1.CandidateExperienceService],
        controllers: [candidate_experience_controller_1.CandidateExperienceController],
        exports: [candidate_experience_service_1.CandidateExperienceService]
    })
], CandidateExperienceModule);
//# sourceMappingURL=candidate-experience.module.js.map