"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const equipment_sharing_status_handler_1 = require("./equipment-sharing.status.handler");
const equipment_sharing_create_handler_1 = require("./equipment-sharing.create.handler");
const equipment_sharing_update_handler_1 = require("./equipment-sharing.update.handler");
exports.CommandHandlers = [
    equipment_sharing_status_handler_1.EquipmentSharingStatusHandler,
    equipment_sharing_create_handler_1.EquipmentSharingCreateHandler,
    equipment_sharing_update_handler_1.EquipmentSharingUpdateHandler
];
//# sourceMappingURL=index.js.map