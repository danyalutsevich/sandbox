import { ICommand } from '@nestjs/cqrs';
import { EquipmentSharing } from '../equipment-sharing.entity';
export declare class EquipmentSharingCreateCommand implements ICommand {
    readonly orgId: string;
    readonly equipmentSharing: EquipmentSharing;
    static readonly type = "[EquipmentSharing] Create";
    constructor(orgId: string, equipmentSharing: EquipmentSharing);
}
