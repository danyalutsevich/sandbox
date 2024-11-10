"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCreateCommand = void 0;
class EmployeeCreateCommand {
    input;
    languageCode;
    originUrl;
    static type = '[Employee] Create';
    constructor(input, languageCode, originUrl) {
        this.input = input;
        this.languageCode = languageCode;
        this.originUrl = originUrl;
    }
}
exports.EmployeeCreateCommand = EmployeeCreateCommand;
//# sourceMappingURL=employee.create.command.js.map