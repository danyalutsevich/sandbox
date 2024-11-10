import { DataSource } from 'typeorm';
import { IIntegration, IIntegrationType } from '../../plugins/contracts/dist/index';
export declare const createDefaultIntegrations: (dataSource: DataSource, integrationTypes: IIntegrationType[] | void) => Promise<IIntegration[]>;
