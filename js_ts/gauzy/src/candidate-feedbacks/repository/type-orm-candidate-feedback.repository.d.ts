import { Repository } from 'typeorm';
import { CandidateFeedback } from '../candidate-feedbacks.entity';
export declare class TypeOrmCandidateFeedbackRepository extends Repository<CandidateFeedback> {
    readonly repository: Repository<CandidateFeedback>;
    constructor(repository: Repository<CandidateFeedback>);
}
