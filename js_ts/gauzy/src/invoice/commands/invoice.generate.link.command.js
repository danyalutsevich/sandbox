"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceGenerateLinkCommand = void 0;
class InvoiceGenerateLinkCommand {
    invoiceId;
    static type = '[Invoice] Generate Link';
    constructor(invoiceId) {
        this.invoiceId = invoiceId;
    }
}
exports.InvoiceGenerateLinkCommand = InvoiceGenerateLinkCommand;
//# sourceMappingURL=invoice.generate.link.command.js.map