"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilitySlotsCreateCommand = void 0;
const contracts_1 = require("../../../plugins/contracts");
class AvailabilitySlotsCreateCommand {
    input;
    insertType;
    static type = '[AvailabilitySlots] Create';
    constructor(input, insertType = contracts_1.AvailabilityMergeType.MERGE) {
        this.input = input;
        this.insertType = insertType;
    }
}
exports.AvailabilitySlotsCreateCommand = AvailabilitySlotsCreateCommand;
//# sourceMappingURL=availability-slots.create.command.js.map