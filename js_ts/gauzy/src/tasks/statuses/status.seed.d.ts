import { DataSource } from 'typeorm';
import { ITaskStatus } from '../../../plugins/contracts';
/**
 * Default global system status
 *
 * @param dataSource
 * @returns
 */
export declare const createDefaultStatuses: (dataSource: DataSource) => Promise<ITaskStatus[]>;
