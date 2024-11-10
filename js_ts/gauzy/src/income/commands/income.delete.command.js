"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeDeleteCommand = void 0;
class IncomeDeleteCommand {
    employeeId;
    incomeId;
    static type = '[Income] Delete';
    constructor(employeeId, incomeId) {
        this.employeeId = employeeId;
        this.incomeId = incomeId;
    }
}
exports.IncomeDeleteCommand = IncomeDeleteCommand;
//# sourceMappingURL=income.delete.command.js.map