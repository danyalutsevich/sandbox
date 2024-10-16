"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterCommand = void 0;
class AuthRegisterCommand {
    input;
    languageCode;
    static type = '[Auth] Register';
    constructor(input, languageCode) {
        this.input = input;
        this.languageCode = languageCode;
    }
}
exports.AuthRegisterCommand = AuthRegisterCommand;
//# sourceMappingURL=auth.register.command.js.map