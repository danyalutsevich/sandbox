import { IEmployee, IEquipment, IEquipmentSharing, IEquipmentSharingPolicy, IOrganizationTeam } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class EquipmentSharing extends TenantOrganizationBaseEntity implements IEquipmentSharing {
    name: string;
    shareRequestDay: Date;
    shareStartDay: Date;
    shareEndDay: Date;
    status: number;
    createdBy: string;
    createdByName: string;
    /**
     * Equipment
     */
    equipment: IEquipment;
    equipmentId: IEquipment['id'];
    /**
    * Equipment
    */
    equipmentSharingPolicy: IEquipmentSharingPolicy;
    equipmentSharingPolicyId: IEquipmentSharingPolicy['id'];
    /**
     * Employee
     */
    employees?: IEmployee[];
    /**
     * OrganizationTeam
     */
    teams?: IOrganizationTeam[];
}
