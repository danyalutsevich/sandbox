"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeUpdateCommand = void 0;
class IncomeUpdateCommand {
    id;
    entity;
    static type = '[Income] Update';
    constructor(id, entity) {
        this.id = id;
        this.entity = entity;
    }
}
exports.IncomeUpdateCommand = IncomeUpdateCommand;
//# sourceMappingURL=income.update.command.js.map