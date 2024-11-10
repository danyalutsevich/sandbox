import { IPipeline, IPipelineStage as IStage } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class PipelineStage extends TenantOrganizationBaseEntity implements IStage {
    description: string;
    index: number;
    name: string;
    /**
     * Pipeline
     */
    pipeline: IPipeline;
    pipelineId: IPipeline['id'];
}
