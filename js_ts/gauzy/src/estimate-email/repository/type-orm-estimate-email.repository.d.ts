import { Repository } from 'typeorm';
import { EstimateEmail } from '../estimate-email.entity';
export declare class TypeOrmEstimateEmailRepository extends Repository<EstimateEmail> {
    readonly repository: Repository<EstimateEmail>;
    constructor(repository: Repository<EstimateEmail>);
}
