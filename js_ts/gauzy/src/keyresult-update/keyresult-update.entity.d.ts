import { IKeyResult, IKeyResultUpdate } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class KeyResultUpdate extends TenantOrganizationBaseEntity implements IKeyResultUpdate {
    update: number;
    progress: number;
    owner: string;
    status: string;
    keyResult?: IKeyResult;
    keyResultId?: IKeyResult['id'];
}
