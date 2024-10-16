import { Repository } from 'typeorm';
import { CandidateDocument } from '../candidate-documents.entity';
export declare class TypeOrmCandidateDocumentRepository extends Repository<CandidateDocument> {
    readonly repository: Repository<CandidateDocument>;
    constructor(repository: Repository<CandidateDocument>);
}
