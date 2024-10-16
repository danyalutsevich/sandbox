"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateSourceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateSourceModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_source_service_1 = require("./candidate-source.service");
const candidate_source_entity_1 = require("./candidate-source.entity");
const candidate_source_controller_1 = require("./candidate-source.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidateSourceModule = exports.CandidateSourceModule = CandidateSourceModule_1 = class CandidateSourceModule {
};
exports.CandidateSourceModule = CandidateSourceModule = CandidateSourceModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-source', module: CandidateSourceModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_source_entity_1.CandidateSource]),
            nestjs_1.MikroOrmModule.forFeature([candidate_source_entity_1.CandidateSource]),
            role_permission_module_1.RolePermissionModule
        ],
        providers: [candidate_source_service_1.CandidateSourceService],
        controllers: [candidate_source_controller_1.CandidateSourceController],
        exports: [candidate_source_service_1.CandidateSourceService]
    })
], CandidateSourceModule);
//# sourceMappingURL=candidate-source.module.js.map