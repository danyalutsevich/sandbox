import { IEquipment, IEquipmentSharing, ITag, IImageAsset } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Equipment extends TenantOrganizationBaseEntity implements IEquipment {
    name: string;
    type: string;
    serialNumber?: string;
    manufacturedYear: number;
    initialCost: number;
    currency: string;
    maxSharePeriod: number;
    autoApproveShare: boolean;
    /**
     * ImageAsset
     */
    image: IImageAsset;
    /**
     * EquipmentSharing
     */
    equipmentSharings: IEquipmentSharing[];
    tags: ITag[];
}
