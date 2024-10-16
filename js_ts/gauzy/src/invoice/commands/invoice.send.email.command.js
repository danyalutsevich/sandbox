"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSendEmailCommand = void 0;
class InvoiceSendEmailCommand {
    languageCode;
    email;
    params;
    origin;
    static type = '[Invoice] Send Email';
    constructor(languageCode, email, params, origin) {
        this.languageCode = languageCode;
        this.email = email;
        this.params = params;
        this.origin = origin;
    }
}
exports.InvoiceSendEmailCommand = InvoiceSendEmailCommand;
//# sourceMappingURL=invoice.send.email.command.js.map