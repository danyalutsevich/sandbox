import { Repository } from 'typeorm';
import { Pipeline } from '../pipeline.entity';
export declare class TypeOrmPipelineRepository extends Repository<Pipeline> {
    readonly repository: Repository<Pipeline>;
    constructor(repository: Repository<Pipeline>);
}
