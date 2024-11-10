import { Repository } from 'typeorm';
import { CandidateCriterionsRating } from '../candidate-criterion-rating.entity';
export declare class TypeOrmCandidateCriterionsRatingRepository extends Repository<CandidateCriterionsRating> {
    readonly repository: Repository<CandidateCriterionsRating>;
    constructor(repository: Repository<CandidateCriterionsRating>);
}
