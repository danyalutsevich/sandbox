"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSharingStatusCommand = void 0;
class EquipmentSharingStatusCommand {
    id;
    status;
    static type = '[EquipmentSharing] Status';
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
}
exports.EquipmentSharingStatusCommand = EquipmentSharingStatusCommand;
//# sourceMappingURL=equipment-sharing.status.command.js.map