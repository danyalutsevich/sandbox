import { DataSource } from 'typeorm';
import { ITenant } from '../../plugins/contracts/dist/index';
import { KeyResultTemplate } from './keyresult-template.entity';
export declare const createDefaultKeyResultTemplates: (dataSource: DataSource, tenant: ITenant) => Promise<KeyResultTemplate[]>;
