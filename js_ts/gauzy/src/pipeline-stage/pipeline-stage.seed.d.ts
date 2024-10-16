import { DataSource } from 'typeorm';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
import { PipelineStage } from './pipeline-stage.entity';
export declare const createRandomPipelineStage: (dataSource: DataSource, tenants: ITenant[], tenantOrganizationsMap: Map<ITenant, IOrganization[]>) => Promise<PipelineStage[]>;
