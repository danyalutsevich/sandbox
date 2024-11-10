import { ITenant } from '../../../plugins/contracts';
import { TenantBaseEntity } from '../../core/entities/internal';
export declare class TenantSetting extends TenantBaseEntity implements ITenant {
    name?: string;
    value?: string;
}
