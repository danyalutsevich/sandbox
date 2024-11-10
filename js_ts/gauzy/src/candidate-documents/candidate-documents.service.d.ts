import { TenantAwareCrudService } from './../core/crud';
import { CandidateDocument } from './candidate-documents.entity';
import { TypeOrmCandidateDocumentRepository } from './repository/type-orm-candidate-document.repository';
import { MikroOrmCandidateDocumentRepository } from './repository/mikro-orm-candidate-document.repository';
export declare class CandidateDocumentsService extends TenantAwareCrudService<CandidateDocument> {
    constructor(typeOrmCandidateDocumentsRepository: TypeOrmCandidateDocumentRepository, mikroOrmCandidateDocumentRepository: MikroOrmCandidateDocumentRepository);
}
