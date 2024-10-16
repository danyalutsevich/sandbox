"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSharingUpdateCommand = void 0;
class EquipmentSharingUpdateCommand {
    id;
    equipmentSharing;
    static type = '[EquipmentSharing] Update';
    constructor(id, equipmentSharing) {
        this.id = id;
        this.equipmentSharing = equipmentSharing;
    }
}
exports.EquipmentSharingUpdateCommand = EquipmentSharingUpdateCommand;
//# sourceMappingURL=equipment-sharing.update.command.js.map