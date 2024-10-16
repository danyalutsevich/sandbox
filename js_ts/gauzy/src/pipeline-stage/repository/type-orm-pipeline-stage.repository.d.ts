import { Repository } from 'typeorm';
import { PipelineStage } from '../pipeline-stage.entity';
export declare class TypeOrmPipelineStageRepository extends Repository<PipelineStage> {
    readonly repository: Repository<PipelineStage>;
    constructor(repository: Repository<PipelineStage>);
}
