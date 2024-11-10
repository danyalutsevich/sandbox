"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItemBulkCreateCommand = void 0;
class InvoiceItemBulkCreateCommand {
    invoiceId;
    input;
    static type = '[InvoiceItem] Create';
    constructor(invoiceId, input) {
        this.invoiceId = invoiceId;
        this.input = input;
    }
}
exports.InvoiceItemBulkCreateCommand = InvoiceItemBulkCreateCommand;
//# sourceMappingURL=invoice-item.bulk.create.command.js.map