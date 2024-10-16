"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseUpdateCommand = void 0;
class ExpenseUpdateCommand {
    id;
    entity;
    static type = '[Expense] Update';
    constructor(id, entity) {
        this.id = id;
        this.entity = entity;
    }
}
exports.ExpenseUpdateCommand = ExpenseUpdateCommand;
//# sourceMappingURL=expense.update.command.js.map