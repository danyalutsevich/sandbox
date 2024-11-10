"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSharingCreateCommand = void 0;
class EquipmentSharingCreateCommand {
    orgId;
    equipmentSharing;
    static type = '[EquipmentSharing] Create';
    constructor(orgId, equipmentSharing) {
        this.orgId = orgId;
        this.equipmentSharing = equipmentSharing;
    }
}
exports.EquipmentSharingCreateCommand = EquipmentSharingCreateCommand;
//# sourceMappingURL=equipment-sharing.create.command.js.map