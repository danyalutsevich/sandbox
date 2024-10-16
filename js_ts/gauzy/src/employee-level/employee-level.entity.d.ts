import { IEmployeeLevel, ITag } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EmployeeLevel extends TenantOrganizationBaseEntity implements IEmployeeLevel {
    level: string;
    /**
     * Tag
     */
    tags?: ITag[];
}
