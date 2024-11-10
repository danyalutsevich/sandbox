"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateTechnologiesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateTechnologiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const candidate_technologies_controller_1 = require("./candidate-technologies.controller");
const candidate_technologies_service_1 = require("./candidate-technologies.service");
const handlers_1 = require("./commands/handlers");
const internal_1 = require("./../core/entities/internal");
let CandidateTechnologiesModule = exports.CandidateTechnologiesModule = CandidateTechnologiesModule_1 = class CandidateTechnologiesModule {
};
exports.CandidateTechnologiesModule = CandidateTechnologiesModule = CandidateTechnologiesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/candidate-technologies',
                    module: CandidateTechnologiesModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([internal_1.CandidateTechnologies]),
            nestjs_1.MikroOrmModule.forFeature([internal_1.CandidateTechnologies]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        providers: [candidate_technologies_service_1.CandidateTechnologiesService, ...handlers_1.CommandHandlers],
        controllers: [candidate_technologies_controller_1.CandidateTechnologiesController],
        exports: [candidate_technologies_service_1.CandidateTechnologiesService]
    })
], CandidateTechnologiesModule);
//# sourceMappingURL=candidate-technologies.module.js.map