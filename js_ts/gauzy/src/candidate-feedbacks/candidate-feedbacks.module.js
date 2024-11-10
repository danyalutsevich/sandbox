"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateFeedbacksModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateFeedbacksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const candidate_interview_module_1 = require("./../candidate-interview/candidate-interview.module");
const candidate_feedbacks_entity_1 = require("./candidate-feedbacks.entity");
const candidate_feedbacks_service_1 = require("./candidate-feedbacks.service");
const candidate_feedbacks_controller_1 = require("./candidate-feedbacks.controller");
const handlers_1 = require("./commands/handlers");
let CandidateFeedbacksModule = exports.CandidateFeedbacksModule = CandidateFeedbacksModule_1 = class CandidateFeedbacksModule {
};
exports.CandidateFeedbacksModule = CandidateFeedbacksModule = CandidateFeedbacksModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-feedbacks', module: CandidateFeedbacksModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_feedbacks_entity_1.CandidateFeedback]),
            nestjs_1.MikroOrmModule.forFeature([candidate_feedbacks_entity_1.CandidateFeedback]),
            role_permission_module_1.RolePermissionModule,
            candidate_interview_module_1.CandidateInterviewModule,
            cqrs_1.CqrsModule
        ],
        providers: [candidate_feedbacks_service_1.CandidateFeedbacksService, ...handlers_1.CommandHandlers],
        controllers: [candidate_feedbacks_controller_1.CandidateFeedbacksController],
        exports: [candidate_feedbacks_service_1.CandidateFeedbacksService]
    })
], CandidateFeedbacksModule);
//# sourceMappingURL=candidate-feedbacks.module.js.map