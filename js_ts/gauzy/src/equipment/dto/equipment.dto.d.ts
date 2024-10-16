import { IEquipmentSharing, IImageAsset } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class EquipmentDTO extends TenantOrganizationBaseDTO {
    readonly name: string;
    readonly type: string;
    readonly image: IImageAsset;
    readonly serialNumber?: string;
    readonly manufacturedYear: number;
    readonly initialCost: number;
    readonly maxSharePeriod: number;
    readonly autoApproveShare: boolean;
    readonly equipmentSharings: IEquipmentSharing[];
}
