"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidatePersonalQualitiesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatePersonalQualitiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_personal_qualities_service_1 = require("./candidate-personal-qualities.service");
const candidate_personal_qualities_controller_1 = require("./candidate-personal-qualities.controller");
const candidate_personal_qualities_entity_1 = require("./candidate-personal-qualities.entity");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidatePersonalQualitiesModule = exports.CandidatePersonalQualitiesModule = CandidatePersonalQualitiesModule_1 = class CandidatePersonalQualitiesModule {
};
exports.CandidatePersonalQualitiesModule = CandidatePersonalQualitiesModule = CandidatePersonalQualitiesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/candidate-personal-qualities',
                    module: CandidatePersonalQualitiesModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([candidate_personal_qualities_entity_1.CandidatePersonalQualities]),
            nestjs_1.MikroOrmModule.forFeature([candidate_personal_qualities_entity_1.CandidatePersonalQualities]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        providers: [candidate_personal_qualities_service_1.CandidatePersonalQualitiesService, ...handlers_1.CommandHandlers],
        controllers: [candidate_personal_qualities_controller_1.CandidatePersonalQualitiesController],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, candidate_personal_qualities_service_1.CandidatePersonalQualitiesService]
    })
], CandidatePersonalQualitiesModule);
//# sourceMappingURL=candidate-personal-qualities.module.js.map