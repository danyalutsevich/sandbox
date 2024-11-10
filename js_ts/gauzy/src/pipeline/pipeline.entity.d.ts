import { IPipeline, IPipelineStage } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Pipeline extends TenantOrganizationBaseEntity implements IPipeline {
    description: string;
    name: string;
    stages: IPipelineStage[];
    __before_persist?(): void;
}
