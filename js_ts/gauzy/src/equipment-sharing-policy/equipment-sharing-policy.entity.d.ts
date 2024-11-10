import { IEquipmentSharing, IEquipmentSharingPolicy } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EquipmentSharingPolicy extends TenantOrganizationBaseEntity implements IEquipmentSharingPolicy {
    name: string;
    description: string;
    /**
    * EquipmentSharing
    */
    equipmentSharings?: IEquipmentSharing[];
}
