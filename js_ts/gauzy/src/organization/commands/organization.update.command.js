"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationUpdateCommand = void 0;
class OrganizationUpdateCommand {
    id;
    input;
    static type = '[Organization] Update';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.OrganizationUpdateCommand = OrganizationUpdateCommand;
//# sourceMappingURL=organization.update.command.js.map