"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSmtpUpdateCommand = void 0;
class CustomSmtpUpdateCommand {
    id;
    input;
    static type = '[Custom SMTP] Update';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.CustomSmtpUpdateCommand = CustomSmtpUpdateCommand;
//# sourceMappingURL=custom-smtp.update.command.js.map