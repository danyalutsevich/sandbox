"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeBulkCreateCommand = void 0;
class EmployeeBulkCreateCommand {
    input;
    languageCode;
    originUrl;
    static type = '[Employee] Bulk Create';
    constructor(input, languageCode, originUrl) {
        this.input = input;
        this.languageCode = languageCode;
        this.originUrl = originUrl;
    }
}
exports.EmployeeBulkCreateCommand = EmployeeBulkCreateCommand;
//# sourceMappingURL=employee.bulk.create.command.js.map