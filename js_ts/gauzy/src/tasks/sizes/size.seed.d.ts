import { DataSource } from 'typeorm';
import { ITaskSize } from '../../../plugins/contracts';
/**
 * Default global system sizes
 *
 * @param dataSource
 * @returns
 */
export declare const createDefaultSizes: (dataSource: DataSource) => Promise<ITaskSize[]>;
