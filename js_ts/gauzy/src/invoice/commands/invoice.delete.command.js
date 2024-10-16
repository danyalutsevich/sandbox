"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceDeleteCommand = void 0;
class InvoiceDeleteCommand {
    invoiceId;
    static type = '[Invoice] Delete';
    constructor(invoiceId) {
        this.invoiceId = invoiceId;
    }
}
exports.InvoiceDeleteCommand = InvoiceDeleteCommand;
//# sourceMappingURL=invoice.delete.command.js.map