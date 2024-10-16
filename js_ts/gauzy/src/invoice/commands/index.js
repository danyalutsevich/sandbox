"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const handlers_1 = require("./handlers");
__exportStar(require("./invoice.create.command"), exports);
__exportStar(require("./invoice.delete.command"), exports);
__exportStar(require("./invoice.send.email.command"), exports);
__exportStar(require("./invoice.update.command"), exports);
__exportStar(require("./invoice.generate.link.command"), exports);
__exportStar(require("./invoice.generate.pdf.command"), exports);
__exportStar(require("./invoice-payment.generate.pdf.command"), exports);
exports.CommandHandlers = [
    handlers_1.InvoiceCreateHandler,
    handlers_1.InvoiceUpdateHandler,
    handlers_1.InvoiceSendEmailHandler,
    handlers_1.InvoiceDeleteHandler,
    handlers_1.InvoiceGenerateLinkHandler,
    handlers_1.InvoiceGeneratePdfHandler,
    handlers_1.InvoicePaymentGeneratePdfHandler
];
//# sourceMappingURL=index.js.map