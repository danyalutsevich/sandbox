"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUpdateCommand = void 0;
class EmployeeUpdateCommand {
    id;
    input;
    static type = '[Employee] Update';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.EmployeeUpdateCommand = EmployeeUpdateCommand;
//# sourceMappingURL=employee.update.command.js.map