"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteAcceptCommand = void 0;
class InviteAcceptCommand {
    input;
    languageCode;
    static type = '[Invite Employee/User/Candidate] Accept';
    constructor(input, languageCode) {
        this.input = input;
        this.languageCode = languageCode;
    }
}
exports.InviteAcceptCommand = InviteAcceptCommand;
//# sourceMappingURL=invite-accept.command.js.map