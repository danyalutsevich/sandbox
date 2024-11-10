"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateDocumentsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateDocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_documents_controller_1 = require("./candidate-documents.controller");
const candidate_documents_entity_1 = require("./candidate-documents.entity");
const candidate_documents_service_1 = require("./candidate-documents.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidateDocumentsModule = exports.CandidateDocumentsModule = CandidateDocumentsModule_1 = class CandidateDocumentsModule {
};
exports.CandidateDocumentsModule = CandidateDocumentsModule = CandidateDocumentsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate-documents', module: CandidateDocumentsModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_documents_entity_1.CandidateDocument]),
            nestjs_1.MikroOrmModule.forFeature([candidate_documents_entity_1.CandidateDocument]),
            role_permission_module_1.RolePermissionModule
        ],
        providers: [candidate_documents_service_1.CandidateDocumentsService],
        controllers: [candidate_documents_controller_1.CandidateDocumentsController],
        exports: [candidate_documents_service_1.CandidateDocumentsService]
    })
], CandidateDocumentsModule);
//# sourceMappingURL=candidate-documents.module.js.map