"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateEducationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateEducationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_education_service_1 = require("./candidate-education.service");
const candidate_education_entity_1 = require("./candidate-education.entity");
const candidate_education_controller_1 = require("./candidate-education.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidateEducationModule = exports.CandidateEducationModule = CandidateEducationModule_1 = class CandidateEducationModule {
};
exports.CandidateEducationModule = CandidateEducationModule = CandidateEducationModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-educations', module: CandidateEducationModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_education_entity_1.CandidateEducation]),
            nestjs_1.MikroOrmModule.forFeature([candidate_education_entity_1.CandidateEducation]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [candidate_education_controller_1.CandidateEducationController],
        providers: [candidate_education_service_1.CandidateEducationService],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, candidate_education_service_1.CandidateEducationService]
    })
], CandidateEducationModule);
//# sourceMappingURL=candidate-education.module.js.map