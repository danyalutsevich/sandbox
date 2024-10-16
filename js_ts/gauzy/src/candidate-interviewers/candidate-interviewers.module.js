"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateInterviewersModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateInterviewersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_interviewers_entity_1 = require("./candidate-interviewers.entity");
const candidate_interviewers_service_1 = require("./candidate-interviewers.service");
const candidate_interviewers_controller_1 = require("./candidate-interviewers.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let CandidateInterviewersModule = exports.CandidateInterviewersModule = CandidateInterviewersModule_1 = class CandidateInterviewersModule {
};
exports.CandidateInterviewersModule = CandidateInterviewersModule = CandidateInterviewersModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/candidate-interviewers',
                    module: CandidateInterviewersModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([candidate_interviewers_entity_1.CandidateInterviewers]),
            nestjs_1.MikroOrmModule.forFeature([candidate_interviewers_entity_1.CandidateInterviewers]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [candidate_interviewers_controller_1.CandidateInterviewersController],
        providers: [candidate_interviewers_service_1.CandidateInterviewersService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, candidate_interviewers_service_1.CandidateInterviewersService]
    })
], CandidateInterviewersModule);
//# sourceMappingURL=candidate-interviewers.module.js.map