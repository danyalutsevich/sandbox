import { ICommand } from '@nestjs/cqrs';
import { EquipmentSharing } from '../equipment-sharing.entity';
export declare class EquipmentSharingUpdateCommand implements ICommand {
    readonly id: string;
    readonly equipmentSharing: EquipmentSharing;
    static readonly type = "[EquipmentSharing] Update";
    constructor(id: string, equipmentSharing: EquipmentSharing);
}
