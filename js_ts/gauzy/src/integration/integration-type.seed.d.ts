import { DataSource } from 'typeorm';
import { IntegrationType } from './integration-type.entity';
export declare const createDefaultIntegrationTypes: (dataSource: DataSource) => Promise<IntegrationType[]>;
