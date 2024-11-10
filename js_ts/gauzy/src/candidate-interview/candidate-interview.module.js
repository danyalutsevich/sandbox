"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateInterviewModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateInterviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_interview_service_1 = require("./candidate-interview.service");
const candidate_interview_controller_1 = require("./candidate-interview.controller");
const candidate_interview_entity_1 = require("./candidate-interview.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidateInterviewModule = exports.CandidateInterviewModule = CandidateInterviewModule_1 = class CandidateInterviewModule {
};
exports.CandidateInterviewModule = CandidateInterviewModule = CandidateInterviewModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-interview', module: CandidateInterviewModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_interview_entity_1.CandidateInterview]),
            nestjs_1.MikroOrmModule.forFeature([candidate_interview_entity_1.CandidateInterview]),
            role_permission_module_1.RolePermissionModule
        ],
        providers: [candidate_interview_service_1.CandidateInterviewService],
        controllers: [candidate_interview_controller_1.CandidateInterviewController],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, candidate_interview_service_1.CandidateInterviewService]
    })
], CandidateInterviewModule);
//# sourceMappingURL=candidate-interview.module.js.map