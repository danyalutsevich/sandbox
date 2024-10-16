import { KeyResultUpdate } from './keyresult-update.entity';
import { DataSource } from 'typeorm';
import { KeyResult } from '../keyresult/keyresult.entity';
import { IOrganization, ITenant } from '../../plugins/contracts/dist/index';
export declare const createDefaultKeyResultUpdates: (dataSource: DataSource, tenant: ITenant, organization: IOrganization, keyResults: KeyResult[] | void) => Promise<KeyResultUpdate[]>;
