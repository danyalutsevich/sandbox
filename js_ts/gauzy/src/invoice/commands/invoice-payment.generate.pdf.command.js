"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePaymentGeneratePdfCommand = void 0;
class InvoicePaymentGeneratePdfCommand {
    invoiceId;
    locale;
    static type = '[Invoice Payment] Generate Pdf';
    constructor(invoiceId, locale) {
        this.invoiceId = invoiceId;
        this.locale = locale;
    }
}
exports.InvoicePaymentGeneratePdfCommand = InvoicePaymentGeneratePdfCommand;
//# sourceMappingURL=invoice-payment.generate.pdf.command.js.map