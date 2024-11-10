"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateDocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const candidate_documents_entity_1 = require("./candidate-documents.entity");
const type_orm_candidate_document_repository_1 = require("./repository/type-orm-candidate-document.repository");
const mikro_orm_candidate_document_repository_1 = require("./repository/mikro-orm-candidate-document.repository");
let CandidateDocumentsService = exports.CandidateDocumentsService = class CandidateDocumentsService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCandidateDocumentsRepository, mikroOrmCandidateDocumentRepository) {
        super(typeOrmCandidateDocumentsRepository, mikroOrmCandidateDocumentRepository);
    }
};
exports.CandidateDocumentsService = CandidateDocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_documents_entity_1.CandidateDocument)),
    __metadata("design:paramtypes", [type_orm_candidate_document_repository_1.TypeOrmCandidateDocumentRepository,
        mikro_orm_candidate_document_repository_1.MikroOrmCandidateDocumentRepository])
], CandidateDocumentsService);
//# sourceMappingURL=candidate-documents.service.js.map