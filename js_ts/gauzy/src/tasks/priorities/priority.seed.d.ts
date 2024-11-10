import { DataSource } from 'typeorm';
import { ITaskPriority } from '../../../plugins/contracts';
/**
 * Default global system priority
 *
 * @param dataSource
 * @returns
 */
export declare const createDefaultPriorities: (dataSource: DataSource) => Promise<ITaskPriority[]>;
