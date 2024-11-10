"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHistoryResendCommand = void 0;
class EmailHistoryResendCommand {
    input;
    languageCode;
    static type = '[Email History] Resend';
    constructor(input, languageCode) {
        this.input = input;
        this.languageCode = languageCode;
    }
}
exports.EmailHistoryResendCommand = EmailHistoryResendCommand;
//# sourceMappingURL=email-history.resend.command.js.map