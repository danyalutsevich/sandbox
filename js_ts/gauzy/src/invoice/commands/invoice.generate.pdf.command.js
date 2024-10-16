"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceGeneratePdfCommand = void 0;
class InvoiceGeneratePdfCommand {
    invoiceId;
    locale;
    static type = '[Invoice] Generate Pdf';
    constructor(invoiceId, locale) {
        this.invoiceId = invoiceId;
        this.locale = locale;
    }
}
exports.InvoiceGeneratePdfCommand = InvoiceGeneratePdfCommand;
//# sourceMappingURL=invoice.generate.pdf.command.js.map