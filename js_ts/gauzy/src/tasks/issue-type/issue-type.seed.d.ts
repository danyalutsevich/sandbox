import { DataSource } from 'typeorm';
import { IIssueType } from '../../../plugins/contracts';
/**
 * Default global system issue types
 *
 * @param dataSource
 * @returns
 */
export declare const createDefaultIssueTypes: (dataSource: DataSource) => Promise<IIssueType[]>;
